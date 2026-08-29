import { useEffect, useState } from "react"
import { TG, TK, getProductSizes, getSizesForBegged, getSizesForBeggedAndColor } from "../services/info.service"

export function SizeSelect({ title, selectName, setField, productMap }) {
    // let options = TK.sizes
    const [options, setOptions] = useState([])
    const { begged, other, color } = productMap

    useEffect(() => {
        getSizeOptions()
    }, [begged, other, color])

    async function getSizeOptions() {
        if (begged) {
            try {
                // If color is selected, use color-aware API for size filtering
                if (color) {
                    const sizes = await getSizesForBeggedAndColor(begged, color)
                    setOptions(sizes)
                } else {
                    // Use regular size API when no color selected
                    const sizes = await getSizesForBegged(begged)
                    setOptions(sizes)
                }
            } catch (err) {
                // Fallback to old method if MongoDataCodes fails
                try {
                    const res = await getProductSizes('begged', begged)
                    setOptions(res)
                } catch (fallbackErr) {
                    setOptions([])
                }
            }
        } else if (other) {
            // Keep using old method for 'other' products for now
            try {
                const res = await getProductSizes('other', other)
                setOptions(res)
            } catch (err) {
                setOptions([])
            }
        } else {
            setOptions([])
        }
    }

    return (
        <article className={`info-card ${(!begged && !other) ? 'disabled' : ''}`}>
            <h5>{title}</h5>
            <hr />
            {(begged || other) && <select name={selectName} id={selectName} onChange={setField}>
                <option
                    value={''}
                    name={'blank'}
                    key='-1'>
                </option>
                {(options.length > 0) && options.map(option =>
                    <option
                        value={option}
                        name={option}
                        key={option}>{option}
                    </option>
                )}
            </select>}
            {!begged && !other && <h6>יש לבחור מוצר תחילה</h6>}
        </article>
    )

}