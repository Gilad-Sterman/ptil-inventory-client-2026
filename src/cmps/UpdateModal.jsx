import { useEffect, useState } from "react"

export function UpdateModal({ products, isUpdate, setIsUpdate, bulkUpdate }) {
    const [InToUpdate, setInToUpdate] = useState('')
    const [LocationToUpdate, setLocationToUpdate] = useState('')

    const selectedProducts = products.filter(product => product.isSelected)


    useEffect(() => {
        if (isUpdate !== 'bulk') {
            setInToUpdate(isUpdate.Inventory)
            setLocationToUpdate(isUpdate.Location)
        } else {
            const insToUpdate = selectedProducts.map(product => {
                return { Inventory: product.Inventory, SKU: product.SKU, Location: product.Location }
            })
            setInToUpdate(insToUpdate)
            // console.log(InToUpdate);
        }
    }, [])

    function setNewInventory({ target }) {
        const field = target.name
        const value = target.value
        if (isUpdate !== 'bulk') {
            setInToUpdate(value)
        } else {
            InToUpdate[field].Inventory = +value
            const newIn = JSON.parse(JSON.stringify(InToUpdate))
            setInToUpdate(newIn)
        }
    }

    function setNewLocation({ target }) {
        const field = target.name
        const value = target.value
        if (isUpdate !== 'bulk') {
            setLocationToUpdate(value)
        } else {
            InToUpdate[field].Location = value
            const newIn = JSON.parse(JSON.stringify(InToUpdate))
            setInToUpdate(newIn)
        }
    }

    function submit(ev) {
        ev.preventDefault()
        if (isUpdate !== 'bulk') {
            const res = [{ Inventory: +InToUpdate, SKU: isUpdate.SKU, Location: LocationToUpdate }]
            bulkUpdate(res);
        } else {
            bulkUpdate(InToUpdate);
        }
    }

    return (
        <div className="modal-overlay" onClick={() => setIsUpdate(false)}>
            <section className='update-modal' onClick={(e) => e.stopPropagation()}>
                <div className="update-header">
                    <h4>עדכון מלאי</h4>
                    <button 
                        className="btn-close-x" 
                        onClick={() => setIsUpdate(false)}
                        aria-label="סגור"
                    >
                        ×
                    </button>
                </div>

                <div className="update-content">
                    <div className="form-header">
                        <span>מק"ט</span>
                        <span>תיאור</span>
                        <span>מיקום</span>
                        <span>מלאי</span>
                    </div>

                    <div className="products-list">
                        {(isUpdate !== 'bulk') && (
                            <div className="product-row">
                                <span className="product-sku">{isUpdate.SKU}</span>
                                <span className="product-desc">{isUpdate['Description-Heb']}</span>
                                <input 
                                    type="text" 
                                    name="Location" 
                                    value={LocationToUpdate} 
                                    onChange={setNewLocation}
                                    className="form-input"
                                    placeholder="מיקום"
                                />
                                <input 
                                    type="number" 
                                    name="Inventory" 
                                    value={InToUpdate} 
                                    onChange={setNewInventory}
                                    className="form-input"
                                    placeholder="מלאי"
                                />
                            </div>
                        )}

                        {(isUpdate === 'bulk') &&
                            selectedProducts.map((product, idx) => (
                                <div key={product.SKU} className="product-row">
                                    <span className="product-sku">{product.SKU}</span>
                                    <span className="product-desc">{product['Description-Heb']}</span>
                                    <input 
                                        type="text" 
                                        name={idx} 
                                        onChange={setNewLocation} 
                                        value={InToUpdate[idx]?.Location || ''}
                                        className="form-input"
                                        placeholder="מיקום"
                                    />
                                    <input 
                                        type="number" 
                                        name={idx} 
                                        onChange={setNewInventory} 
                                        value={InToUpdate[idx]?.Inventory || ''}
                                        className="form-input"
                                        placeholder="מלאי"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="update-actions">
                    <button className="btn-cancel" onClick={() => setIsUpdate(false)}>
                        ביטול
                    </button>
                    <button className="btn-update" onClick={(ev) => submit(ev)}>
                        עדכון
                    </button>
                </div>
            </section>
        </div>
    )
}