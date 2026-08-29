import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DyingCreationChart({ data, isLoading }) {
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
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                    dataKey="date" 
                    stroke="#134869"
                    fontSize={12}
                />
                <YAxis 
                    stroke="#134869"
                    fontSize={12}
                    tick={{ dx: -30 }}
                />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #134869',
                        borderRadius: '8px',
                        direction: 'rtl'
                    }}
                    labelStyle={{ color: '#134869', fontWeight: 'bold' }}
                    formatter={(value, name) => {
                        let label = ''
                        if (name === 'sets') label = 'סטים'
                        else if (name === 'dolelot') label = 'דוללות'
                        else if (name === 'dye') label = 'צבע (גרם)'
                        return [value, label]
                    }}
                />
                <Line 
                    type="monotone" 
                    dataKey="sets" 
                    stroke="#134869" 
                    strokeWidth={3}
                    dot={{ fill: '#134869', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#134869', strokeWidth: 2 }}
                />
                <Line 
                    type="monotone" 
                    dataKey="dolelot" 
                    stroke="#1b6898" 
                    strokeWidth={2}
                    dot={{ fill: '#1b6898', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: '#1b6898', strokeWidth: 2 }}
                />
                <Line 
                    type="monotone" 
                    dataKey="dye" 
                    stroke="#a8d7f8" 
                    strokeWidth={2}
                    dot={{ fill: '#a8d7f8', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: '#a8d7f8', strokeWidth: 2 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
