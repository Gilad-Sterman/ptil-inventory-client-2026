import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { shziraService } from "../services/shzira.service"
import { SimpleSelectCard } from "../cmps/SimpleSelectCard"
import { InputCard } from "../cmps/InputCard"
import { useNavigate } from "react-router-dom"
import { ConfirmMsg } from "../cmps/ConfirmMsg"
import { permissionsService } from "../services/permissions.service"

export function Shzira() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [productMap, setProductMap] = useState(() => {
        const defaultMap = shziraService.getDefaultMap()
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
        if (!permissionsService.canAccessShzira(loggedUser)) {
            navigate('/')
            return
        }
        loadShziraOptions()
    }, [loggedUser])

    async function loadShziraOptions() {
        try {
            const options = await shziraService.getShziraOptions({ User: 'Admin' })
            setTypeOptions(options.sort((option1, option2) => option2.sortOrder - option1.sortOrder))
        } catch (err) {
            console.log(err)
        }
    }

    function setField({ target }) {
        const field = target.name
        const value = (field === 'maslulim') ? +target.value : target.value
        
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
        
        if (!productMap.type) {
            newErrors.type = 'נדרש לבחור סוג'
        }
        
        if (!productMap.maslulim || productMap.maslulim <= 0) {
            newErrors.maslulim = 'נדרש להזין מספר מסלולים'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Calculate sets automatically when relevant fields change
    const calculatedSets = productMap.type && productMap.maslulim 
        ? productMap.maslulim * shziraService.getMultFactor(productMap.type) 
        : 0

    async function onSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        
        if (!validateForm()) return
        
        setIsLoading(true)
        const mult = shziraService.getMultFactor(productMap.type)
        productMap.sets = productMap.maslulim * mult
        setShowConfirmMsg(true)
        setIsLoading(false)
    }

    async function submit(productMap, loggedUser) {
        try {
            const res = await shziraService.addShziraEvent(productMap, loggedUser)
            setProductMap(shziraService.getDefaultMap())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="shzira-page">
            <div className="shzira-header">
                <h2>שזירה</h2>
                <p className="shzira-subtitle">הזנת נתוני שזירה</p>
            </div>

            <form className="shzira-form" onSubmit={onSubmit}>
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
                    <h3 className="section-title">פרטי שזירה</h3>
                    
                    <div className="form-grid">
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
                            <label className="form-label required">מסלולים</label>
                            <input 
                                type="number" 
                                name="maslulim" 
                                value={productMap.maslulim || ''} 
                                onChange={setField}
                                className={`form-input ${errors.maslulim ? 'error' : ''}`}
                                placeholder="הזן מספר מסלולים"
                            />
                            {errors.maslulim && <span className="error-message">{errors.maslulim}</span>}
                        </div>
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

            {showConfirmMsg && <ConfirmMsg title={'הנתונים שהזנת:'} setShowConfirmMsg={setShowConfirmMsg} productMap={productMap} page={'shzira'} submit={submit} loggedUser={loggedUser} />}
        </section>
    )
}