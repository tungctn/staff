import axios from "./axios"

export const checkLogin = async (params) => {
    try {
        const response = await axios.post('/login', params)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const APIRegister = async (params) => {
    try {
        const response = await axios.post('/register', params)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const checkEmail = async (email) => {
    try {
        const response = await axios.get(`/email/${email}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const checkPhone = async (phone) => {
    try {
        const response = await axios.get(`/phone/${phone}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axios.get('/user-profile')
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const logoutAPI = async () => {
    try {
        const response = await axios.get('/logout')
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}