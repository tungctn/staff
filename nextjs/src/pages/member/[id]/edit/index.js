import React, { useContext, useEffect, useState } from 'react'
import MemberEdit from '../../../../components/MemberEdit'
import { useRouter } from 'next/router'
import { AppContext } from '../../../../context/AppContext'
import { getCurrentUser, setAuthHeader } from '../../../../api/auth'
import { useParams } from 'react-router-dom'

const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    // const ids = useParams()
    const id = router.query.id
    const getUser = async () => {
        if (localStorage['token']) {
            setAuthHeader(localStorage['token'])
            const response = await getCurrentUser()
            if (Number(id) !== response.data[0].id) {
                router.push('/403')
            }
        }
    }

    // useEffect(() => {

    //     if (id && user && Number(id) !== user.id) {
    //         // getUser()
    //         console.log(user);
    //         router.push('/403')
    //     }
    // }, [id, user])
    useEffect(() => {
        if (Object.values(user).length !== 0 && id) {
            // console.log(user);
            if (Number(id) !== user.id) {
                router.push('/403')
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
