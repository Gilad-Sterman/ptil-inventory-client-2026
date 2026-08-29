import { useState } from "react"

export function ProductPreview({ product, isUpdate, setIsUpdate }) {
    const [isExpand, setIsExpand] = useState(false)
    const [showPrice, setShowPrice] = useState(false)

    function setEdit(ev) {
        ev.stopPropagation()
        if (isUpdate) {
            setIsUpdate(false)
        } else {
            setIsUpdate(product)
        }
    }

    function handleShowPrice(ev) {
        ev.stopPropagation()
        setShowPrice(true)
        setTimeout(setShowPrice, 1000, false)
    }

    return (
        <article onClick={() => setIsExpand(!isExpand)}>
            <div className="info">
                <span className="sku">{product.SKU}</span>
                <span className="name">{product['Description-Heb']}</span>
                <span className={`inventory ${(product.Inventory < product.MinimumLevel) ? 'low' : ''}`}>{product.Inventory}</span>
                <button title="Update" className="btn-update" onClick={(ev) => setEdit(ev)}>
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194260/svg/edit_fxztwg.svg" alt="" />
                </button>
            </div>
            {isExpand && <div className="more-info">
                <span className="sku-mobile"><span className="bold">מק"ט:</span> {product.SKU}</span>
                <span><span className="bold">תיאור באנגלית:</span> {product['Description-Eng']}</span>
                <span><span className="bold" onClick={(ev) => handleShowPrice(ev)}>מחיר:</span> {showPrice && `${product.Price}₪ | ${product.USDPrice}$`}</span>
                {/* <span><span className="bold">עלות:</span> {product.Cost} ₪</span> */}
                <span><span className="bold">מלאי מינימלי:</span> {product.MinimumLevel}</span>
                <span><span className="bold">מיקום:</span> {product.Location}</span>
            </div>}
        </article>
    )
}