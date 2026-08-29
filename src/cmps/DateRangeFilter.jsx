export function DateRangeFilter({ filterBy, setFilterBy }) {
    
    function handleDateChange(field, value) {
        const newFilter = { ...filterBy, [field]: value }
        setFilterBy(newFilter)
    }

    function setPresetRange(preset) {
        const today = new Date()
        let from, to

        switch (preset) {
            case 'thisMonth':
                from = new Date(today.getFullYear(), today.getMonth(), 1)
                to = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                break
            case 'lastMonth':
                from = new Date(today.getFullYear(), today.getMonth() - 1, 1)
                to = new Date(today.getFullYear(), today.getMonth(), 0)
                break
            case 'last3Months':
                from = new Date(today.getFullYear(), today.getMonth() - 3, 1)
                to = today
                break
            case 'thisYear':
                from = new Date(today.getFullYear(), 0, 1)
                to = today
                break
            default:
                return
        }

        const newFilter = {
            ...filterBy,
            from: from.toISOString().split('T')[0],
            to: to.toISOString().split('T')[0]
        }
        setFilterBy(newFilter)
    }

    return (
        <div className="date-range-filter">
            <div className="filter-header">
                <h4>טווח תאריכים</h4>
            </div>
            
            <div className="preset-buttons">
                <button 
                    className="preset-btn"
                    onClick={() => setPresetRange('thisMonth')}
                >
                    החודש
                </button>
                <button 
                    className="preset-btn"
                    onClick={() => setPresetRange('lastMonth')}
                >
                    חודש שעבר
                </button>
                <button 
                    className="preset-btn"
                    onClick={() => setPresetRange('last3Months')}
                >
                    3 חודשים
                </button>
                <button 
                    className="preset-btn"
                    onClick={() => setPresetRange('thisYear')}
                >
                    השנה
                </button>
            </div>

            <div className="date-inputs">
                <div className="date-input-group">
                    <label>מתאריך:</label>
                    <input
                        type="date"
                        value={filterBy.from || ''}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                    />
                </div>
                <div className="date-input-group">
                    <label>עד תאריך:</label>
                    <input
                        type="date"
                        value={filterBy.to || ''}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
