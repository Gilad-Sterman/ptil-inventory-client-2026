export function GramsPeriodSelector({ onPeriodChange, currentPeriod = '3months' }) {
    
    function handlePeriodChange(period) {
        const today = new Date()
        let from, to = today.toISOString().split('T')[0]

        switch (period) {
            case '3months':
                const threeMonthsAgo = new Date(today)
                threeMonthsAgo.setMonth(today.getMonth() - 3)
                from = threeMonthsAgo.toISOString().split('T')[0]
                break
            case '6months':
                const sixMonthsAgo = new Date(today)
                sixMonthsAgo.setMonth(today.getMonth() - 6)
                from = sixMonthsAgo.toISOString().split('T')[0]
                break
            case '1year':
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
        <div className="grams-period-selector">
            <button 
                className={`period-btn ${currentPeriod === '3months' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('3months')}
            >
                3 חודשים
            </button>
            <button 
                className={`period-btn ${currentPeriod === '6months' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('6months')}
            >
                חצי שנה
            </button>
            <button 
                className={`period-btn ${currentPeriod === '1year' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('1year')}
            >
                שנה
            </button>
        </div>
    )
}
