import { useEffect, useState } from "react"
import { COLOR, isTalitGadol, getProductColors, getColorsForBegged } from "../services/info.service"

export function ColorSelect({ title, selectName, setField, productMap }) {
    const [availableColors, setAvailableColors] = useState([])
    const { begged, size } = productMap
    const isTG = begged && isTalitGadol(begged)
    const canShowColors = isTG && size

    useEffect(() => {
        getColorOptions()
    }, [begged, size])

    async function getColorOptions() {
        if (isTG && begged) {
            try {
                // NEW: Use MongoDataCodes for color options with size filtering
                const colors = await getColorsForBegged(begged, size)
                setAvailableColors(colors)
            } catch (err) {
                // Fallback to old method if MongoDataCodes fails
                if (size) {
                    try {
                        const colorCodes = await getProductColors(begged, size)
                        const colors = colorCodes.map(code => COLOR.find(c => c.code === code)).filter(Boolean)
                        setAvailableColors(colors)
                    } catch (fallbackErr) {
                        setAvailableColors([])
                    }
                } else {
                    setAvailableColors([])
                }
            }
        } else {
            setAvailableColors([])
        }
    }

    // Only render the color selection for TG products
    if (!isTG) {
        return null
    }

    return (
        <article className={`info-card ${!canShowColors ? 'disabled' : ''}`}>
            <h5>{title}</h5>
            <hr />
            {canShowColors && <select name={selectName} id={selectName} onChange={setField} value={productMap.color || ''}>
                <option
                    value={''}
                    name={'blank'}
                    key='-1'>
                    בחר צבע
                </option>
                {availableColors.map(option =>
                    <option
                        value={option.code}
                        name={option.code}
                        key={option.code}>{option.heb}
                    </option>
                )}
            </select>}
            {!size && <h6>יש לבחור מידה תחילה</h6>}
        </article>
    )
}
