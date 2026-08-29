export function MyCheckbox({ title, name, setField, productMap }) {
    const value = productMap[name]

    return (
        <article className="info-card">
            <h5>{title}</h5>
            <hr />
            <div className={`check-box ${value ? 'checked' : ''}`} onClick={() => setField({ target: { name, value: !value } })}>
                {value && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />}
            </div>
        </article>
    )
}