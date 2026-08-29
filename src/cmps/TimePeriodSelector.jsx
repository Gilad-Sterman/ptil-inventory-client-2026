export function TimePeriodSelector({ onPeriodChange, currentPeriod = 'last10Days' }) {
    
    function handlePeriodChange(period) {
        const today = new Date()
        let from, to = today.toISOString().split('T')[0]

        switch (period) {
            case 'last10Days':
                const tenDaysAgo = new Date(today)
                tenDaysAgo.setDate(today.getDate() - 10)
                from = tenDaysAgo.toISOString().split('T')[0]
                break
            case 'last30Days':
                const thirtyDaysAgo = new Date(today)
                thirtyDaysAgo.setDate(today.getDate() - 30)
                from = thirtyDaysAgo.toISOString().split('T')[0]
                break
            case 'thisMonth':
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
                from = firstDay.toISOString().split('T')[0]
                break
            case 'halfYear':
                const sixMonthsAgo = new Date(today)
                sixMonthsAgo.setMonth(today.getMonth() - 6)
                from = sixMonthsAgo.toISOString().split('T')[0]
                break
            case 'year':
                const oneYearAgo = new Date(today)
                oneYearAgo.setFullYear(today.getFullYear() - 1)
                from = oneYearAgo.toISOString().split('T')[0]
                break
            default:
                return
        }

        onPeriodChange({ from, to }, period)
    }

    return (
        <div className="time-period-selector">
            <button 
                className={`period-btn ${currentPeriod === 'last10Days' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('last10Days')}
            >
                10 ימים
            </button>
            <button 
                className={`period-btn ${currentPeriod === 'thisMonth' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('thisMonth')}
            >
                החודש
            </button>
            <button 
                className={`period-btn ${currentPeriod === 'last30Days' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('last30Days')}
            >
                30 ימים
            </button>
            <button 
                className={`period-btn ${currentPeriod === 'halfYear' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('halfYear')}
            >
                חצי שנה
            </button>
            <button 
                className={`period-btn ${currentPeriod === 'year' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('year')}
            >
                שנה
            </button>
        </div>
    )
}
