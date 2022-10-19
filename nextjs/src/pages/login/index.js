import React, { useContext, useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import { AppContext } from '../../context/AppContext'

const index = () => {

    const { getUser, setUser } = useContext(AppContext)

    useEffect(() => {
        console.log(localStorage);
        console.log(getUser());
        setUser({})
    }, [])
    return (
        <div style={{ backgroundColor: 'red' }}>
            <LoginForm />
        </div>
    )
}

export default index
