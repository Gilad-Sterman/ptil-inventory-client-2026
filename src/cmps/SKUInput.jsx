export function SKUInput({ setField, productMap }) {

    return (
        <article className="sku-input">
            <h5>מק"ט</h5>
            <section className="sku-form">
                <div className="sku-sub-sec">
                    <label htmlFor="other">אחר</label>
                    <input type={'text'} name={'other'} id="other" onChange={setField} value={productMap.other} />
                </div>
                <div className="sku-sub-sec">
                    <label htmlFor="tying">קשירה</label>
                    <input type={'text'} name={'tying'} id="tying" onChange={setField} value={productMap.tying} />
                </div>
                <div className="sku-sub-sec">
                    <label htmlFor="string">חוטים</label>
                    <input type={'text'} name={'string'} id="string" onChange={setField} value={productMap.string} />
                </div>
                <div className="sku-sub-sec">
                    <label htmlFor="size">מידה</label>
                    <input type={'text'} name={'size'} id="size" onChange={setField} value={productMap.size} />
                </div>
                <div className="sku-sub-sec">
                    <label htmlFor="begged">בגד</label>
                    <input type={'text'} name={'begged'} id="begged" onChange={setField} value={productMap.begged} />
                </div>
            </section>
        </article>
    )

}