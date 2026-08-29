export function StatsCard({ title, value, icon, trend, trendType, isDye }) {
    return (
        <div className="stats-card">
            <div className="stats-card-header">
                <div className="stats-card-icon">{icon}</div>
                <h3 className="stats-card-title">{title}</h3>
            </div>
            <div className="stats-card-content">
                <div className="stats-card-value">{value}</div>
                {isDye && (
                    <div className={`stats-card-trend ${trendType}`}>
                        {trend}
                    </div>
                )}
            </div>
        </div>
    )
}
