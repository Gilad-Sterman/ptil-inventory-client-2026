import { userService } from "../services/user.service";
import { store } from "./store";
import { SET_USER } from "./user.reducer";

export async function login(username, adminPassword = null) {
    try {
        const user = await userService.login(username, adminPassword)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.error('Login action failed:', err)
        throw err
    }
}

export function logout() {
    userService.logout()
    store.dispatch({
        type: SET_USER,
        user: null
    })
}