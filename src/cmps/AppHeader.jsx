import { Link, NavLink, useNavigate } from "react-router-dom"
import { logout } from "../store/user.actions"
import { useSelector } from "react-redux"
import { useState } from "react"
import { permissionsService } from "../services/permissions.service"

export function AppHeader() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [showNav, setShowNav] = useState(false)
    const navigate = useNavigate()

    function onLogout() {
        setShowNav(false)
        logout()
    }
    return (
        <header className="app-header">
            <div className="header-side">
                <NavLink to={'/'}>
                    <div className="logo">
                        <img src="https://res.cloudinary.com/dollaguij/image/upload/v1706465164/White-Beige-removebg_rmm7si.png" alt="" />
                    </div>
                </NavLink>
                {loggedUser && <div className={`nav-btn ${showNav ? 'close' : 'open'}`} onClick={() => setShowNav(!showNav)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>}
                {loggedUser && <div className={`header-section ${showNav ? 'opened' : 'closed'}`} >
                    {permissionsService.canAccessDying(loggedUser) && <NavLink to={'/dying'} onClick={() => setShowNav(false)}>צביעה</NavLink>}
                    {permissionsService.canAccessShzira(loggedUser) && <NavLink to={'/shzira'} onClick={() => setShowNav(false)}>שזירה</NavLink>}
                    {permissionsService.hasPageAccess(loggedUser, 'home') && <NavLink to={'/'} onClick={() => setShowNav(false)}>הוספה</NavLink>}
                    {/* {permissionsService.hasPageAccess(loggedUser, 'new') && <NavLink to={'/new'} onClick={() => setShowNav(false)}>חדש</NavLink>} */}
                    {permissionsService.hasPageAccess(loggedUser, 'search') && <NavLink to={'/search'} onClick={() => setShowNav(false)}>חיפוש +</NavLink>}
                    {permissionsService.hasPageAccess(loggedUser, 'dashboard') && <NavLink to={'/dashboard'} onClick={() => setShowNav(false)}>מעקב</NavLink>}
                    {permissionsService.canAccessStats(loggedUser) && <NavLink to={'/stats'} onClick={() => setShowNav(false)}>סטטיסטיקות</NavLink>}
                    {permissionsService.canAccessOrders(loggedUser) && <NavLink to={'/orders'} onClick={() => setShowNav(false)}>מכירות</NavLink>}
                    {permissionsService.hasRole(loggedUser, 'admin') && <NavLink to={'/admin/permissions'} onClick={() => setShowNav(false)}>ניהול הרשאות</NavLink>}
                </div>}
            </div>
            {/* <div className="header-section" > */}
            {/* <NavLink to={'/'}>
                    <div className="logo">
                        <img src="https://res.cloudinary.com/dollaguij/image/upload/v1703232276/WhatsApp_Image_2023-12-21_at_17.15.46_tuubbf.jpg" alt="" />
                    </div>
                </NavLink> */}
            {/* {loggedUser && <NavLink to={'/'}>הוספה</NavLink>} */}
            {/* {loggedUser && <NavLink to={'/new'}>חדש</NavLink>} */}
            {/* {loggedUser && <NavLink to={'/dashboard'}>מעקב</NavLink>} */}
            {/* </div> */}
            {!loggedUser && <NavLink to={'/login'}>כניסה</NavLink>}
            {loggedUser && <NavLink to={'/login'}>
                <button onClick={() => onLogout()} className="btn-logout">
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1702281692/icons8-logout-32_rpd7my.png" alt="" />
                </button>
            </NavLink>}
        </header>
    )
} 