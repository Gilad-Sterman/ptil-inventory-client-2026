export function ErrMsg({ errMsg, setErrMsg }) {
    const { product } = errMsg
    const { LastUpdate } = product
    const day = new Date(LastUpdate).getDate()
    const year = new Date(LastUpdate).getFullYear()
    const month = new Date(LastUpdate).getMonth() + 1
    const date = `${day}-${month}-${year}`
    return (
        <article className="err-msg">
            <button className="close-msg" onClick={() => setErrMsg(null)}>
                <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />
            </button>
            <h5>{'שגיאה'}</h5>
            <h6>{errMsg.msg}</h6>
            <div className="product">
                {/* <span>{product._id}</span> */}
                <span>מק"ט: {product.SKU}</span>
                <span>שם: {product['Description-Heb']}</span>
                <span>שם באנגלית: {product['Description-Eng']}</span>
                <span>מלאי: {product.Inventory}</span>
                <span>עלות: {product.Cost}</span>
                <span>מחיר: {product.Price}</span>
                <span>מחיר $: {product.USDPrice}</span>
                <span>עדכון אחרון: {date}</span>
            </div>
        </article>
    )
}