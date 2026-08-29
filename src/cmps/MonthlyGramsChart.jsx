import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function MonthlyGramsChart({ data, isLoading }) {
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

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                    dataKey="monthYear" 
                    stroke="#134869"
                    fontSize={12}
                />
                <YAxis 
                    stroke="#134869"
                    fontSize={12}
                    tick={{ dx: -50 }}
                />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #134869',
                        borderRadius: '8px',
                        direction: 'rtl'
                    }}
                    labelStyle={{ color: '#134869', fontWeight: 'bold' }}
                    formatter={(value, name, props) => [
                        value,
                        name === 'totalDye' ? 'גרם צבע' : name === 'totalSets' ? 'סטים צביעה' : name
                    ]}
                    labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                            const data = payload[0].payload
                            const gramsPerSet = data.totalSets > 0 ? (data.totalDye / data.totalSets).toFixed(2) : 0
                            return (
                                <div>
                                    <div>{label}</div>
                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                        גרם לסט: {gramsPerSet}
                                    </div>
                                </div>
                            )
                        }
                        return label
                    }}
                />
                <Bar 
                    dataKey="totalDye" 
                    fill="#134869"
                    radius={[4, 4, 0, 0]}
                    name="גרם צבע"
                />
                <Bar 
                    dataKey="totalSets" 
                    fill="#1b6898"
                    radius={[4, 4, 0, 0]}
                    name="סטים צביעה"
                />
                <Legend 
                    wrapperStyle={{ direction: 'rtl', paddingTop: '20px' }}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
