import React, { useContext, useEffect, useState } from 'react'
import MemberEdit from '../../../../components/MemberEdit'
import { useRouter } from 'next/router'
import { AppContext } from '../../../../context/AppContext'
import { getCurrentUser, setAuthHeader } from '../../../../api/auth'
import { useParams } from 'react-router-dom'

const index = () => {

    const router = useRouter()
    const id = router.query.id
    const [currentUser, setCurrentUser] = useState({})
    const { getUser } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            await getUser().then((res) => {
                setCurrentUser(res)
            })
        })()
    }, [])

    return (
        <div>
            <MemberEdit id={id} />
        </div>
    )
}

export default index
