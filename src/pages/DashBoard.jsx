import { ProductIndex } from "../cmps/ProductIndex"


export function Dashboard() {
    return (
        <section className='dashboard-page' >
            <h2>מלאי</h2>
            <ProductIndex />
        </section>
    )
}