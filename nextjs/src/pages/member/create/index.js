// import React from 'react'
import MemberCreate from '../../../components/MemberCreate'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '../../../context/AppContext'


const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    return (
        <div>
            <MemberCreate role={currentUser.role} />
        </div>
    )
}

export default index
