
export function AmountInput({ title, setField, productMap }) {
    const { begged, amount, string, other } = productMap

    return (
        <article className={`info-card ${(begged || string || other) ? '' : 'disabled'} amount`}>
            <h5>{title}</h5>
            <hr />
            {(begged || string || other) && <input type="number" name="amount" id="amount" value={amount} onChange={setField} />}
        </article>
    )

}