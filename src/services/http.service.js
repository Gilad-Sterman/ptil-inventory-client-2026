import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        const isAdminPasswordFlow = err.response?.status === 401 && 
            (err.response?.data?.requiresAdminPassword || err.response?.data?.err === 'Invalid admin password')
        
        if (!isAdminPasswordFlow) {
            console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
            console.dir(err)
        }
        
        if (err.response && err.response.status === 401) {
            // Don't auto-redirect if this is part of the admin password flow
            if (!isAdminPasswordFlow) {
                sessionStorage.clear()
                window.location.assign('/')
            }
        }
        throw err
    }
}