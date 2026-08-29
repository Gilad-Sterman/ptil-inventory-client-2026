import { useState } from "react"

export function ProductCategories({ filterBy, setFilterBy }) {
    const [showMaxInv, setShowMaxInv] = useState(false)
    const [isSelect, setIsSelect] = useState(false)
    const { categories } = filterBy


    function setNewFilter({ target }) {
        setIsSelect(false)
        const field = target.name
        const value = target.value
        filterBy[field] = (field === 'maxNum') ? +value : value
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setCategories({ target }) {
        const category = target.name
        const idx = categories.findIndex(c => c === category)
        if (idx === -1) {
            categories.push(category)
        } else {
            categories.splice(idx, 1)
            if (category === 'begaddim') filterBy.moreCategories = []
        }
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)

    }

    return (
        <section className="product-categories">
            <form className="flex align-center">
                <div className="category-option">
                    <input type="checkbox" name="strings" id="strings" onChange={setCategories} checked={categories.includes('strings')} />
                    <label htmlFor="strings">חוטים</label>
                </div>
                <div className="category-option">
                    <input type="checkbox" name="begaddim" id="begaddim" onChange={setCategories} checked={categories.includes('begaddim')} />
                    <label htmlFor="begaddim">בגד</label>
                </div>
                <div className="category-option">
                    <input type="checkbox" name="other" id="other" onChange={setCategories} checked={categories.includes('other')} />
                    <label htmlFor="other">אחר</label>
                </div>
            </form>
            <div className="frame-label">
                <span>קטגוריה</span>
            </div>
        </section>
    )
}