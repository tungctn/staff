import React, { useEffect, useState } from 'react'
import MemberEdit from '../../../components/MemberEdit'
import { useRouter } from 'next/router'
import { getCurrentUser, setAuthHeader } from '../../../api/auth'

const index = () => {

    const [currentUser, setCurrentUser] = useState({})
    const getUser = async () => {
        if (localStorage['token']) {
            setAuthHeader(localStorage['token'])
            const response = await getCurrentUser()
            setCurrentUser(response.data[0])
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <MemberEdit id={currentUser.id} />
        </div>
    )
}

export default index
