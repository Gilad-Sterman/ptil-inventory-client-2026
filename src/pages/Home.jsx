import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SelectCard } from "../cmps/SelectCard";
import { TypeSelect } from "../cmps/TypeSelect";
import { BEGGED, STRING, TYING, COLOR, isTalitGadol, getConfirmationMsg, getproductsByType, setMyBegged, setMyOther, getBeggedFromDataCodes, getColorsForBegged } from "../services/info.service";
import { productService } from "../services/product.service";
import { SizeSelect } from "../cmps/SizeSelect";
import { ColorSelect } from "../cmps/ColorSelect";
import { AmountInput } from "../cmps/AmountInput";
import { InputCard } from "../cmps/InputCard";
import { ConfirmMsg } from "../cmps/ConfirmMsg";
import { HomeConfirmMsg } from "../cmps/HomeConfirmMsg";

export function Home() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const [selected, setSelcted] = useState('tiedBegged')
    const [strings, setStrings] = useState([])
    const [begged, setBegged] = useState([])
    const [other, setOther] = useState([])
    const [moreInfo, setMoreInfo] = useState('')
    const [productMap, setProductMap] = useState(productService.getDefaultProduct())
    const [showConfirmMsg, setShowConfirmMsg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        async function getInfo() {
            const res = await getproductsByType('strings')
            const stringsRes = res.sort((string1, string2) => string2.SortOrder - string1.SortOrder)
            
            // NEW: Use MongoDataCodes for begged (TG products only for now)
            let myBegged = []
            try {
                const beggedRes = await getBeggedFromDataCodes()
                myBegged = beggedRes // Already formatted from backend
            } catch (err) {
                // Fallback to old method if MongoDataCodes fails
                const beggedRes = await getproductsByType('begged')
                myBegged = setMyBegged(beggedRes)
            }
            
            const other = await getproductsByType('other')
            const myOther = setMyOther(other)
            setStrings(stringsRes)
            setBegged(myBegged)
            setOther(myOther)
        }
        getInfo()
    }, [])

    function setField({ target }) {
        const field = target.name
        const value = target.value
        
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
        
        productMap[field] = value
        
        // Handle clearing incompatible selections for TG products
        if (field === 'size' && productMap.begged && isTalitGadol(productMap.begged)) {
            // If size is cleared or changed, clear color to avoid incompatible combinations
            if (!value || value === '') {
                productMap.color = ''
            }
        }
        
        if (field === 'color' && productMap.begged && isTalitGadol(productMap.begged)) {
            // If color is cleared, no need to clear size as all sizes should be available
        }
        
        const newProductMap = JSON.parse(JSON.stringify(productMap))
        setProductMap(newProductMap)
    }

    function validateForm() {
        const newErrors = {}
        
        if (selected === 'tiedBegged') {
            if (!productMap.string) newErrors.string = 'נדרש לבחור חוטים'
            if (!productMap.begged) newErrors.begged = 'נדרש לבחור בגד'
            if (!productMap.tying) newErrors.tying = 'נדרש לבחור קשירה'
            if (productMap.begged && !productMap.size) newErrors.size = 'נדרש לבחור מידה'
            
            // Color validation for TG products
            if (productMap.begged && isTalitGadol(productMap.begged) && !productMap.color) {
                newErrors.color = 'נדרש לבחור צבע'
            }
        } else if (selected === 'begged') {
            if (!productMap.begged) newErrors.begged = 'נדרש לבחור בגד'
            if (productMap.begged && !productMap.size) newErrors.size = 'נדרש לבחור מידה'
            
            // Color validation for TG products
            if (productMap.begged && isTalitGadol(productMap.begged) && !productMap.color) {
                newErrors.color = 'נדרש לבחור צבע'
            }
        } else if (selected === 'string') {
            if (!productMap.string) newErrors.string = 'נדרש לבחור חוטים'
        } else if (selected === 'other') {
            if (!productMap.other) newErrors.other = 'נדרש לבחור מוצר'
            if (productMap.other && !productMap.size) newErrors.size = 'נדרש לבחור מידה'
        }
        
        // Amount is required only when a product is selected (begged, string, or other)
        if ((productMap.begged || productMap.string || productMap.other) && (!productMap.amount || productMap.amount <= 0)) {
            newErrors.amount = 'נדרש להזין כמות'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function writeMoreInfo({ target }) {
        const val = target.value
        setMoreInfo(val)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        
        if (!validateForm()) return
        
        setIsLoading(true)
        
        if (selected === 'tiedBegged') {
            setShowConfirmMsg(true)
            // const begged = BEGGED.find(b => b.code === productMap.begged).heb
            // const size = productMap.size
            // const amount = productMap.amount
            // const string = STRING.find(s => s.code === productMap.string).heb
            // const tying = TYING.find(t => t.code === productMap.tying).heb
            // const sure = confirm(getConfirmationMsg('tiedBegged', begged, size, string, tying, amount, moreInfo))
            // if (!sure) return
            // try {
            //     await productService.addInventory(productMap, loggedUser)
            //     setProductMap(productService.getDefaultProduct())
            //     return
            // } catch (err) {
            //     console.log(err);
            // }
        }
        if (selected === 'begged') {
            setShowConfirmMsg(true)
            // const begged = BEGGED.find(b => b.code === productMap.begged).heb
            // const size = productMap.size
            // const amount = productMap.amount
            // const sure = confirm(getConfirmationMsg('begged', begged, size, 0, 0, amount, moreInfo))
            // if (!sure) return
            // try {
            //     const productSKU = `1${productMap.begged}${productMap.size}000000`
            //     await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            //     setProductMap(productService.getDefaultProduct())
            //     return
            // } catch (err) {
            //     console.log(err);
            // }
        }
        if (selected === 'string') {
            setShowConfirmMsg(true)
            // const string = STRING.find(s => s.code === productMap.string).heb
            // const amount = productMap.amount
            // const sure = confirm(getConfirmationMsg('string', 0, 0, string, 0, amount, moreInfo))
            // if (!sure) return
            // try {
            //     const productSKU = `10000${productMap.string}0000`
            //     await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            //     setProductMap(productService.getDefaultProduct())
            //     return
            // } catch (err) {
            //     console.log(err);
            // }
        }
        if (selected === 'other') {
            setShowConfirmMsg(true)
            // const otherName = other.find(n => n.code === productMap.other).heb
            // const amount = productMap.amount
            // const size = productMap.size
            // const sure = confirm(getConfirmationMsg('other', otherName, size, 0, 0, amount, moreInfo))
            // if (!sure) return
            // try {
            //     const productSKU = `100${size}0000${productMap.other}`
            //     await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            //     setProductMap(productService.getDefaultProduct())
            //     return
            // } catch (err) {
            //     console.log(err);
            // }
        }
        setIsLoading(false)
    }

    async function submit() {
        // return
        const amount = productMap.amount
        const size = productMap.size
        try {
            if (selected === 'other') {
                const productSKU = `100${size}0000${productMap.other}`
                const res = await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            } else if (selected === 'string') {
                const productSKU = `10000${productMap.string}0000`
                const res = await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            } else if (selected === 'begged') {
                const isTG = isTalitGadol(productMap.begged)
                const colorCode = isTG ? productMap.color : '00'
                const productSKU = `1${productMap.begged}${productMap.size}0000${colorCode}`
                const res = await productService.addInventoryBySKU(productSKU, amount, loggedUser)
            } else {
                const res = await productService.addInventory(productMap, loggedUser)
            }
            setProductMap(productService.getDefaultProduct())
            setMoreInfo('')
            setShowConfirmMsg(false) // Close the confirmation modal after successful submission
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className='home'>
            <div className="home-header">
                <h2>הוספת מלאי</h2>
            </div>

            <div className="product-type-section">
                <TypeSelect selected={selected} setSelected={setSelcted} productMap={productMap} setProductMap={setProductMap} />
            </div>

            <form className="home-form" onSubmit={onSubmit}>
                <div className="form-sections">
                    {/* Product Selection Section */}
                    <div className="form-section">
                        <h3 className="section-title">בחירת מוצר</h3>
                        <div className="form-grid">
                            {(selected === 'tiedBegged' || selected === 'begged') && (
                                <div className="form-group">
                                    <label className="form-label required">בגד</label>
                                    <select 
                                        name="begged" 
                                        value={productMap.begged || ''} 
                                        onChange={setField}
                                        className={`form-select ${errors.begged ? 'error' : ''}`}
                                    >
                                        <option value="">בחר בגד</option>
                                        {begged.map(option => (
                                            <option key={option.code} value={option.code}>
                                                {option.heb}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.begged && <span className="error-message">{errors.begged}</span>}
                                </div>
                            )}

                            {(selected === 'other') && (
                                <div className="form-group">
                                    <label className="form-label required">מוצר</label>
                                    <select 
                                        name="other" 
                                        value={productMap.other || ''} 
                                        onChange={setField}
                                        className={`form-select ${errors.other ? 'error' : ''}`}
                                    >
                                        <option value="">בחר מוצר</option>
                                        {other.map(option => (
                                            <option key={option.code} value={option.code}>
                                                {option.heb}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.other && <span className="error-message">{errors.other}</span>}
                                </div>
                            )}

                            {(selected === 'tiedBegged' || selected === 'string') && (
                                <div className="form-group">
                                    <label className="form-label required">חוטים</label>
                                    <select 
                                        name="string" 
                                        value={productMap.string || ''} 
                                        onChange={setField}
                                        className={`form-select ${errors.string ? 'error' : ''}`}
                                    >
                                        <option value="">בחר חוטים</option>
                                        {strings.map(option => (
                                            <option key={option.code} value={option.code}>
                                                {option.heb}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.string && <span className="error-message">{errors.string}</span>}
                                </div>
                            )}

                            {(selected === 'tiedBegged') && (
                                <div className="form-group">
                                    <label className="form-label required">קשירה</label>
                                    <select 
                                        name="tying" 
                                        value={productMap.tying || ''} 
                                        onChange={setField}
                                        className={`form-select ${errors.tying ? 'error' : ''}`}
                                    >
                                        <option value="">בחר קשירה</option>
                                        {TYING.map(option => (
                                            <option key={option.code} value={option.code}>
                                                {option.heb}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tying && <span className="error-message">{errors.tying}</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Size and Amount Section */}
                    <div className="form-section">
                        <h3 className="section-title">פרטים נוספים</h3>
                        <div className="form-grid">
                            {(selected === 'tiedBegged' || selected === 'begged' || selected === 'other') && (
                                <div className="form-group">
                                    <SizeSelect title={'בחירת מידה:'} selectName='size' setField={setField} productMap={productMap} />
                                    {errors.size && <span className="error-message">{errors.size}</span>}
                                </div>
                            )}

                            {/* Color Selection for TG Products */}
                            {(selected === 'tiedBegged' || selected === 'begged') && (
                                <div className="form-group">
                                    <ColorSelect title={'בחירת צבע:'} selectName='color' setField={setField} productMap={productMap} />
                                    {errors.color && <span className="error-message">{errors.color}</span>}
                                </div>
                            )}

                            <div className="form-group">
                                <AmountInput title={'בחירת כמות:'} setField={setField} productMap={productMap} />
                                {errors.amount && <span className="error-message">{errors.amount}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="form-section">
                        <h3 className="section-title">מידע נוסף</h3>
                        <div className="form-group">
                            <label className="form-label">הערות</label>
                            <textarea 
                                name="moreInfo" 
                                value={moreInfo} 
                                onChange={writeMoreInfo}
                                className="form-textarea"
                                placeholder="הזן מידע נוסף (אופציונלי)"
                                rows="4"
                            />
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'מעבד...' : 'הוספה'}
                </button>
            </form>

            {showConfirmMsg && <HomeConfirmMsg title={'הנתונים שהזנת:'} setShowConfirmMsg={setShowConfirmMsg} productMap={productMap} type={selected} submit={submit} loggedUser={loggedUser} moreInfo={moreInfo} myOther={other} />}
        </section>
    )
}
