import { httpService } from './http.service'

export const permissionsApiService = {
    getAllUserPermissions,
    getUserPermissions,
    createUserPermissions,
    updateUserPermissions,
    deleteUserPermissions,
    getDefaultPermissions
}

async function getAllUserPermissions() {
    try {
        return await httpService.get('permissions')
    } catch (err) {
        console.error('Failed to get all user permissions:', err)
        throw err
    }
}

async function getUserPermissions(username) {
    try {
        return await httpService.get(`permissions/${username}`)
    } catch (err) {
        console.error('Failed to get user permissions:', err)
        throw err
    }
}

async function createUserPermissions(username, permissions) {
    try {
        return await httpService.post('permissions', { username, permissions })
    } catch (err) {
        console.error('Failed to create user permissions:', err)
        throw err
    }
}

async function updateUserPermissions(username, permissions) {
    try {
        return await httpService.put(`permissions/${username}`, { permissions })
    } catch (err) {
        console.error('Failed to update user permissions:', err)
        throw err
    }
}

async function deleteUserPermissions(username) {
    try {
        return await httpService.delete(`permissions/${username}`)
    } catch (err) {
        console.error('Failed to delete user permissions:', err)
        throw err
    }
}

async function getDefaultPermissions() {
    try {
        return await httpService.get('permissions/default')
    } catch (err) {
        console.error('Failed to get default permissions:', err)
        throw err
    }
}
