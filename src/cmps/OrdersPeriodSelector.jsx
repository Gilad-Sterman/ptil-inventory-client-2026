export function OrdersPeriodSelector({ onPeriodChange, currentPeriod = '3months' }) {
    
    function handlePeriodChange(period) {
        const today = new Date()
        let from, to = today.toISOString().split('T')[0]

        switch (period) {
            case '30days':
                const thirtyDaysAgo = new Date(today)
                thirtyDaysAgo.setDate(today.getDate() - 30)
                from = thirtyDaysAgo.toISOString().split('T')[0]
                break
            case 'thisMonth':
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
                from = monthStart.toISOString().split('T')[0]
                break
            case '3months':
                const threeMonthsAgo = new Date(today)
                threeMonthsAgo.setMonth(today.getMonth() - 3)
                from = threeMonthsAgo.toISOString().split('T')[0]
                break
            case 'yearStart':
                const yearStart = new Date(today.getFullYear(), 0, 1)
                from = yearStart.toISOString().split('T')[0]
                break
            case '12months':
                const twelveMonthsAgo = new Date(today)
                twelveMonthsAgo.setMonth(today.getMonth() - 12)
                from = twelveMonthsAgo.toISOString().split('T')[0]
                break
            default:
                return
        }

        onPeriodChange({ from, to }, period)
    }

    return (
        <div className="time-period-selector">
            <button 
                className={`period-btn ${currentPeriod === 'thisMonth' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('thisMonth')}
            >
                החודש
            </button>
            <button 
                className={`period-btn ${currentPeriod === '30days' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('30days')}
            >
                30 ימים
            </button>
            <button 
                className={`period-btn ${currentPeriod === '3months' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('3months')}
            >
                3 חודשים
            </button>
            <button 
                className={`period-btn ${currentPeriod === 'yearStart' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('yearStart')}
            >
                תחילת השנה
            </button>
            <button 
                className={`period-btn ${currentPeriod === '12months' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('12months')}
            >
                12 חודשים
            </button>
        </div>
    )
}
