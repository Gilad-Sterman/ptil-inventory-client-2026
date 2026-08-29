import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../store/user.actions"

export function Login() {
    const [username, setUsername] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [showAdminPassword, setShowAdminPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const loginInProgress = useRef(false)

    async function onLogin(username, adminPassword = null) {
        if (!username || isLoading || loginInProgress.current) return
        
        loginInProgress.current = true
        setIsLoading(true)
        setErrorMessage('')
        
        try {
            const user = await login(username, adminPassword)
            navigate('/')
        } catch (err) {
            setIsLoading(false)
            loginInProgress.current = false
            
            if (err.response?.status === 401 && err.response?.data?.requiresAdminPassword) {
                setShowAdminPassword(true)
                setErrorMessage('')
            } else if (err.response?.data?.err === 'Invalid admin password') {
                setErrorMessage('סיסמת מנהל שגויה')
            } else {
                setErrorMessage('התחברות נכשלה')
            }
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        
        if (isLoading) return
        
        if (showAdminPassword && adminPassword) {
            onLogin(username, adminPassword)
        } else if (!showAdminPassword) {
            onLogin(username)
        }
    }

    return (
        <section className='login' >
            <h2>התחברות</h2>
            {errorMessage && (
                <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                    {errorMessage}
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="username">שם משתמש</label>
                    <input
                        className="login-username"
                        required
                        type="text"
                        name="username"
                        placeholder="שם משתמש"
                        value={username}
                        disabled={isLoading || showAdminPassword}
                        onInput={(ev) => setUsername(ev.target.value)}
                    />
                </div>
                
                {showAdminPassword && (
                    <div className="form-input">
                        <label htmlFor="adminPassword">סיסמת מנהל</label>
                        <input
                            className="login-admin-password"
                            required
                            type="password"
                            name="adminPassword"
                            placeholder="סיסמת מנהל"
                            value={adminPassword}
                            disabled={isLoading}
                            onInput={(ev) => setAdminPassword(ev.target.value)}
                            autoFocus
                        />
                    </div>
                )}
                
                <button className="btn-login" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="login-spinner"></span>
                            מתחבר...
                        </>
                    ) : showAdminPassword ? (
                        'כניסה כמנהל'
                    ) : (
                        'כניסה'
                    )}
                </button>
                
                {showAdminPassword && (
                    <button 
                        type="button" 
                        className="btn-back" 
                        onClick={() => {
                            setShowAdminPassword(false)
                            setAdminPassword('')
                            setErrorMessage('')
                        }}
                        disabled={isLoading}
                        style={{ marginTop: '0.5rem', background: 'transparent', border: '1px solid #ccc' }}
                    >
                        חזור
                    </button>
                )}
            </form>
        </section>
    )
}