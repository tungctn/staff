import { Button } from 'antd';
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import MemberList from '../../components/MemberList'
import Navbar from '../../components/Navbar'
// import SearchMember from '../../components/SearchMember'
import { getCurrentUser, setAuthHeader } from '../../api/auth';
import { Input } from 'antd'
import { UserOutlined, SearchOutlined } from "@ant-design/icons";


const index = () => {

    const router = useRouter()
    useEffect(() => {
        if (!localStorage['token']) {
            router.push('/403')
        }

    }, [])

    return (
        <div>
            <div style={{
                top: 0,
                position: 'sticky',
                zIndex: '1'
            }}>
                <Navbar />
            </div>
            {/* <Input /> */}
            <div style={{ marginTop: '100px', height: '1000px' }}>
                {/* <SearchMember /> */}

                <MemberList />
            </div>

        </div >
    )
}

export default index
