import { useEffect, useRef, useState } from "react"
import { ProductFilter } from "./ProductFilter"
import { ProductList } from "./ProductList"
import { productService } from "../services/product.service"
// import { InfoCard } from "./InfoCard"
import { ProductCategories } from "./ProductCategories"
import { AdditionalCategories } from "./AdditionalCategories"
import { MultiSelectCard } from "./MultiSelectCard"
import { TYING, allSizes, getBeggedFromDataCodes, getMySizes, getSizesByType, getproductsByType, setMyBegged } from "../services/info.service"
import { UpdateModal } from "./UpdateModal"
// import { Loader } from "./Loader"
import { YourSearch } from "./YourSearch"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function ProductIndex() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const from = `2024-01-01`
    const to = `${new Date().getFullYear()}-${new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`

    const [products, setProducts] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [closeOptionsModal, setCloseOptionsModal] = useState(false)
    const [strings, setStrings] = useState([])
    const [begged, setBegged] = useState([])
    const [sizes, setSizes] = useState([])
    const [filterBy, setFilterBy] = useState({ from, to, txt: '', sortBy: 'Description-Heb', sortDir: 'down', maxNum: false, categories: [], moreCategories: [], specificCodes: { begged: [], size: [], strings: [], tying: [] } })
    const isSelecteOptions = (filterBy.categories.includes('begaddim')) && (filterBy.specificCodes.begged.length > 0) || (filterBy.specificCodes.size.length > 0) || (filterBy.specificCodes.strings.length > 0) || (filterBy.specificCodes.tying.length > 0)
    const ref = useRef(utilService.debounce(loadProducts, 500))

    useEffect(() => {
        ref.current(filterBy)
    }, [filterBy])

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        getInfo()
    }, [])

    async function loadProducts(filterBy) {
        try {
            const res = await productService.getProducts(filterBy)
            setProducts(res)
            const pSizes = getSizesByType(filterBy.categories, filterBy.specificCodes.begged)
            setSizes(pSizes)
        } catch (err) {
            console.log(err)
        }
    }

    async function getInfo() {
        const stringsRes = await getproductsByType('strings')
        const beggedRes = await getBeggedFromDataCodes()
        const myBegged = setMyBegged(beggedRes)
        setStrings(stringsRes)
        setBegged(myBegged)
    }

    async function bulkUpdate(products) {
        setIsUpdate(false)
        try {
            const res = await productService.bulkInventoryUpdate(products, loggedUser)
            setTimeout(loadProducts, 200, filterBy)
        } catch (err) {
            console.log(err);
        }
    }

    function toggleSelectAll() {
        let allSelected = products.some(product => !product.isSelected)
        const newProducts = products.map(p => {
            p.isSelected = allSelected
            return p
        })
        setProducts(newProducts)
        setIsSelectAll(allSelected)
    }

    function toggleSelect(product) {
        product.isSelected = !product.isSelected
        const newProducts = products.map(p => {
            if (p._id === product._id) return product
            return p
        })
        setProducts(newProducts)
    }

    function exportCSV() {
        const selectedProducts = products.filter(product => product.isSelected)
        if (!selectedProducts.length) return
        const csvString = [
            [
                "SKU",
                "Item",
                "Quantity",
                "Client Name",
                "Store",
                "Date"
            ],
            ...selectedProducts.map(product => [
                product.sku,
                product.description,
                product.quantity,
                product.clientName,
                product.store,
                product.created_date
            ])
        ]
            .map(e => e.join(","))
            .join("\n");
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8,' })
        const objUrl = URL.createObjectURL(blob)
        const link = document.getElementById('export-link')
        link.setAttribute('href', objUrl)
        link.setAttribute('download', 'File.csv')
    }

    function clearFilter() {
        setIsSelectAll(false)
        const clearFilter = {
            from,
            to,
            txt: '',
            maxNum: false,
            sortBy: 'Description-Heb',
            sortDir: 'down',
            categories: [],
            moreCategories: [],
            specificCodes: { begged: [], size: [], strings: [], tying: [] }
        }
        setFilterBy(clearFilter)
    }

    async function refresh() {
        setIsRefresh(true)
        await loadProducts(filterBy)
        setIsRefresh(false)
        setIsSelectAll(false)
    }

    return (
        <section className="product-index" onClick={() => setCloseOptionsModal(false)} >
            <div className="top-bar">
                <div className="categories-section">
                    <ProductCategories filterBy={filterBy} setFilterBy={setFilterBy} />
                    {filterBy.categories.includes('begaddim') && <AdditionalCategories filterBy={filterBy} setFilterBy={setFilterBy} />}
                </div>
                <div className="second-line">
                    {(filterBy.categories.includes('begaddim') || filterBy.categories.includes('other')) &&
                        <div className="multi-select-container">
                            {filterBy.categories.includes('begaddim') && <MultiSelectCard
                                title={'בגדים'}
                                name={'begged'}
                                options={begged}
                                filterBy={filterBy}
                                setFilterBy={setFilterBy}
                                closeOptionsModal={closeOptionsModal}
                                setCloseOptionsModal={setCloseOptionsModal}
                            />}
                            <MultiSelectCard
                                title={'מידה'}
                                name={'size'}
                                options={sizes}
                                filterBy={filterBy}
                                setFilterBy={setFilterBy}
                                closeOptionsModal={closeOptionsModal}
                                setCloseOptionsModal={setCloseOptionsModal}
                            />
                            {filterBy.moreCategories.includes('tied') && <MultiSelectCard title={'חוטים'} name={'strings'} options={strings} filterBy={filterBy} setFilterBy={setFilterBy} closeOptionsModal={closeOptionsModal} setCloseOptionsModal={setCloseOptionsModal} />}
                            {filterBy.moreCategories.includes('tied') && <MultiSelectCard title={'קשירה'} name={'tying'} options={TYING} filterBy={filterBy} setFilterBy={setFilterBy} closeOptionsModal={closeOptionsModal} setCloseOptionsModal={setCloseOptionsModal} />}
                            <div className="frame-label">
                                <span>סינון נוסף</span>
                            </div>
                        </div>
                    }
                    <ProductFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                </div>
            </div>
            <div className="bottom-bar">
                <div className="selected-options-container">
                    <div className="btns">
                        <button title="ניקוי" className="btn-clear-filter" onClick={() => clearFilter()}>ניקוי חיפוש</button>
                        <button title="טעינה מחדש" className="btn-refresh" onClick={() => refresh()}>
                            <img src="https://res.cloudinary.com/dollaguij/image/upload/v1705568297/refresh-svgrepo-com_neyeac.svg" className={isRefresh ? 'refreshing' : ''} />
                        </button>
                    </div>
                    {isSelecteOptions && <YourSearch filterBy={filterBy} setFilterBy={setFilterBy} BEGGED={begged} STRING={strings} TYING={TYING} />}
                    <div className="frame-label">
                        <span>אפשרויות</span>
                    </div>
                </div>
            </div>
            {isUpdate && <UpdateModal isUpdate={isUpdate} setIsUpdate={setIsUpdate} products={products} bulkUpdate={bulkUpdate} />}
            {<h3>סה"כ: {products?.length}</h3>}
            <ProductList
                products={products}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                isSelectAll={isSelectAll}
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate} />
        </section>
    )
}

