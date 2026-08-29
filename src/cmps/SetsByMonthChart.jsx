import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function SetsByMonthChart({ data, isLoading }) {

    if (isLoading) {
        return (
            <div className="chart-loader">
                <div className="loader-small"></div>
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

    // Get unique stores for colors - extract from data keys excluding period-related keys and total
    const stores = data.length > 0 ? Object.keys(data[0]).filter(key => 
        !['periodKey', 'month', 'year', 'week', 'isWeekly', 'weekStart', 'סה"כ'].includes(key)
    ) : []
    const colors = ['#154869', '#8BB3C7', '#A89B85', '#1A4F6B', '#154869', '#8BB3C7']
    const totalColor = '#154869' // Deep Blue for total line
    const totalKey = 'סה"כ'

    // Custom tooltip to show sets count
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="tooltip-entry">
                            <span 
                                className="tooltip-color" 
                                style={{ backgroundColor: entry.color }}
                            ></span>
                            <span className="tooltip-store">{entry.dataKey}:</span>
                            <span className="tooltip-value">
                                {entry.value} סטים
                            </span>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="chart-wrapper" style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 30, right: 30, left: 60, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                        dataKey="periodKey" 
                        stroke="#666"
                        fontSize={12}
                    />
                    <YAxis 
                        stroke="#666"
                        fontSize={12}
                        tickFormatter={(value) => `${value}`}
                        label={{ value: 'כמות סטים', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666', fontSize: '12px' } }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {stores.map((store, index) => (
                        <Bar
                            key={`bar-${store}-${index}`}
                            dataKey={store}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                    {/* Total bar */}
                    <Bar
                        key="total-bar"
                        dataKey={totalKey}
                        fill={totalColor}
                        opacity={0.7}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
