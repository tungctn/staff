import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar } from 'antd'
import { AntDesignOutlined, EditOutlined, DeleteOutlined, CameraTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { getMemberById } from '../../api/member';
import { AppContext } from '../../context/AppContext';
import Navbar from '../Navbar'
import { getCurrentUser, setAuthHeader } from '../../api/auth';
// import axios from '../../../api/axios';

const index = () => {

    const { user } = useContext(AppContext)
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        if (Object.values(user).length !== 0) {
            setCurrentUser(user)
        }
    }, [user])

    return (
        <div>
            <Navbar />
            <Row style={{ marginTop: '100px' }}>
                <Col span={18}></Col>
                <Col span={2} style={{ fontSize: '40px', color: '#00bfff' }}>
                    <EditOutlined onClick={() => router.push(`/profile/edit`)} />
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row type='flex' justify='center' align='middle' >
                <Col span={9}>
                    <Avatar
                        style={{ display: 'block', margin: '0 auto' }}
                        preview={false}
                        size={200}
                        icon={<AntDesignOutlined />}
                        src={currentUser.image}
                    />
                    {/* <CameraTwoTone /> */}
                </Col>
                <Col
                    span={10}
                    style={{ border: '2px solid black', borderRadius: '10px', padding: '20px' }}
                >

                    <Form name="nest-messages">
                        <Form.Item
                            name={['user', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {currentUser.name}
                        </Form.Item>
                        <Form.Item
                            name={['user', 'name']}
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {currentUser.email}
                        </Form.Item>
                        {currentUser.role !== 'users' && (
                            <div>
                                <Form.Item
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    {currentUser.phone}
                                </Form.Item>
                                <Form.Item
                                    label="Address"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    {currentUser.address}
                                </Form.Item>
                            </div>

                        )
                        }


                        {/* <Form.Item
                            name={['user', 'email']}
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {currentUser.phone}
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {currentUser.address}
                        </Form.Item> */}
                        <Form.Item
                            name={['user', 'age']}
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {currentUser.role}
                        </Form.Item>
                    </Form>


                </Col>
                <Col span={5} />
            </Row>
        </div>
    )
}

export default index
