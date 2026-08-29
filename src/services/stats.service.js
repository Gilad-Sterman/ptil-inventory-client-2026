import { httpService } from './http.service.js'

export const statsService = {
    getOverviewStats,
    getShziraStats,
    getShziraDailyStats,
    getShziraTypeStats,
    getShziraMonthlyTotal,
    getDyingDailyStats,
    getDyingTypeStats,
    getDyingMonthlyTotal,
    getDyingMonthlyGrams,
    getAvailableSetTypes,
    getSetProductionDailyStats,
    getSetProductionTypeStats,
    getSetProductionMonthlyTotal,
    getDyePowderInventory,
    getDyeTotalUsage
}

const STATS_KEY = 'stats'

// Get general overview statistics
async function getOverviewStats(filterBy) {
    try {
        // This will need to be implemented on the backend
        // For now, we'll use the existing order endpoint to get some basic stats
        const products = await httpService.get('order', filterBy)
        
        const totalProducts = products.length
        const totalValue = products.reduce((sum, product) => {
            return sum + (product.Inventory * product.Price)
        }, 0)
        const lowStock = products.filter(product => 
            product.Inventory < product.MinimumLevel
        ).length
        
        return {
            totalProducts,
            totalValue,
            lowStock,
            recentActivity: 0 // Will be implemented with logs endpoint
        }
    } catch (err) {
        console.error('Failed to get overview stats:', err)
        throw err
    }
}

async function getShziraStats(filterBy) {
    try {
        const res = await httpService.get('shzira', filterBy)
        return res
    } catch (err) {
        console.error('Failed to get shzira stats:', err)
        throw err
    }
}

// Get daily shzira stats for line chart
async function getShziraDailyStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'daily' }
        const res = await httpService.get('shzira', params)
        
        // Format data for Recharts
        return res.map(item => ({
            date: new Date(item.date).toLocaleDateString('he-IL', { 
                month: '2-digit', 
                day: '2-digit' 
            }),
            sets: item.totalSets || 0,
            runs: item.totalRuns || 0
        })).sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (err) {
        console.error('Failed to get daily shzira stats:', err)
        throw err
    }
}

// Get shzira stats by type for pie chart
async function getShziraTypeStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'type' }
        const res = await httpService.get('shzira', params)
        
        // Format data for Recharts pie chart
        return res.map((item, index) => ({
            name: item.type,
            value: item.totalSets,
            runs: item.totalRuns,
            count: item.count,
            fill: getChartColor(index)
        }))
    } catch (err) {
        console.error('Failed to get type shzira stats:', err)
        throw err
    }
}

// Get monthly total for current month
async function getShziraMonthlyTotal(filterBy) {
    try {
        // Use the backend aggregation to get the total directly
        const params = { ...filterBy, groupBy: 'monthly' }
        const res = await httpService.get('shzira', params)
        
        // Since we're filtering by month in the backend, just sum all results
        const total = res.reduce((sum, item) => sum + item.totalSets, 0)
        return total
    } catch (err) {
        console.error('Failed to get monthly shzira total:', err)
        throw err
    }
}

// Get daily dying stats for line chart
async function getDyingDailyStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'daily' }
        const res = await httpService.get('dying', params)
        
        // Format data for Recharts
        return res.map(item => ({
            date: new Date(item.date).toLocaleDateString('he-IL', { 
                month: '2-digit', 
                day: '2-digit' 
            }),
            sets: item.totalSets || 0,
            dye: item.totalDye || 0,
            dolelot: item.totalDolelot || 0
        })).sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (err) {
        console.error('Failed to get daily dying stats:', err)
        throw err
    }
}

// Get dying stats by type for pie chart
async function getDyingTypeStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'type' }
        const res = await httpService.get('dying', params)
        
        // Format data for Recharts pie chart
        return res.map((item, index) => ({
            name: item.type,
            value: item.totalSets,
            dye: item.totalDye,
            dolelot: item.totalDolelot,
            count: item.count,
            fill: getChartColor(index)
        }))
    } catch (err) {
        console.error('Failed to get type dying stats:', err)
        throw err
    }
}

// Get monthly total for current month
async function getDyingMonthlyTotal(filterBy) {
    try {
        // Use the backend aggregation to get the total directly
        const params = { ...filterBy, groupBy: 'monthly' }
        const res = await httpService.get('dying', params)
        
        // Since we're filtering by month in the backend, just sum all results
        const total = res.reduce((sum, item) => sum + item.totalSets, 0)
        return total
    } catch (err) {
        console.error('Failed to get monthly dying total:', err)
        throw err
    }
}

// Get monthly dying grams usage for bar chart
async function getDyingMonthlyGrams(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'monthly' }
        const res = await httpService.get('dying', params)
        
        // Format data for Recharts bar chart with both grams and sets
        return res.map(item => ({
            monthYear: `${item.month}/${item.year}`,
            totalDye: item.totalDye || 0,
            totalSets: item.totalSets || 0, // Add sets data (already filtered for redye: false in backend)
            month: item.month,
            year: item.year
        })).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year
            return a.month - b.month
        })
    } catch (err) {
        console.error('Failed to get monthly dying grams:', err)
        throw err
    }
}

// Get daily set production stats for line chart
async function getSetProductionDailyStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'daily' }
        const res = await httpService.get('order/logs/production/daily', params)
        
        // Format data for Recharts
        return res.map(item => ({
            date: new Date(item.date).toLocaleDateString('he-IL', { 
                month: '2-digit', 
                day: '2-digit' 
            }),
            sets: item.totalSets || 0,
            count: item.count || 0
        })).sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (err) {
        console.error('Failed to get daily set production stats:', err)
        throw err
    }
}

// Get set production stats by type for pie chart
async function getSetProductionTypeStats(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'type' }
        const res = await httpService.get('order/logs/production/type', params)
        
        // Format data for Recharts pie chart
        return res.map((item, index) => ({
            name: item.type,
            value: item.totalSets,
            count: item.count,
            fill: getChartColor(index)
        }))
    } catch (err) {
        console.error('Failed to get type set production stats:', err)
        throw err
    }
}

// Get monthly total set production
async function getSetProductionMonthlyTotal(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'monthly' }
        const res = await httpService.get('order/logs/production/total', params)
        
        return res.totalSets || 0
    } catch (err) {
        console.error('Failed to get monthly set production total:', err)
        throw err
    }
}

// Get available set types for filtering
async function getAvailableSetTypes() {
    try {
        const res = await httpService.get('dying/set-types')
        return res
    } catch (err) {
        console.error('Failed to get available set types:', err)
        throw err
    }
}

// Get dye powder inventory
async function getDyePowderInventory() {
    try {
        const res = await httpService.get('order/dye-powder/inventory')
        return res.inventory
    } catch (err) {
        console.error('Failed to get dye powder inventory:', err)
        throw err
    }
}

// Get total dye usage for selected time period
async function getDyeTotalUsage(filterBy) {
    try {
        const params = { ...filterBy, groupBy: 'monthly' }
        const res = await httpService.get('dying', params)
        
        // Sum all dye usage across the time period
        const totalDye = res.reduce((sum, item) => sum + (item.totalDye || 0), 0)
        return totalDye
    } catch (err) {
        console.error('Failed to get total dye usage:', err)
        throw err
    }
}

// Helper function to get chart colors
function getChartColor(index) {
    const colors = [
        '#134869', '#1b6898', '#a8d7f8', '#0b2e43', 
        '#77c3f0', '#4a90c2', '#2e5984', '#6bb6ff'
    ]
    return colors[index % colors.length]
}

