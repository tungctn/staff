import { Button } from 'antd';
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import MemberList from '../../components/MemberList'
import Navbar from '../../components/Navbar'
import { getCurrentUser, setAuthHeader } from '../../api/auth';


const index = () => {

    const router = useRouter()
    useEffect(() => {
        if (!localStorage['token']) {
            router.push('/403')
        }

    }, [])
    // useEffect(() => {
    //     // Router.reload()
    //     for (let index = 0; index < 1; index++) {
    //         Router.reload()
    //     }
    // }, [])

    return (
        <div>
            <div style={{
                top: 0,
                position: 'sticky',
                zIndex: '1'
            }}>
                <Navbar />
            </div>
            <div style={{ marginTop: '100px', height: '1000px' }}>
                <MemberList />
            </div>

        </div >
    )
}

export default index
