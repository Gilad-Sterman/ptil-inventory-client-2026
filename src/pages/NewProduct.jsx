import { useEffect, useState } from "react"
import { InputCard } from "../cmps/InputCard"
import { productService } from "../services/product.service"
import { SKUInput } from "../cmps/SKUInput"
import { ErrMsg } from "../cmps/ErrMsg"
import { getNewConfirmationMsg } from "../services/info.service"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


export function NewProduct() {
    // const [selected, setSelcted] = useState('')
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState(null)
    const [productMap, setProductMap] = useState(productService.getDeProductToAdd())

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
    }, [])

    function setField({ target }) {
        const field = target.name
        const value = target.value
        productMap[field] = (field === 'Cost' || field === 'Price' || field === 'USDPrice' || field === 'Inventory') ? +value : value
        const newProductMap = JSON.parse(JSON.stringify(productMap))
        setProductMap(newProductMap)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const { Cost, Price, USDPrice, Inventory, Location, begged, size, string, tying, other } = productMap
        const heb = productMap['Description-Heb']
        const eng = productMap['Description-Eng']
        if (!eng || !heb || !Cost || !Price || !USDPrice || !Inventory || !Location) {
            console.log('Invalid')
            return
        }
        productMap.SKU = `1${begged}${size}${string}${tying}${other}`
        const sure = confirm(getNewConfirmationMsg(productMap))
        if (!sure) return
        try {
            const res = await productService.addNewProduct(productMap, loggedUser)
            if (res.msg) {
                setErrMsg(res)
                window.scrollTo(0, 0)
            }
            setProductMap(productService.getDeProductToAdd())
            return
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <section className='new-product-page' >
            <h2>הוספת מוצר חדש</h2>
            <form className="card-container" onSubmit={onSubmit}>
                <InputCard type={'text'} title={'שם המוצר בעברית'} name={'Description-Heb'} setField={setField} productMap={productMap} placeholder={'שם המוצר'} />
                <InputCard type={'text'} title={'שם המוצר באנגלית'} name={'Description-Eng'} setField={setField} productMap={productMap} placeholder={'Product Description'} ltr={true} />
                <SKUInput setField={setField} productMap={productMap} />
                <InputCard type={'text'} title={'מיקום'} name={'Location'} setField={setField} productMap={productMap} placeholder={'מיקום - X-000'} />
                <InputCard type={'number'} title={'עלות'} name={'Cost'} setField={setField} productMap={productMap} />
                <InputCard type={'number'} title={'מחיר'} name={'Price'} setField={setField} productMap={productMap} />
                <InputCard type={'number'} title={'מחיר $'} name={'USDPrice'} setField={setField} productMap={productMap} />
                <InputCard type={'number'} title={'מלאי מינימילי'} name={'MinimumLevel'} setField={setField} productMap={productMap} />
                <InputCard type={'number'} title={'כמות'} name={'Inventory'} setField={setField} productMap={productMap} />
            </form>
            <button onClick={(ev) => onSubmit(ev)}>הוספה</button>
            {errMsg && <ErrMsg errMsg={errMsg} setErrMsg={setErrMsg} />}
        </section>
    )
}

