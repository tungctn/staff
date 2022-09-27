import React, { useContext, useEffect, useState } from 'react'
import MemberEdit from '../../../../components/MemberEdit'
import { useRouter } from 'next/router'
import { AppContext } from '../../../../context/AppContext'
import { getCurrentUser, setAuthHeader } from '../../../../api/auth'

const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    const id = router.query.id
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
        console.log(currentUser);
        console.log(isEdit);
    }, [])

    useEffect(() => {

    })
    const isEdit = currentUser.id - id

    return (
        <div>
            <MemberEdit id={id} email={currentUser.email} />
        </div>
    )
}

export default index
