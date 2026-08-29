import { httpService } from './http.service.js'

export const ordersService = {
    getSalesByMonthAndStore,
    getSetsSalesByMonthAndStore
}

// Get sales data grouped by month/week and store
async function getSalesByMonthAndStore(filterBy) {
    try {
        const salesData = await httpService.get('order/sales/by-month-store', filterBy)
        
        // Transform data for chart consumption
        const groupedData = {}
        
        salesData.forEach(item => {
            let periodKey, periodData
            
            if (item.week !== undefined) {
                // Weekly data - format the Sunday date
                const weekStart = new Date(item.weekStart)
                const monthNames = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']
                const monthName = monthNames[weekStart.getMonth()]
                const day = weekStart.getDate()
                
                periodKey = `שבוע ${monthName} ${day}`
                periodData = {
                    periodKey,
                    week: item.week,
                    year: item.year,
                    weekStart: item.weekStart,
                    isWeekly: true
                }
            } else {
                // Monthly data
                periodKey = `${item.month}/${item.year}`
                periodData = {
                    periodKey,
                    month: item.month,
                    year: item.year,
                    isWeekly: false
                }
            }
            
            if (!groupedData[periodKey]) {
                groupedData[periodKey] = periodData
            }
            // Add store revenue to this period
            groupedData[periodKey][item.store] = item.totalRevenue
        })
        
        // Calculate totals for each period
        Object.values(groupedData).forEach(period => {
            let total = 0
            Object.keys(period).forEach(key => {
                if (!['periodKey', 'month', 'year', 'week', 'isWeekly', 'weekStart'].includes(key)) {
                    total += period[key] || 0
                }
            })
            period['סה"כ'] = total
        })
        
        // Convert to array and sort by date
        const chartData = Object.values(groupedData).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year
            if (a.isWeekly && b.isWeekly) {
                // Sort by actual week start date for weekly data
                return new Date(a.weekStart) - new Date(b.weekStart)
            } else if (!a.isWeekly && !b.isWeekly) {
                // Sort by month for monthly data
                return a.month - b.month
            } else {
                // Mixed data (shouldn't happen, but handle gracefully)
                return a.week - b.week
            }
        })
        
        return chartData
    } catch (err) {
        console.error('Failed to get sales by month and store:', err)
        throw err
    }
}

// Get sets sales data grouped by month/week and store
async function getSetsSalesByMonthAndStore(filterBy) {
    try {
        const setsData = await httpService.get('order/sets/by-month-store', filterBy)
        
        // Transform data for chart consumption
        const groupedData = {}
        
        setsData.forEach(item => {
            let periodKey, periodData
            
            if (item.week !== undefined) {
                // Weekly data - format the Sunday date
                const weekStart = new Date(item.weekStart)
                const monthNames = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']
                const monthName = monthNames[weekStart.getMonth()]
                const day = weekStart.getDate()
                
                periodKey = `שבוע ${monthName} ${day}`
                periodData = {
                    periodKey,
                    week: item.week,
                    year: item.year,
                    weekStart: item.weekStart,
                    isWeekly: true
                }
            } else {
                // Monthly data
                periodKey = `${item.month}/${item.year}`
                periodData = {
                    periodKey,
                    month: item.month,
                    year: item.year,
                    isWeekly: false
                }
            }
            
            if (!groupedData[periodKey]) {
                groupedData[periodKey] = periodData
            }
            // Add store sets count to this period
            groupedData[periodKey][item.store] = item.setsCount
        })
        
        // Calculate totals for each period
        Object.values(groupedData).forEach(period => {
            let total = 0
            Object.keys(period).forEach(key => {
                if (!['periodKey', 'month', 'year', 'week', 'isWeekly', 'weekStart'].includes(key)) {
                    total += period[key] || 0
                }
            })
            period['סה"כ'] = total
        })
        
        // Convert to array and sort by date
        const chartData = Object.values(groupedData).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year
            if (a.isWeekly && b.isWeekly) {
                // Sort by actual week start date for weekly data
                return new Date(a.weekStart) - new Date(b.weekStart)
            } else if (!a.isWeekly && !b.isWeekly) {
                // Sort by month for monthly data
                return a.month - b.month
            } else {
                // Mixed data (shouldn't happen, but handle gracefully)
                return a.week - b.week
            }
        })
        
        return chartData
    } catch (err) {
        console.error('Failed to get sets sales by month and store:', err)
        throw err
    }
}
