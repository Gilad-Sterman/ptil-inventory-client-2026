import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SetProductionTypeChart({ data, isLoading }) {
    if (isLoading) {
        return (
            <div className="chart-loading">
                <div className="loader-small"></div>
                <p>טוען נתונים...</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="chart-no-data">
                <p>אין נתונים להצגה</p>
            </div>
        )
    }

    // Sort data by value (descending) and take top 15 items to avoid overcrowding
    const sortedData = [...data]
        .sort((a, b) => b.value - a.value)
        .slice(0, 15)
        .map(item => ({
            ...item,
            // Truncate long names for better display
            name: item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name
        }))

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    <p className="tooltip-value">סטים יוצרו: {data.value}</p>
                    <p className="tooltip-value">פעמים: {data.count}</p>
                </div>
            )
        }
        return null
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={sortedData}
                margin={{ top: 20, right: 30, left: 60, bottom: 70 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                    dataKey="name"
                    stroke="#134869"
                    fontSize={10}
                    angle={-30}
                    textAnchor="start"
                    height={5}
                    interval={0}
                    // tick={{ dy: 20 }}
                />
                <YAxis 
                    stroke="#134869"
                    fontSize={12}
                    tick={{ dx: -50 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                    dataKey="value" 
                    fill="#134869"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
