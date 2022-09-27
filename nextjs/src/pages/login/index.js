import React, { useContext, useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import { AppContext } from '../../context/AppContext'

const index = () => {

    const { getUser } = useContext(AppContext)

    useEffect(() => {
        console.log(localStorage);
        console.log(getUser());
    }, [])
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default index
