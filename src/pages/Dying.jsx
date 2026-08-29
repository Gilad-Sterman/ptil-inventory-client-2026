import { useEffect, useState } from "react";
import { InputCard } from "../cmps/InputCard";
import { dyingService } from "../services/dying.service";
import { SimpleSelectCard } from "../cmps/SimpleSelectCard";
import { MyCheckbox } from "../cmps/MyCheckbox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmMsg } from "../cmps/ConfirmMsg";
import { permissionsService } from "../services/permissions.service";

export function Dying() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [productMap, setProductMap] = useState(() => {
        const defaultMap = dyingService.getDefaultMap()
        // Set today's date as default
        defaultMap.date = new Date().toISOString().split('T')[0]
        return defaultMap
    })
    const [typeOptions, setTypeOptions] = useState([])
    const [showConfirmMsg, setShowConfirmMsg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        if (!permissionsService.canAccessDying(loggedUser)) {
            navigate('/')
            return
        }
        loadDyingOptions()
    }, [loggedUser])

    async function loadDyingOptions() {
        try {
            const options = await dyingService.getDyingOptions({ User: 'Admin' })
            setTypeOptions(options.sort((option1, option2) => option2.sortOrder - option1.sortOrder))
        } catch (err) {
            console.log(err)
        }
    }

    function setField({ target }) {
        const field = target.name
        const value = (field === 'dithionite' || field === 'dolelot' || field === 'dye') ? +target.value : target.value
        
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
        
        productMap[field] = value
        const newMap = JSON.parse(JSON.stringify(productMap))
        setProductMap(newMap)
    }

    function validateForm() {
        const newErrors = {}
        
        if (!productMap.dye || productMap.dye <= 0) {
            newErrors.dye = 'נדרש להזין כמות צבע'
        }
        
        if (!productMap.type) {
            newErrors.type = 'נדרש לבחור סוג'
        }
        
        if (!productMap.dolelot || productMap.dolelot <= 0) {
            newErrors.dolelot = 'נדרש להזין דוללות'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Calculate sets automatically when relevant fields change
    const calculatedSets = productMap.type && productMap.dolelot && !productMap.redye 
        ? productMap.dolelot * dyingService.getMultFactor(productMap.type) 
        : 0

    async function onSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        
        if (!validateForm()) return
        
        setIsLoading(true)
        const mult = dyingService.getMultFactor(productMap.type)
        productMap.sets = productMap.redye ? 0 : productMap.dolelot * mult
        setShowConfirmMsg(true)
        setIsLoading(false)
        // const sure = confirm(dyingService.getConfirmationMsg(productMap))
        // if (!sure) return
        // try {
        //     const res = await dyingService.addDyingEvent(productMap, loggedUser)
        //     setProductMap(dyingService.getDefaultMap())
        // } catch (err) {
        //     console.log(err)
        // }
    }

    async function submit(productMap, loggedUser) {
        try {
            const res = await dyingService.addDyingEvent(productMap, loggedUser)
            setProductMap(dyingService.getDefaultMap())
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <section className="dying-page">
            <div className="dying-header">
                <h2>צביעה</h2>
                <p className="dying-subtitle">הזנת נתוני צביעה</p>
            </div>

            <form className="dying-form" onSubmit={onSubmit}>
                {/* Date Section */}
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">תאריך</label>
                        <input 
                            type="date" 
                            name="date" 
                            id="date" 
                            value={productMap.date} 
                            onChange={setField}
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Main Form Fields */}
                <div className="form-section">
                    <h3 className="section-title">פרטי צביעה</h3>
                    
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label required">צבע (גרם)</label>
                            <input 
                                type="number" 
                                name="dye" 
                                value={productMap.dye || ''} 
                                onChange={setField}
                                className={`form-input ${errors.dye ? 'error' : ''}`}
                                placeholder="הזן כמות צבע"
                            />
                            {errors.dye && <span className="error-message">{errors.dye}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">דיטיוניט</label>
                            <input 
                                type="number" 
                                name="dithionite" 
                                value={productMap.dithionite || ''} 
                                onChange={setField}
                                className="form-input"
                                placeholder="הזן כמות דיטיוניט"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label required">סוג</label>
                            <select 
                                name="type" 
                                value={productMap.type || ''} 
                                onChange={setField}
                                className={`form-select ${errors.type ? 'error' : ''}`}
                            >
                                <option value="">בחר סוג</option>
                                {typeOptions.map((option, idx) => (
                                    <option key={idx} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <span className="error-message">{errors.type}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label required">דוללות</label>
                            <input 
                                type="number" 
                                name="dolelot" 
                                value={productMap.dolelot || ''} 
                                onChange={setField}
                                className={`form-input ${errors.dolelot ? 'error' : ''}`}
                                placeholder="הזן דוללות"
                            />
                            {errors.dolelot && <span className="error-message">{errors.dolelot}</span>}
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                name="redye" 
                                checked={productMap.redye || false}
                                onChange={(e) => setField({ target: { name: 'redye', value: e.target.checked } })}
                                className="checkbox-input"
                            />
                            <span className="checkbox-text">צביעה חוזרת</span>
                        </label>
                    </div>
                </div>

                {/* Calculation Display */}
                {calculatedSets > 0 && (
                    <div className="calculation-display">
                        <div className="calculation-card">
                            <span className="calculation-label">סטים צפויים:</span>
                            <span className="calculation-value">{calculatedSets}</span>
                        </div>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'מעבד...' : 'הוספה'}
                </button>
            </form>

            {showConfirmMsg && <ConfirmMsg title={'הנתונים שהזנת:'} setShowConfirmMsg={setShowConfirmMsg} productMap={productMap} page={'dying'} submit={submit} loggedUser={loggedUser} />}
        </section>
    )
}