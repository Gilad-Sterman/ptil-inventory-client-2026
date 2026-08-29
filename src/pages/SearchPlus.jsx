import { useEffect, useState } from "react"
import { productService } from "../services/product.service"
import { ProductPreview } from "../cmps/ProductPreview"
import { useSelector } from "react-redux"

export function SearchPlus() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [amountToAdd, setAmountToAdd] = useState(0)

    const [filterBy, setFilterBy] = useState({ txt: '', sortBy: 'SKU', sortDir: 'down' })
    const [searchTerm, setSearchTerm] = useState({ txt: '', sortBy: 'SKU', sortDir: 'down' })

    useEffect(() => {
        if (searchTerm.txt) findProducts(searchTerm)
    }, [searchTerm])

    async function findProducts(searchTerm) {
        try {
            const res = await productService.getProducts(searchTerm)
            setProducts(res.slice(0, 5))
        } catch (err) {
            console.log(err)
        }
    }

    function setNewFilter({ target }) {
        const field = target.name
        const value = target.value
        filterBy[field] = (field === 'maxNum') ? +value : value
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setNewAmount({ target }) {
        const value = target.value
        setAmountToAdd(+value)
    }

    function clearSearch() {
        filterBy.txt = ''
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function search(ev) {
        ev.preventDefault()
        searchTerm.txt = filterBy.txt
        const newSearchTerm = JSON.parse(JSON.stringify(searchTerm))
        setSearchTerm(newSearchTerm)
        setSelectedProduct(null)
    }

    async function update(ev) {
        ev.preventDefault()
        try {
            const res = await productService.addInventoryBySKU(selectedProduct.SKU, amountToAdd, loggedUser)
            setAmountToAdd(0)
            setTimeout(findProducts, 200, searchTerm)
        } catch (err) {
            console.log(err)
        }
    }

    const { txt } = filterBy
    const topProduct = products[0]

    return (
        <section className="search-plus-page">
            <h2>חיפוש והוספה</h2>
            <form onSubmit={ev => search(ev)} className="search-form">
                <div className="search">
                    <label htmlFor="txt">
                        <img src="https://res.cloudinary.com/dollaguij/image/upload/v1701785795/wednesday/ztavmltqyl9th2ndasir.svg" alt="" />
                    </label>
                    <input type="text" name="txt" id="txt" placeholder="חיפוש" value={txt} onInput={setNewFilter} autoFocus />
                    <div className={`clear-search ${(txt) ? 'txt' : ''}`} onClick={() => clearSearch()}>
                        {txt && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />}
                    </div>
                </div>
                <button onClick={ev => search(ev)}>חיפוש</button>
            </form>
            {topProduct && <ul className="top-results">
                <li key={'-1'} className="list-header">
                    <span>מק"ט</span>
                    <span>תיאור</span>
                    <span>מלאי</span>
                </li>
                {products.map(product => <li key={product._id} className={(selectedProduct?._id === product._id) ? 'selected' : ''} onClick={() => setSelectedProduct(product)}>
                    <span>{product.SKU}</span>
                    <span>{product['Description-Heb']}</span>
                    <span>{product.Inventory}</span>
                </li>)}
            </ul>}
            {selectedProduct && <div className="amount-input">
                <form className="update-inventory-form" onSubmit={(ev) => update(ev)}>
                    <label htmlFor="amount">כמות:</label>
                    <input type="number" name="amount" id="amount" value={amountToAdd} onInput={setNewAmount} />
                    <button onClick={(ev) => update(ev)}>הוספה</button>
                </form>
            </div>}
        </section>
    )
}