import { useState } from 'react'

export function ChartContainer({ 
    title, 
    type, 
    className, 
    children, 
    isLoading = false, 
    controls = null,
    onControlChange = null 
}) {
    
    // Placeholder chart component - will be replaced with actual charts
    const renderPlaceholderChart = () => {
        return (
            <div className="chart-placeholder">
                <div className="chart-placeholder-content">
                    <div className="chart-icon">
                        {type === 'line' && '📈'}
                        {type === 'bar' && '📊'}
                        {type === 'pie' && '🥧'}
                        {type === 'area' && '📉'}
                    </div>
                    <p>תרשים {title}</p>
                    <small>נתונים יטענו בקרוב</small>
                </div>
            </div>
        )
    }

    return (
        <div className={`chart-container ${className}`}>
            <div className="chart-header">
                <h3 className="chart-title">{title}</h3>
                {controls && (
                    <div className="chart-controls">
                        {controls}
                    </div>
                )}
            </div>
            <div className="chart-content">
                {isLoading ? (
                    <div className="chart-loader">
                        <div className="loader-small"></div>
                    </div>
                ) : children ? (
                    children
                ) : (
                    renderPlaceholderChart()
                )}
            </div>
        </div>
    )
}
