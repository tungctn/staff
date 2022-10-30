import React, { useContext, useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import { AppContext } from '../../context/AppContext'

const index = () => {

    const { setUser } = useContext(AppContext)

    useEffect(() => {
        setUser({})
    }, [])
    return (
        <div>
            <div style=
                {{
                    opacity: 0.85,
                    transition: 'linear 0.8s'
                }}

            >
                <LoginForm />
            </div>

        </div>
    )
}

export default index
