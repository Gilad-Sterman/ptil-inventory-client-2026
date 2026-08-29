export function InputCard({ title, name, type, setField, productMap, placeholder, ltr }) {

    return (
        <article className="info-card">
            <h5>{title}</h5>
            <hr />
            {type === 'text' && <input className={`${ltr ? 'ltr' : ''}`} type={type} name={name} onChange={setField} value={productMap[name]} placeholder={placeholder} />}
            {type !== 'text' && <input type={type} name={name} onChange={setField} value={productMap[name]} />}
        </article>
    )

}