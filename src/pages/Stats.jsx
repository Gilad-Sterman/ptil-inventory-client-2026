import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { permissionsService } from '../services/permissions.service'
import { StatsCard } from '../cmps/StatsCard'
import { ChartContainer } from '../cmps/ChartContainer'
import { SetsCreationChart } from '../cmps/SetsCreationChart'
import { SetsTypeChart } from '../cmps/SetsTypeChart'
import { SetProductionCreationChart } from '../cmps/SetProductionCreationChart'
import { SetProductionTypeChart } from '../cmps/SetProductionTypeChart'
import { DyingCreationChart } from '../cmps/DyingCreationChart'
import { DyingTypeChart } from '../cmps/DyingTypeChart'
import { MonthlyGramsChart } from '../cmps/MonthlyGramsChart'
import { TimePeriodSelector } from '../cmps/TimePeriodSelector'
import { GramsPeriodSelector } from '../cmps/GramsPeriodSelector'
import { MonthSelector } from '../cmps/MonthSelector'
import { SetTypeSelector } from '../cmps/SetTypeSelector'
import { statsService } from '../services/stats.service'
import { httpService } from '../services/http.service'

export function Stats() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    // Default to last 30 days for daily chart
    const getDefaultDailyFilter = () => {
        const today = new Date()
        const thirtyDaysAgo = new Date(today)
        thirtyDaysAgo.setDate(today.getDate() - 30)
        return {
            from: thirtyDaysAgo.toISOString().split('T')[0],
            to: today.toISOString().split('T')[0]
        }
    }

    // Default to current month for type chart
    const getDefaultMonthlyFilter = () => {
        const today = new Date()
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        // Format dates to YYYY-MM-DD in local timezone to avoid UTC conversion issues
        const formatLocalDate = (date) => {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }

        return {
            from: formatLocalDate(firstDay),
            to: formatLocalDate(lastDay)
        }
    }

    const getDefaultSelectedMonth = () => {
        const today = new Date()
        return {
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            type: 'month'
        }
    }

    // Default to last 3 months for grams chart
    const getDefaultGramsFilter = () => {
        const today = new Date()
        const threeMonthsAgo = new Date(today)
        threeMonthsAgo.setMonth(today.getMonth() - 3)
        return {
            from: threeMonthsAgo.toISOString().split('T')[0],
            to: today.toISOString().split('T')[0]
        }
    }

    const [dailyChartFilter, setDailyChartFilter] = useState(getDefaultDailyFilter())
    const [monthlyChartFilter, setMonthlyChartFilter] = useState(getDefaultMonthlyFilter())
    const [dyingDailyChartFilter, setDyingDailyChartFilter] = useState(getDefaultDailyFilter())
    const [dyingMonthlyChartFilter, setDyingMonthlyChartFilter] = useState(getDefaultMonthlyFilter())
    const [gramsChartFilter, setGramsChartFilter] = useState(getDefaultGramsFilter())
    const [selectedMonth, setSelectedMonth] = useState(getDefaultSelectedMonth())
    const [filterBy, setFilterBy] = useState({ txt: '', sortBy: 'Description-Heb', sortDir: 'down', maxNum: false, categories: [], moreCategories: [], specificCodes: { begged: [], size: [], strings: [], tying: [] } })

    // const [statsData, setStatsData] = useState({
    //     totalProducts: 0,
    //     totalValue: 0,
    //     lowStock: 0,
    //     recentActivity: 0
    // })

    const [isLoading, setIsLoading] = useState(true)

    // const [shziraData, setShziraData] = useState({
    //     totalProducts: 0,
    //     totalValue: 0,
    //     lowStock: 0,
    //     recentActivity: 0
    // })

    const [dailyChartData, setDailyChartData] = useState([])
    const [typeChartData, setTypeChartData] = useState([])
    const [monthlyTotal, setMonthlyTotal] = useState(0)
    const [dailyChartLoading, setDailyChartLoading] = useState(true)
    const [monthlyChartsLoading, setMonthlyChartsLoading] = useState(true)
    const [currentDailyPeriod, setCurrentDailyPeriod] = useState('last10Days')

    // Dying charts state
    const [dyingDailyChartData, setDyingDailyChartData] = useState([])
    const [dyingTypeChartData, setDyingTypeChartData] = useState([])
    const [dyingMonthlyTotal, setDyingMonthlyTotal] = useState(0)
    const [dyingDailyChartLoading, setDyingDailyChartLoading] = useState(true)
    const [dyingMonthlyChartsLoading, setDyingMonthlyChartsLoading] = useState(true)
    const [currentDyingDailyPeriod, setCurrentDyingDailyPeriod] = useState('last10Days')

    // Grams chart state
    const [gramsChartData, setGramsChartData] = useState([])
    const [gramsChartLoading, setGramsChartLoading] = useState(true)
    const [currentGramsPeriod, setCurrentGramsPeriod] = useState('3months')
    const [currentSetType, setCurrentSetType] = useState('all')

    // Set production charts state
    const [setProductionDailyChartData, setSetProductionDailyChartData] = useState([])
    const [setProductionTypeChartData, setSetProductionTypeChartData] = useState([])
    const [setProductionMonthlyTotal, setSetProductionMonthlyTotal] = useState(0)
    const [setProductionDailyChartLoading, setSetProductionDailyChartLoading] = useState(true)
    const [setProductionMonthlyChartsLoading, setSetProductionMonthlyChartsLoading] = useState(true)
    const [setProductionDailyChartFilter, setSetProductionDailyChartFilter] = useState(getDefaultDailyFilter())
    const [setProductionMonthlyChartFilter, setSetProductionMonthlyChartFilter] = useState(getDefaultMonthlyFilter())
    const [currentSetProductionDailyPeriod, setCurrentSetProductionDailyPeriod] = useState('last30Days')

    // Dye powder inventory state
    const [dyePowderInventory, setDyePowderInventory] = useState(0)
    const [dyePowderLoading, setDyePowderLoading] = useState(true)

    // Total dye usage state
    const [totalDyeUsage, setTotalDyeUsage] = useState(0)
    const [totalDyeUsageLoading, setTotalDyeUsageLoading] = useState(true)
    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        if (!permissionsService.canAccessStats(loggedUser)) {
            navigate('/')
            return
        }
        // loadStatsData(filterBy)
        // loadShziraData()
        loadChartsData()
        loadDyePowderInventory()
        loadTotalDyeUsage()
    }, [loggedUser])

    // Separate effects for each chart filter
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadDailyChart()
        }
    }, [dailyChartFilter])

    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadMonthlyCharts()
        }
    }, [monthlyChartFilter])

    // Dying chart effects
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadDyingDailyChart()
        }
    }, [dyingDailyChartFilter])

    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadDyingMonthlyCharts()
        }
    }, [dyingMonthlyChartFilter])

    // Month selector effect - updates both monthly charts and totals (only for regular month selections)
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser) && selectedMonth.type === 'month') {
            const fromDate = new Date(selectedMonth.year, selectedMonth.month - 1, 1)
            const toDate = new Date(selectedMonth.year, selectedMonth.month, 0)

            // Format dates to YYYY-MM-DD in local timezone to avoid UTC conversion issues
            const formatLocalDate = (date) => {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }

            const monthFilter = {
                from: formatLocalDate(fromDate),
                to: formatLocalDate(toDate)
            }
            setMonthlyChartFilter(monthFilter)
            setDyingMonthlyChartFilter(monthFilter)
        }
    }, [selectedMonth])

    // Grams chart effect
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadGramsChart()
        }
    }, [gramsChartFilter, currentSetType])

    // Set production chart effects
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadSetProductionDailyChart()
        }
    }, [setProductionDailyChartFilter])

    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadSetProductionMonthlyCharts()
        }
    }, [setProductionMonthlyChartFilter])

    // Update set production monthly filter when month changes (only for regular month selections)
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser) && selectedMonth.type === 'month') {
            const fromDate = new Date(selectedMonth.year, selectedMonth.month - 1, 1)
            const toDate = new Date(selectedMonth.year, selectedMonth.month, 0)

            // Format dates to YYYY-MM-DD in local timezone to avoid UTC conversion issues
            const formatLocalDate = (date) => {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }

            const monthFilter = {
                from: formatLocalDate(fromDate),
                to: formatLocalDate(toDate)
            }
            setSetProductionMonthlyChartFilter(monthFilter)
        }
    }, [selectedMonth])

    // Update total dye usage when month changes
    useEffect(() => {
        if (loggedUser && permissionsService.canAccessStats(loggedUser)) {
            loadTotalDyeUsage()
        }
    }, [selectedMonth])

    async function loadChartsData() {
        // Initial load of all charts
        await Promise.all([
            loadDailyChart(),
            loadMonthlyCharts(),
            loadDyingDailyChart(),
            loadDyingMonthlyCharts(),
            loadGramsChart(),
            loadSetProductionDailyChart(),
            loadSetProductionMonthlyCharts()
        ])
        setIsLoading(false)
    }

    async function loadDailyChart() {
        try {
            setDailyChartLoading(true)
            // Determine if we should use monthly grouping based on the current period
            const useMonthlyGrouping = ['halfYear', 'year'].includes(currentDailyPeriod)

            let dailyData
            if (useMonthlyGrouping) {
                // Use monthly grouping for longer periods
                const params = { ...dailyChartFilter, groupBy: 'monthly' }
                const res = await httpService.get('shzira', params)
                // Format monthly data for chart
                dailyData = res.map(item => ({
                    date: `${item.month}/${item.year}`,
                    sets: item.totalSets || 0,
                    runs: item.totalRuns || 0
                })).sort((a, b) => {
                    const [aMonth, aYear] = a.date.split('/').map(Number)
                    const [bMonth, bYear] = b.date.split('/').map(Number)
                    if (aYear !== bYear) return aYear - bYear
                    return aMonth - bMonth
                })
            } else {
                // Use daily grouping for shorter periods
                dailyData = await statsService.getShziraDailyStats(dailyChartFilter)
            }

            setDailyChartData(dailyData)
            setDailyChartLoading(false)
        } catch (err) {
            console.error('Failed to load daily chart data:', err)
            setDailyChartLoading(false)
        }
    }

    async function loadMonthlyCharts() {
        try {
            setMonthlyChartsLoading(true)

            const [typeData, monthTotal] = await Promise.all([
                statsService.getShziraTypeStats(monthlyChartFilter),
                statsService.getShziraMonthlyTotal(monthlyChartFilter)
            ])

            setTypeChartData(typeData)
            setMonthlyTotal(monthTotal)
            setMonthlyChartsLoading(false)
        } catch (err) {
            console.error('Failed to load monthly charts data:', err)
            setMonthlyChartsLoading(false)
        }
    }

    function handleDailyPeriodChange(newFilter, period) {
        setDailyChartFilter(newFilter)
        setCurrentDailyPeriod(period)
    }

    function handleDyingDailyPeriodChange(newFilter, period) {
        setDyingDailyChartFilter(newFilter)
        setCurrentDyingDailyPeriod(period)
    }

    function handleMonthChange(monthFilter, monthData) {
        setSelectedMonth(monthData)
        // The useEffect will handle updating the filters
        // For year and 12months selections, we also need to update the monthly filter immediately
        if (monthData.type === 'year' || monthData.type === '12months') {
            setMonthlyChartFilter(monthFilter)
            setDyingMonthlyChartFilter(monthFilter)
            setSetProductionMonthlyChartFilter(monthFilter)
        }
    }

    function handleGramsPeriodChange(newFilter, period) {
        setGramsChartFilter(newFilter)
        setCurrentGramsPeriod(period)
    }

    function handleSetProductionDailyPeriodChange(newFilter, period) {
        setSetProductionDailyChartFilter(newFilter)
        setCurrentSetProductionDailyPeriod(period)
    }

    function handleSetTypeChange(setType) {
        setCurrentSetType(setType)
    }

    async function loadGramsChart() {
        try {
            setGramsChartLoading(true)
            const filterWithSetType = { ...gramsChartFilter, setType: currentSetType }
            const gramsData = await statsService.getDyingMonthlyGrams(filterWithSetType)
            setGramsChartData(gramsData)
            setGramsChartLoading(false)
        } catch (err) {
            console.error('Failed to load grams chart data:', err)
            setGramsChartLoading(false)
        }
    }

    async function loadDyingDailyChart() {
        try {
            setDyingDailyChartLoading(true)
            // Determine if we should use monthly grouping based on the current period
            const useMonthlyGrouping = ['halfYear', 'year'].includes(currentDyingDailyPeriod)

            let dailyData
            if (useMonthlyGrouping) {
                // Use monthly grouping for longer periods
                const params = { ...dyingDailyChartFilter, groupBy: 'monthly' }
                const res = await httpService.get('dying', params)
                // Format monthly data for chart
                dailyData = res.map(item => ({
                    date: `${item.month}/${item.year}`,
                    sets: item.totalSets || 0,
                    dye: item.totalDye || 0,
                    dolelot: item.totalDolelot || 0
                })).sort((a, b) => {
                    const [aMonth, aYear] = a.date.split('/').map(Number)
                    const [bMonth, bYear] = b.date.split('/').map(Number)
                    if (aYear !== bYear) return aYear - bYear
                    return aMonth - bMonth
                })
            } else {
                // Use daily grouping for shorter periods
                dailyData = await statsService.getDyingDailyStats(dyingDailyChartFilter)
            }

            setDyingDailyChartData(dailyData)
            setDyingDailyChartLoading(false)
        } catch (err) {
            console.error('Failed to load dying daily chart data:', err)
            setDyingDailyChartLoading(false)
        }
    }

    async function loadDyingMonthlyCharts() {
        try {
            setDyingMonthlyChartsLoading(true)

            const [typeData, monthTotal] = await Promise.all([
                statsService.getDyingTypeStats(dyingMonthlyChartFilter),
                statsService.getDyingMonthlyTotal(dyingMonthlyChartFilter)
            ])

            setDyingTypeChartData(typeData)
            setDyingMonthlyTotal(monthTotal)
            setDyingMonthlyChartsLoading(false)
        } catch (err) {
            console.error('Failed to load dying monthly charts data:', err)
            setDyingMonthlyChartsLoading(false)
        }
    }

    async function loadSetProductionDailyChart() {
        try {
            setSetProductionDailyChartLoading(true)
            // Determine if we should use monthly grouping based on the current period
            const useMonthlyGrouping = ['halfYear', 'year'].includes(currentSetProductionDailyPeriod)

            let dailyData
            if (useMonthlyGrouping) {
                // Use monthly grouping for longer periods
                const params = { ...setProductionDailyChartFilter, groupBy: 'monthly' }
                const res = await httpService.get('order/logs/production/daily', params)
                // Format monthly data for chart - group by month/year
                const monthlyMap = {}
                res.forEach(item => {
                    const date = new Date(item.date)
                    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
                    if (!monthlyMap[monthYear]) {
                        monthlyMap[monthYear] = { sets: 0, count: 0 }
                    }
                    monthlyMap[monthYear].sets += item.totalSets || 0
                    monthlyMap[monthYear].count += item.count || 0
                })

                dailyData = Object.entries(monthlyMap).map(([monthYear, data]) => ({
                    date: monthYear,
                    sets: data.sets,
                    count: data.count
                })).sort((a, b) => {
                    const [aMonth, aYear] = a.date.split('/').map(Number)
                    const [bMonth, bYear] = b.date.split('/').map(Number)
                    if (aYear !== bYear) return aYear - bYear
                    return aMonth - bMonth
                })
            } else {
                // Use daily grouping for shorter periods
                dailyData = await statsService.getSetProductionDailyStats(setProductionDailyChartFilter)
            }

            setSetProductionDailyChartData(dailyData)
            setSetProductionDailyChartLoading(false)
        } catch (err) {
            console.error('Failed to load set production daily chart data:', err)
            setSetProductionDailyChartLoading(false)
        }
    }

    async function loadSetProductionMonthlyCharts() {
        try {
            setSetProductionMonthlyChartsLoading(true)

            const [typeData, monthTotal] = await Promise.all([
                statsService.getSetProductionTypeStats(setProductionMonthlyChartFilter),
                statsService.getSetProductionMonthlyTotal(setProductionMonthlyChartFilter)
            ])

            setSetProductionTypeChartData(typeData)
            setSetProductionMonthlyTotal(monthTotal)
            setSetProductionMonthlyChartsLoading(false)
        } catch (err) {
            console.error('Failed to load set production monthly charts data:', err)
            setSetProductionMonthlyChartsLoading(false)
        }
    }

    async function loadDyePowderInventory() {
        try {
            setDyePowderLoading(true)
            const inventory = await statsService.getDyePowderInventory()
            setDyePowderInventory(inventory)
            setDyePowderLoading(false)
        } catch (err) {
            console.error('Failed to load dye powder inventory:', err)
            setDyePowderLoading(false)
        }
    }

    async function loadTotalDyeUsage() {
        try {
            setTotalDyeUsageLoading(true)

            // Create filter based on selected month
            let filter = {}
            if (selectedMonth.type === 'month') {
                const fromDate = new Date(selectedMonth.year, selectedMonth.month - 1, 1)
                const toDate = new Date(selectedMonth.year, selectedMonth.month, 0)

                // Format dates to YYYY-MM-DD in local timezone
                const formatLocalDate = (date) => {
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    return `${year}-${month}-${day}`
                }

                filter = {
                    from: formatLocalDate(fromDate),
                    to: formatLocalDate(toDate)
                }
            } else if (selectedMonth.type === 'year') {
                filter = {
                    from: `${selectedMonth.year}-01-01`,
                    to: `${selectedMonth.year}-12-31`
                }
            } else if (selectedMonth.type === '12months') {
                const today = new Date()
                const twelveMonthsAgo = new Date(today)
                twelveMonthsAgo.setMonth(today.getMonth() - 12)
                filter = {
                    from: twelveMonthsAgo.toISOString().split('T')[0],
                    to: today.toISOString().split('T')[0]
                }
            }

            const totalUsage = await statsService.getDyeTotalUsage(filter)
            setTotalDyeUsage(totalUsage)
            setTotalDyeUsageLoading(false)
        } catch (err) {
            console.error('Failed to load total dye usage:', err)
            setTotalDyeUsageLoading(false)
        }
    }

    if (isLoading) {
        return (
            <section className="stats">
                <div className="stats-header">
                    <h1>סטטיסטיקות</h1>
                </div>
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>טוען נתונים...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="stats">
            <div className="stats-header">
                <h1>סטטיסטיקות</h1>
                <p className="stats-subtitle">מבט כללי על הפעילות</p>
            </div>

            {/* Month-dependent section - visually grouped */}
            <div className="monthly-data-section">
                <div className="month-controls-section">
                    <MonthSelector
                        selectedMonth={selectedMonth}
                        onMonthChange={handleMonthChange}
                    />
                </div>

                <div className="stats-overview">
                    <StatsCard
                        title={`סה״כ סטים יוצרו ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        value={setProductionMonthlyTotal.toLocaleString()}
                        icon="📦"
                        trend={setProductionMonthlyTotal > 0 ? `${setProductionMonthlyTotal} סטים` : "אין נתונים"}
                        trendType={setProductionMonthlyTotal > 0 ? "positive" : "neutral"}
                    />
                    <StatsCard
                        title={`סה״כ סטים שזירה ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        value={monthlyTotal.toLocaleString()}
                        icon="🧵"
                        trend={monthlyTotal > 0 ? `${monthlyTotal} סטים` : "אין נתונים"}
                        trendType={monthlyTotal > 0 ? "positive" : "neutral"}
                    />
                    <StatsCard
                        title={`סה״כ סטים צביעה ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        value={dyingMonthlyTotal.toLocaleString()}
                        icon="💧"
                        trend={dyingMonthlyTotal > 0 ? `${dyingMonthlyTotal} סטים` : "אין נתונים"}
                        trendType={dyingMonthlyTotal > 0 ? "positive" : "neutral"}
                    />
                    <StatsCard
                        isDye={true}
                        title={`סה"כ שימוש בצבע ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        value={
                            totalDyeUsageLoading ? "טוען..." :
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                        {`${(totalDyeUsage / 1000).toFixed(2)} ק״ג`}
                                    </div>
                                </div>
                        }
                        icon="🎨"
                        trend={dyePowderLoading ? "טוען מלאי..." :
                            <div style={{ color: '#134869' }}>
                                מלאי נוכחי:
                                <span style={{ color: dyePowderInventory < 0 ? '#ee2b2b' : '#134869' }}>
                                    {` ${Math.abs(dyePowderInventory).toFixed(2)} ק״ג`}
                                </span>
                                <span style={{ color: dyePowderInventory < 0 ? '#ee2b2b' : dyePowderInventory < 30 ? '#ff9800' : '#4caf50' }}>
                                    {dyePowderInventory < 0 && " (שלילי)"}
                                    {dyePowderInventory >= 0 && dyePowderInventory < 30 && " (נמוך)"}
                                </span>
                            </div>
                        }
                        trendType={dyePowderInventory < 0 ? "negative" : dyePowderInventory < 30 ? "negative" : "positive"}
                    />
                </div>

                <div className="monthly-charts-container">
                    <ChartContainer
                        title={`יצור סטים לפי סוג - ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        type="bar"
                        className="chart-large"
                        isLoading={setProductionMonthlyChartsLoading}
                    >
                        <SetProductionTypeChart data={setProductionTypeChartData} isLoading={setProductionMonthlyChartsLoading} />
                    </ChartContainer>

                    <ChartContainer
                        title={`סטים שזירה לפי סוג - ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        type="pie"
                        className="chart-pie"
                        isLoading={monthlyChartsLoading}
                    >
                        <SetsTypeChart data={typeChartData} isLoading={monthlyChartsLoading} />
                    </ChartContainer>

                    <ChartContainer
                        title={`סטים צביעה לפי סוג - ${selectedMonth.type === 'month' ? `${selectedMonth.month}/${selectedMonth.year}` : selectedMonth.type === 'year' ? selectedMonth.year : '12 חודשים'}`}
                        type="pie"
                        className="chart-pie"
                        isLoading={dyingMonthlyChartsLoading}
                    >
                        <DyingTypeChart data={dyingTypeChartData} isLoading={dyingMonthlyChartsLoading} />
                    </ChartContainer>
                </div>
            </div>

            {/* Other charts section */}
            <div className="charts-container">

                <ChartContainer
                    title="יצור סטים לאורך זמן"
                    type="line"
                    className="chart-large"
                    isLoading={setProductionDailyChartLoading}
                    controls={
                        <TimePeriodSelector
                            onPeriodChange={handleSetProductionDailyPeriodChange}
                            currentPeriod={currentSetProductionDailyPeriod}
                        />
                    }
                >
                    <SetProductionCreationChart data={setProductionDailyChartData} isLoading={setProductionDailyChartLoading} />
                </ChartContainer>

                <ChartContainer
                    title="שזירה לאורך זמן"
                    type="line"
                    className="chart-medium"
                    isLoading={dailyChartLoading}
                    controls={
                        <TimePeriodSelector
                            onPeriodChange={handleDailyPeriodChange}
                            currentPeriod={currentDailyPeriod}
                        />
                    }
                >
                    <SetsCreationChart data={dailyChartData} isLoading={dailyChartLoading} />
                </ChartContainer>

                <ChartContainer
                    title="צביעה לאורך זמן"
                    type="line"
                    className="chart-medium"
                    isLoading={dyingDailyChartLoading}
                    controls={
                        <TimePeriodSelector
                            onPeriodChange={handleDyingDailyPeriodChange}
                            currentPeriod={currentDyingDailyPeriod}
                        />
                    }
                >
                    <DyingCreationChart data={dyingDailyChartData} isLoading={dyingDailyChartLoading} />
                </ChartContainer>

                <ChartContainer
                    title={`שימוש בצבע וסטים צביעה${currentSetType !== 'all' ? ` - ${currentSetType}` : ''}`}
                    type="bar"
                    className="chart-large"
                    isLoading={gramsChartLoading}
                    controls={
                        <div className="chart-controls-group">
                            <SetTypeSelector
                                onSetTypeChange={handleSetTypeChange}
                                currentSetType={currentSetType}
                            />
                            <GramsPeriodSelector
                                onPeriodChange={handleGramsPeriodChange}
                                currentPeriod={currentGramsPeriod}
                            />
                        </div>
                    }
                >
                    <MonthlyGramsChart data={gramsChartData} isLoading={gramsChartLoading} />
                </ChartContainer>
            </div>
        </section>
    )
}