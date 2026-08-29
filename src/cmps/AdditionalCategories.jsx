import { useEffect, useState } from "react"

export function AdditionalCategories({ filterBy, setFilterBy }) {
    const { moreCategories } = filterBy

    function setAdditionalCategories({ target }) {
        const category = target.name
        const idx = moreCategories.findIndex(c => c === category)
        if (idx === -1) {
            moreCategories.push(category)
        } else {
            moreCategories.splice(idx, 1)
        }
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)

    }

    return (
        <section className="additional-categories">
            <form className="flex align-center">
                <div className="category-option">
                    <input type="checkbox" name="untied" id="untied" onChange={setAdditionalCategories} />
                    <label htmlFor="untied">ללא קשירה</label>
                </div>
                <div className="category-option">
                    <input type="checkbox" name="tied" id="tied" onChange={setAdditionalCategories} checked={moreCategories.includes('tied')} />
                    <label htmlFor="tied">קשור</label>
                </div>
            </form>
            <div className="frame-label">
                <span>קשירה</span>
            </div>
        </section>
    )
}