export function SimpleSelectCard({ title, options, selectName, setField, productMap }) {

    return (
        <article className="info-card">
            <h5>{title}</h5>
            <hr />
            <select name={selectName} id={selectName} onChange={setField} value={productMap[selectName] ? options.filter(option => option.code === productMap[selectName]).heb : ''}>
                <option
                    value={''}
                    name={'blank'}
                    key='00'>
                </option>
                {options && options.map((option, idx) =>
                    <option
                        value={option.name}
                        name={option.name}
                        key={idx}>{option.name}
                    </option>
                )}
            </select>
        </article>
    )

}