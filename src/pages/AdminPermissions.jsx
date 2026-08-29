import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { permissionsService } from '../services/permissions.service'
import { permissionsApiService } from '../services/permissions-api.service'

export function AdminPermissions() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    
    const [allPermissions, setAllPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingUser, setEditingUser] = useState(null)
    const [newUsername, setNewUsername] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }
        if (!permissionsService.hasRole(loggedUser, 'admin')) {
            navigate('/')
            return
        }
        loadAllPermissions()
    }, [loggedUser])

    async function loadAllPermissions() {
        try {
            setLoading(true)
            const permissions = await permissionsApiService.getAllUserPermissions()
            setAllPermissions(permissions)
        } catch (err) {
            console.error('Failed to load permissions:', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleCreateUser() {
        if (!newUsername.trim()) return
        
        try {
            await permissionsApiService.createUserPermissions(newUsername.trim())
            setNewUsername('')
            setShowAddForm(false)
            loadAllPermissions()
        } catch (err) {
            console.error('Failed to create user:', err)
            alert('Failed to create user. User may already exist.')
        }
    }

    async function handleUpdatePermissions(username, newPermissions) {
        try {
            await permissionsApiService.updateUserPermissions(username, newPermissions)
            setEditingUser(null)
            loadAllPermissions()
        } catch (err) {
            console.error('Failed to update permissions:', err)
            alert('Failed to update permissions.')
        }
    }

    async function handleDeleteUser(username) {
        if (!confirm(`Are you sure you want to delete permissions for ${username}?`)) return
        
        try {
            await permissionsApiService.deleteUserPermissions(username)
            loadAllPermissions()
        } catch (err) {
            console.error('Failed to delete user:', err)
            alert('Failed to delete user.')
        }
    }

    function PermissionEditor({ userPermissions, onSave, onCancel }) {
        const [permissions, setPermissions] = useState(userPermissions.permissions)

        const availablePages = ['home', 'search', 'dashboard', 'dying', 'shzira', 'stats', 'orders', 'new']
        const availableFeatures = ['canViewStats', 'canAccessDying', 'canAccessShzira', 'canAccessOrders', 'canCreateProducts']

        function togglePage(page) {
            const newPages = permissions.pages.includes(page)
                ? permissions.pages.filter(p => p !== page)
                : [...permissions.pages, page]
            setPermissions({ ...permissions, pages: newPages })
        }

        function toggleFeature(feature) {
            setPermissions({
                ...permissions,
                features: {
                    ...permissions.features,
                    [feature]: !permissions.features[feature]
                }
            })
        }

        function toggleRole(role) {
            const newRoles = permissions.roles.includes(role)
                ? permissions.roles.filter(r => r !== role)
                : [...permissions.roles, role]
            setPermissions({ ...permissions, roles: newRoles })
        }

        return (
            <div className="permission-editor">
                <h3>עריכת הרשאות עבור {userPermissions.username}</h3>
                
                <div className="permission-section">
                    <h4>דפים</h4>
                    {availablePages.map(page => (
                        <label key={page} className="permission-checkbox">
                            <input
                                type="checkbox"
                                checked={permissions.pages.includes(page)}
                                onChange={() => togglePage(page)}
                            />
                            {page}
                        </label>
                    ))}
                </div>

                <div className="permission-section">
                    <h4>תכונות</h4>
                    {availableFeatures.map(feature => (
                        <label key={feature} className="permission-checkbox">
                            <input
                                type="checkbox"
                                checked={permissions.features[feature]}
                                onChange={() => toggleFeature(feature)}
                            />
                            {feature}
                        </label>
                    ))}
                </div>

                <div className="permission-section">
                    <h4>תפקידים</h4>
                    {['user', 'admin'].map(role => (
                        <label key={role} className="permission-checkbox">
                            <input
                                type="checkbox"
                                checked={permissions.roles.includes(role)}
                                onChange={() => toggleRole(role)}
                            />
                            {role}
                        </label>
                    ))}
                </div>

                <div className="permission-actions">
                    <button onClick={() => onSave(userPermissions.username, permissions)}>
                        שמור
                    </button>
                    <button onClick={onCancel}>
                        ביטול
                    </button>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <section className="admin-permissions">
                <h1>ניהול הרשאות</h1>
                <div className="loading">טוען...</div>
            </section>
        )
    }

    return (
        <section className="admin-permissions">
            <div className="admin-header">
                <h1>ניהול הרשאות משתמשים</h1>
                <button onClick={() => setShowAddForm(true)}>
                    הוסף משתמש חדש
                </button>
            </div>

            {showAddForm && (
                <div className="add-user-form">
                    <h3>הוסף משתמש חדש</h3>
                    <input
                        type="text"
                        placeholder="שם משתמש"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button onClick={handleCreateUser}>הוסף</button>
                    <button onClick={() => setShowAddForm(false)}>ביטול</button>
                </div>
            )}

            {editingUser && (
                <PermissionEditor
                    userPermissions={editingUser}
                    onSave={handleUpdatePermissions}
                    onCancel={() => setEditingUser(null)}
                />
            )}

            <div className="permissions-list">
                <h2>משתמשים קיימים</h2>
                {allPermissions.map(userPerm => (
                    <div key={userPerm.username} className="user-permission-item">
                        <div className="user-info">
                            <h3>{userPerm.username}</h3>
                            <div className="user-summary">
                                <span>דפים: {userPerm.permissions.pages.join(', ')}</span>
                                <span>תפקידים: {userPerm.permissions.roles.join(', ')}</span>
                            </div>
                        </div>
                        <div className="user-actions">
                            <button onClick={() => setEditingUser(userPerm)}>
                                ערוך
                            </button>
                            <button 
                                onClick={() => handleDeleteUser(userPerm.username)}
                                className="delete-btn"
                            >
                                מחק
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
