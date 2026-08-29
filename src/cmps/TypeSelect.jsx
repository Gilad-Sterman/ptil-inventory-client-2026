import { productService } from "../services/product.service"

export function TypeSelect({ selected, setSelected, setProductMap }) {
    function setType({ target }) {
        setSelected(target.value)
        setProductMap(productService.getDefaultProduct())
    }
    return (
        <section className='type-select'>
            <h3 className="type-select-title">סוג מוצר</h3>
            <div className="type-select-options">
                <label className={`type-option ${selected === 'tiedBegged' ? 'active' : ''}`}>
                    <input 
                        type="radio" 
                        name="type" 
                        value="tiedBegged" 
                        checked={selected === 'tiedBegged'}
                        onChange={setType}
                    />
                    <span className="type-option-content">
                        <span className="type-text">בגד קשור</span>
                    </span>
                </label>
                
                <label className={`type-option ${selected === 'string' ? 'active' : ''}`}>
                    <input 
                        type="radio" 
                        name="type" 
                        value="string" 
                        checked={selected === 'string'}
                        onChange={setType}
                    />
                    <span className="type-option-content">
                        <span className="type-text">חוטים</span>
                    </span>
                </label>
                
                <label className={`type-option ${selected === 'begged' ? 'active' : ''}`}>
                    <input 
                        type="radio" 
                        name="type" 
                        value="begged" 
                        checked={selected === 'begged'}
                        onChange={setType}
                    />
                    <span className="type-option-content">
                        <span className="type-text">בגד</span>
                    </span>
                </label>
                
                <label className={`type-option ${selected === 'other' ? 'active' : ''}`}>
                    <input 
                        type="radio" 
                        name="type" 
                        value="other" 
                        checked={selected === 'other'}
                        onChange={setType}
                    />
                    <span className="type-option-content">
                        <span className="type-text">אחר</span>
                    </span>
                </label>
            </div>
        </section>
    )
}