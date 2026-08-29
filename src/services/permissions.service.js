// Utility functions for checking user permissions

export const permissionsService = {
    hasPageAccess,
    hasFeatureAccess,
    hasRole,
    canAccessStats,
    canAccessDying,
    canAccessShzira,
    canAccessOrders
}

function hasPageAccess(user, page) {
    if (!user || !user.permissions || !user.permissions.pages) {
        return false
    }
    return user.permissions.pages.includes(page)
}

function hasFeatureAccess(user, feature) {
    if (!user || !user.permissions || !user.permissions.features) {
        return false
    }
    return user.permissions.features[feature] === true
}

function hasRole(user, role) {
    if (!user || !user.permissions || !user.permissions.roles) {
        return false
    }
    return user.permissions.roles.includes(role)
}

// Specific permission checks for common use cases
function canAccessStats(user) {
    return hasPageAccess(user, 'stats') && hasFeatureAccess(user, 'canViewStats')
}

function canAccessDying(user) {
    return hasPageAccess(user, 'dying') && hasFeatureAccess(user, 'canAccessDying')
}

function canAccessShzira(user) {
    return hasPageAccess(user, 'shzira') && hasFeatureAccess(user, 'canAccessShzira')
}

function canAccessOrders(user) {
    return hasRole(user, 'admin') || (hasPageAccess(user, 'orders') && hasFeatureAccess(user, 'canAccessOrders'))
}
