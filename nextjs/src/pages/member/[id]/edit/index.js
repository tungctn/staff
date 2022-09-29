import React, { useContext, useEffect, useState } from 'react'
import MemberEdit from '../../../../components/MemberEdit'
import { useRouter } from 'next/router'
import { AppContext } from '../../../../context/AppContext'
import { getCurrentUser, setAuthHeader } from '../../../../api/auth'
import { useParams } from 'react-router-dom'

const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        if (Object.values(user).length !== 0 && id) {
            if (Number(id) !== user.id) {
                router.push('/403')
            }
            if (Number(id) === user.id && user.role === 'users') {
                router.push('/404')
            }
        }
        
    }, [user, id])

    return (
        <div>
            <MemberEdit id={id} />
        </div>
    )
}

export default index
