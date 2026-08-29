import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

export function ProductFilter({ filterBy, setFilterBy }) {
    const [showDate, setShowDate] = useState(true)
    const { from, to, txt, maxNum } = filterBy

    function setNewFilter({ target }) {
        const field = target.name
        const value = target.value
        filterBy[field] = (field === 'maxNum') ? +value : value
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setMaxInventory() {
        let newMax = !maxNum
        filterBy.maxNum = newMax
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function clearSearch() {
        filterBy.txt = ''
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    return (
        <section className="product-filter">
            <div className="secendary-filter">
                <div className={`max-inventory ${maxNum ? 'selected' : ''}`} onClick={() => setMaxInventory()}>
                    <span className={`${maxNum ? 'bold' : ''}`}>מלאי נמוך</span>
                </div>
                <div className="search">
                    <label htmlFor="txt">
                        <img src="https://res.cloudinary.com/dollaguij/image/upload/v1701785795/wednesday/ztavmltqyl9th2ndasir.svg" alt="" />
                    </label>
                    <input type="text" name="txt" id="txt" placeholder="חיפוש" value={txt} onInput={setNewFilter} autoFocus />
                    <div className={`clear-search ${(txt) ? 'txt' : ''}`} onClick={() => clearSearch()}>
                        {txt && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />}
                    </div>
                </div>
                {/* <div className={`max-inventory ${maxNum ? 'selected' : ''}`} onClick={() => setMaxInventory()}>
                    <span className={`${maxNum ? 'bold' : ''}`}>מלאי נמוך</span>
                </div> */}
            </div>
            <div className="date-section">
                <button className="btn-show-date" onClick={() => setShowDate(!showDate)}>
                    <span>תאריך</span>
                    <img
                        src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg"
                        alt=""
                        className={`${showDate ? 'show' : 'close'}`}
                    />
                </button>
                {showDate && <form className="flex align-center">
                    <label htmlFor="from">מ</label>
                    <input type="date" name="from" id="from" value={from} onInput={setNewFilter} />
                    <label htmlFor="to">אל</label>
                    <input type="date" name="to" id="to" value={to} onInput={setNewFilter} />
                </form>}
            </div>
        </section>
    )
}