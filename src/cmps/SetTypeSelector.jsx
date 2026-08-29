import { useState, useEffect } from 'react'
import { statsService } from '../services/stats.service'

export function SetTypeSelector({ onSetTypeChange, currentSetType = 'all' }) {
    const [setTypes, setSetTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadSetTypes()
    }, [])

    async function loadSetTypes() {
        try {
            setIsLoading(true)
            const types = await statsService.getAvailableSetTypes()
            setSetTypes(types)
            setIsLoading(false)
        } catch (err) {
            console.error('Failed to load set types:', err)
            setIsLoading(false)
        }
    }

    function handleSetTypeChange(setType) {
        onSetTypeChange(setType)
    }

    if (isLoading) {
        return (
            <div className="set-type-selector loading">
                <div className="loader-small"></div>
            </div>
        )
    }

    return (
        <div className="set-type-selector">
            <label className="set-type-label">סוג סט:</label>
            <select 
                value={currentSetType} 
                onChange={(e) => handleSetTypeChange(e.target.value)}
                className="set-type-dropdown"
            >
                <option value="all">כל הסוגים</option>
                {setTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    )
}
