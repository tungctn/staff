import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { message, notification } from 'antd'
import { checkAuth, checkLogin, getCurrentUser, logoutAPI, setAuthHeader } from '../api/auth'
import Router, { useRouter } from 'next/router'

export const AppContext = createContext()


const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        setAuthHeader(localStorage['token'])
    }, [])

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 3,
        })
    }
    const router = useRouter()

    const handleLogin = async (loginFormData) => {
        const response = await checkLogin(loginFormData)
        if (response.status === 1) {
            localStorage.setItem('token', response.token)
            setAuthHeader(localStorage['token'])
            openNotification('success', 'Login successful')
            router.push('/member')
        } else {
            openNotification('error', 'Login failed')
        }
    }
    const handleLogout = async () => {
        const responseData = await logoutAPI()
        localStorage.removeItem('token')
        router.push('/login')
        openNotification('success', responseData.msg)
    }



    const getUser = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getCurrentUser()
        return response.data[0]
    }

    const data = {
        user,
        handleLogin,
        handleLogout,
        getUser,
        openNotification,
        setUser,
    }



    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider

