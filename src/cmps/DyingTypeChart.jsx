import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export function DyingTypeChart({ data, isLoading }) {
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{data.name}</p>
                    <p className="tooltip-value">סטים: {data.value}</p>
                    <p className="tooltip-value">דוללות: {data.dolelot}</p>
                    <p className="tooltip-value">פעמים: {data.count}</p>
                </div>
            )
        }
        return null
    }

    const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (percent < 0.05) return null // Don't show labels for slices smaller than 5%
        
        const RADIAN = Math.PI / 180
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const CustomLegend = ({ payload }) => {
        return (
            <ul className="pie-chart-legend">
                {payload.map((entry, index) => (
                    <li key={index} className="legend-item">
                        <span 
                            className="legend-color" 
                            style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="legend-text">
                            {entry.payload.name} ({entry.payload.value} סטים)
                        </span>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    content={<CustomLegend />}
                    wrapperStyle={{ direction: 'rtl' }}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}
