import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    getLoggedinUser,
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function login(username, adminPassword = null) {
    try {
        const loginData = { username }
        if (adminPassword) {
            loginData.adminPassword = adminPassword
        }
        
        const user = await httpService.post('user/login', loginData)
        return saveLocalUser(user)
    } catch (err) {
        console.error('Login failed:', err)
        throw err
    }
}

function logout() {
    return sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}