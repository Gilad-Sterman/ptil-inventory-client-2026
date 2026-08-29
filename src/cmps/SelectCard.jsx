export function SelectCard({ title, options, selectName, setField, productMap }) {

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
                {options && options.map(option =>
                    <option
                        value={option.code}
                        name={option.heb}
                        key={option.code}>{option.heb}
                    </option>
                )}
            </select>
        </article>
    )

}