import { useState } from "react";
import { ProductPreview } from "./ProductPreview"


export function ProductList({ products, toggleSelect, toggleSelectAll, isSelectAll, filterBy, setFilterBy, isUpdate, setIsUpdate }) {

    function setNewFilter({ target }) {
        // setIsSelect(false)
        const field = target.name
        const value = target.value
        filterBy[field] = (field === 'maxNum') ? +value : value
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setBulkEdit() {
        if (isUpdate) {
            setIsUpdate(false)
        } else {
            setIsUpdate('bulk')
        }
    }

    return (
        <section className="product-list" >
            <section className="list-header">
                <button title="Select All" className={`btn-select ${isSelectAll ? 'selected' : ''}`} onClick={() => toggleSelectAll()}>
                    {isSelectAll && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" className="img-check" />}
                </button>
                <div className={`title sku ${(filterBy.sortBy === 'SKU') ? 'selected' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'SKU' } })}>
                    <span>מק"ט</span>
                    {(filterBy.sortBy === 'SKU') &&
                        <img className={`sort-dir-img ${(filterBy.sortDir === 'down') ? 'up' : 'down'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt=""
                            onClick={() => setNewFilter({ target: { name: 'sortDir', value: (filterBy.sortDir === 'down') ? 'up' : 'down' } })}
                        />}
                </div>
                <div className={`title description ${(filterBy.sortBy === 'Description-Heb') ? 'selected' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'Description-Heb' } })}>
                    <span>תיאור</span>
                    {(filterBy.sortBy === 'Description-Heb') &&
                        <img className={`sort-dir-img ${(filterBy.sortDir === 'down') ? 'up' : 'down'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt=""
                            onClick={() => setNewFilter({ target: { name: 'sortDir', value: (filterBy.sortDir === 'down') ? 'up' : 'down' } })}
                        />}
                </div>
                <div className={`title inventory ${(filterBy.sortBy === 'Inventory') ? 'selected' : ''}`} onClick={() => setNewFilter({ target: { name: 'sortBy', value: 'Inventory' } })}>
                    <span>מלאי</span>
                    {(filterBy.sortBy === 'Inventory') &&
                        <img className={`sort-dir-img ${(filterBy.sortDir === 'down') ? 'up' : 'down'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt=""
                            onClick={() => setNewFilter({ target: { name: 'sortDir', value: (filterBy.sortDir === 'down') ? 'up' : 'down' } })}
                        />}
                </div>
                {products?.some(product => product.isSelected) && <button title="Bulk Update" className="btn-update-bulk title" onClick={() => setBulkEdit()}>עדכן הכל</button>}
            </section>
            {products && <ul className="clean-list">
                {products.map(product =>
                    <li className={`product-preview ${product.isSelected ? 'selected' : ''}`} key={product._id}>
                        <button className={`btn-select ${product.isSelected ? 'selected' : ''}`} onClick={() => toggleSelect(product)}>
                            {product.isSelected && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" className="img-check" />}
                        </button>
                        <ProductPreview product={product} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
                    </li>
                )}
            </ul>}
        </section>
    )
}