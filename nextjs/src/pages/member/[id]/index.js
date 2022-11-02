import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
// import { getMemberById } from '../../../api/member'
import axios from '../../../api/axios'
import MenberDetail from '../../../components/MemberDetail'
import { AppContext } from '../../../context/AppContext'

const index = () => {

    const { user, getUser } = useContext(AppContext)
    const router = useRouter()
    const id = router.query.id
    const [currentUser, setCurrentUser] = useState({})
    const isEdit = Number(id) === currentUser.id


    useEffect(() => {
        (async () => {
            await getUser().then((res) => {
                setCurrentUser(res)
                if (Number(id) === currentUser.id && currentUser.role === 'users') {
                    router.push('/404')
                }
            })
        })()
    }, [])

    return (
        <div>
            <MenberDetail id={id} role={currentUser.role} isEdit={isEdit} />
        </div>
    )
}

export default index
