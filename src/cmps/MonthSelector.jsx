import { useState, useRef, useEffect } from 'react'

export function MonthSelector({ selectedMonth, onMonthChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    
    const months = [
        { value: 1, label: 'ינואר' },
        { value: 2, label: 'פברואר' },
        { value: 3, label: 'מרץ' },
        { value: 4, label: 'אפריל' },
        { value: 5, label: 'מאי' },
        { value: 6, label: 'יוני' },
        { value: 7, label: 'יולי' },
        { value: 8, label: 'אוגוסט' },
        { value: 9, label: 'ספטמבר' },
        { value: 10, label: 'אוקטובר' },
        { value: 11, label: 'נובמבר' },
        { value: 12, label: 'דצמבר' }
    ]

    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear, currentYear + 1]

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleMonthChange(month, year) {
        const firstDay = new Date(year, month - 1, 1)
        const lastDay = new Date(year, month, 0)
        
        const filter = {
            from: firstDay.toISOString().split('T')[0],
            to: lastDay.toISOString().split('T')[0]
        }
        
        onMonthChange(filter, { month, year, type: 'month' })
        setIsOpen(false) // Close dropdown after selection
    }

    function handleYearChange() {
        const year = selectedMonth.year
        const firstDay = new Date(year, 0, 1) // January 1st
        const lastDay = new Date(year, 11, 31) // December 31st
        
        const filter = {
            from: firstDay.toISOString().split('T')[0],
            to: lastDay.toISOString().split('T')[0]
        }
        
        onMonthChange(filter, { month: null, year, type: 'year' })
        setIsOpen(false)
    }

    function handle12MonthsChange() {
        const today = new Date()
        const twelveMonthsAgo = new Date(today)
        twelveMonthsAgo.setFullYear(today.getFullYear() - 1)
        
        const filter = {
            from: twelveMonthsAgo.toISOString().split('T')[0],
            to: today.toISOString().split('T')[0]
        }
        
        onMonthChange(filter, { month: null, year: today.getFullYear(), type: '12months' })
        setIsOpen(false)
    }

    function getMonthName(monthNum) {
        return months.find(m => m.value === monthNum)?.label || ''
    }

    function getDisplayText() {
        if (!selectedMonth.type || selectedMonth.type === 'month') {
            return `${getMonthName(selectedMonth.month)} ${selectedMonth.year}`
        } else if (selectedMonth.type === 'year') {
            return `${selectedMonth.year}`
        } else if (selectedMonth.type === '12months') {
            return '12 חודשים'
        }
        return `${getMonthName(selectedMonth.month)} ${selectedMonth.year}`
    }

    return (
        <div className="month-selector-compact" ref={dropdownRef}>
            <button 
                className="month-selector-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="selected-month">
                    {getDisplayText()}
                </span>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="month-selector-dropdown">
                    <div className="year-selector">
                        <label>שנה:</label>
                        <select 
                            value={selectedMonth.year} 
                            onChange={(e) => handleMonthChange(selectedMonth.month, parseInt(e.target.value))}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="month-grid">
                        {months.map(month => (
                            <button
                                key={month.value}
                                className={`month-option ${selectedMonth.month === month.value && selectedMonth.type === 'month' ? 'active' : ''}`}
                                onClick={() => handleMonthChange(month.value, selectedMonth.year)}
                            >
                                {month.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="period-buttons">
                        <button
                            className={`period-option ${selectedMonth.type === 'year' ? 'active' : ''}`}
                            onClick={handleYearChange}
                        >
                            {selectedMonth.year}
                        </button>
                        <button
                            className={`period-option ${selectedMonth.type === '12months' ? 'active' : ''}`}
                            onClick={handle12MonthsChange}
                        >
                            12 חודשים
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
