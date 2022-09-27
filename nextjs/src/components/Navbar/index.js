import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { ContactsFilled, UserOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Menu, Avatar, Dropdown, Space, Row, Col, Image, Spin } from 'antd';
import Router, { useRouter } from 'next/router';
import { getCurrentUser, setAuthHeader } from '../../api/auth';
import { AppContext } from '../../context/AppContext';


const index = () => {

    const [isLoading, setIsLoading] = useState(true)
    const { handleLogout } = useContext(AppContext)
    const { user } = useContext(AppContext)
    // const router = useRouter()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        if (user) {
            setCurrentUser(user)
        }
    }, [user])
    const userInformations = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={() => { router.push('/profile') }}>My profile</a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a onClick={handleLogout}>Log out</a>
                    ),
                },
            ]}
        />
    );

    const router = useRouter()

    return (
        <Row style={{ backgroundColor: '#e3f6f5', height: '76px' }}>
            <Col span={1}></Col>
            <Col span={3} className='center' style={{ lineHeight: '76px' }}>
                <Image
                    src='https://sun-asterisk.vn/wp-content/uploads/2020/10/logo-sun@2x.png'
                    preview={false}
                    width={100}
                    height={40}
                    onClick={() => { router.push('/member') }}
                />
                {/* <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}
            </Col>
            <Col span={16}>
                {currentUser.role === 'admin' &&
                    <a
                        style={{ fontSize: '29px', lineHeight: '76px' }}
                        onClick={() => { router.push('/member/create') }}
                    >
                        Create member
                    </a>
                }

            </Col>
            <Col span={4} >
                <Dropdown overlay={userInformations} className='pointer' trigger="click">
                    <Row>
                        <Col span={14}></Col>
                        <Col span={6} className='center' style={{ lineHeight: '76px' }}>
                            <Avatar

                                size={50}
                                src={currentUser.image} />
                        </Col>
                        <Col span={4} style={{ lineHeight: '76px' }} className='center'>
                            <DownOutlined />
                        </Col>

                    </Row>
                </Dropdown>
            </Col>
        </Row>
    );
}

export default index
