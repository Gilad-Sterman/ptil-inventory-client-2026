import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { permissionsService } from '../services/permissions.service'
import { ChartContainer } from '../cmps/ChartContainer'
import { SalesByMonthChart } from '../cmps/SalesByMonthChart'
import { SetsByMonthChart } from '../cmps/SetsByMonthChart'
import { OrdersPeriodSelector } from '../cmps/OrdersPeriodSelector'
import { ordersService } from '../services/orders.service'

export function Orders() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    // Default to last 3 months
    const getDefaultFilter = () => {
        const today = new Date()
        const threeMonthsAgo = new Date(today)
        threeMonthsAgo.setMonth(today.getMonth() - 3)
        return {
            from: threeMonthsAgo.toISOString().split('T')[0],
            to: today.toISOString().split('T')[0]
        }
    }

    const [salesChartFilter, setSalesChartFilter] = useState(getDefaultFilter())
    const [salesChartData, setSalesChartData] = useState([])
    const [salesChartLoading, setSalesChartLoading] = useState(true)
    const [setsChartData, setSetsChartData] = useState([])
    const [setsChartLoading, setSetsChartLoading] = useState(true)
    const [currentPeriod, setCurrentPeriod] = useState('3months')
    const [isLoading, setIsLoading] = useState(true)
    const [salesTotals, setSalesTotals] = useState({ total: 0, byStore: {} })
    const [setsTotals, setSetsTotals] = useState({ total: 0, byStore: {} })

    // Calculate totals from chart data
    function calculateTotals(chartData) {
        const byStore = {}
        let total = 0

        chartData.forEach(period => {
            Object.keys(period).forEach(key => {
                if (!['periodKey', 'month', 'year', 'week', 'isWeekly', 'weekStart', 'סה"כ'].includes(key)) {
                    const value = period[key] || 0
                    byStore[key] = (byStore[key] || 0) + value
                    total += value
                }
            })
        })

        return { total, byStore }
    }

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        if (!permissionsService.canAccessOrders(loggedUser)) {
            navigate('/')
            return
        }
        // Only load charts once when user is authenticated
        if (isLoading) {
            loadCharts()
        }
    }, [loggedUser])

    useEffect(() => {
        // Only reload when filter or period changes, and user is authenticated
        if (loggedUser && permissionsService.canAccessOrders(loggedUser) && !isLoading) {
            loadCharts()
        }
    }, [salesChartFilter, currentPeriod])

    async function loadCharts() {
        try {
            setSalesChartLoading(true)
            setSetsChartLoading(true)
            
            // Determine groupBy based on current period
            const groupBy = (currentPeriod === 'thisMonth' || currentPeriod === '30days') ? 'weekly' : 'monthly'
            const filterWithGroupBy = { ...salesChartFilter, groupBy }
            
            // Load both charts in parallel
            const [salesData, setsData] = await Promise.all([
                ordersService.getSalesByMonthAndStore(filterWithGroupBy),
                ordersService.getSetsSalesByMonthAndStore(filterWithGroupBy)
            ])
            
            setSalesChartData(salesData)
            setSetsChartData(setsData)
            
            // Calculate totals for sales
            const salesTotals = calculateTotals(salesData)
            setSalesTotals(salesTotals)
            
            // Calculate totals for sets
            const setsTotals = calculateTotals(setsData)
            setSetsTotals(setsTotals)
            
            setSalesChartLoading(false)
            setSetsChartLoading(false)
            setIsLoading(false)
        } catch (err) {
            console.error('Failed to load chart data:', err)
            setSalesChartLoading(false)
            setSetsChartLoading(false)
            setIsLoading(false)
        }
    }

    function handlePeriodChange(newFilter, period) {
        setSalesChartFilter(newFilter)
        setCurrentPeriod(period)
    }

    if (isLoading) {
        return (
            <section className="orders">
                <div className="orders-header">
                    <h1>הזמנות</h1>
                </div>
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>טוען נתונים...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="orders">
            <div className="orders-header">
                <h1>הזמנות</h1>
                <p className="orders-subtitle">ניתוח מכירות ונתוני הזמנות</p>
                <div className="orders-controls">
                    <OrdersPeriodSelector
                        onPeriodChange={handlePeriodChange}
                        currentPeriod={currentPeriod}
                    />
                </div>
            </div>

            <div className="totals-summary">
                <div className="totals-card">
                    <h3>סה"כ מכירות</h3>
                    <div className="total-amount">₪{(salesTotals.total / 1000).toFixed(0)}K</div>
                    <div className="store-breakdown">
                        {Object.entries(salesTotals.byStore).map(([store, amount]) => (
                            <div key={store} className="store-total">
                                <span className="store-name">{store}:</span>
                                <span className="store-amount">₪{(amount / 1000).toFixed(0)}K</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="totals-card">
                    <h3>סה"כ סטים</h3>
                    <div className="total-amount">{setsTotals.total.toLocaleString()}</div>
                    <div className="store-breakdown">
                        {Object.entries(setsTotals.byStore).map(([store, count]) => (
                            <div key={store} className="store-total">
                                <span className="store-name">{store}:</span>
                                <span className="store-amount">{count.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <ChartContainer
                    title={(currentPeriod === 'thisMonth' || currentPeriod === '30days') ? 'מכירות לפי שבוע' : 'מכירות לפי חודש'}
                    type="line"
                    className="chart-large"
                    isLoading={salesChartLoading}
                >
                    <SalesByMonthChart data={salesChartData} isLoading={salesChartLoading} />
                </ChartContainer>

                <ChartContainer
                    title={(currentPeriod === 'thisMonth' || currentPeriod === '30days') ? 'סטים לפי שבוע' : 'סטים לפי חודש'}
                    type="line"
                    className="chart-large"
                    isLoading={setsChartLoading}
                >
                    <SetsByMonthChart data={setsChartData} isLoading={setsChartLoading} />
                </ChartContainer>
            </div>
        </section>
    )
}