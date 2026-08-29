export function InfoCard({ title, info, isPrice }) {

    return (
        <article className="info-card">
            <h5>{title}</h5>
            <hr />
            <h4>{isPrice ? '₪' : ''} <span>{info}</span></h4>
        </article>
    )

}