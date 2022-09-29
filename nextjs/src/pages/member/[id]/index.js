import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
// import { getMemberById } from '../../../api/member';
import axios from '../../../api/axios';
import MenberDetail from '../../../components/MemberDetail';
import { useClientRouter } from "use-client-router";
import { AppContext } from '../../../context/AppContext';

const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    const id = router.query.id
    const [currentUser, setCurrentUser] = useState({})
    const isEdit = Number(id) === currentUser.id

    useEffect(() => {
        if (Object.values(user).length !== 0) {
            // if (Number(id) !== user.id) {
            //     router.push('/403')
            // }
            if (Number(id) === user.id && user.role === 'users') {
                router.push('/404')
            }
            setCurrentUser(user)
        }
    }, [user])

    return (
        <div>
            <MenberDetail id={id} role={currentUser.role} isEdit={isEdit} />
        </div>
    )
}

export default index
