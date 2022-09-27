import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { AuthReducer } from "./Reducer"
import { message, notification } from 'antd'
import {
    SET_AUTH_BEGIN,
    SET_AUTH_SUCCESS,
    SET_AUTH_FAILED,
    SET_USER_LIST,
    SET_USER_UPDATE,
    SET_USER_DELETE
} from "./action"
import { checkAuth, checkLogin, getCurrentUser, logoutAPI, setAuthHeader } from '../api/auth'
import Router, { useRouter } from 'next/router'


export const initState = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
    listUser: []
}

export const AppContext = createContext()



const AppContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, initState)
    const [user, setUser] = useState({})

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
        console.log(response);
        if (response.status === 1) {
            localStorage.setItem('token', response.token)
            setAuthHeader(localStorage['token'])
            openNotification('success', 'Login successful')
            // openNotification('error', 'Login failed')
            getUser()
            router.push('/member')
            // Router.reload()
        } else {
            openNotification('error', 'Login failed')
        }
    }
    const handleLogout = async () => {
        // dispatch({
        //     type: SET_AUTH_BEGIN
        // })
        const responseData = await logoutAPI()

        localStorage.removeItem('token')
        // Router.reload()
        // router.
        router.push('/login')
        openNotification('success', responseData.msg)
    }


    // console.log("context: ", authState);
    // console.log("context: ", localStorage['token']);

    useEffect(() => {
        getUser()
        setAuthHeader(localStorage['token'])
    }, [])

    const getUser = async () => {
        if (localStorage['token']) {
            setAuthHeader(localStorage['token'])
            const response = await getCurrentUser()
            // if (response.data) {
                setUser(response.data[0])
            // }
            console.log(response);
        }
    }
    console.log(user);

    const data = {
        user,
        authState,
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

