import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar, notification, Spin, } from 'antd'
import { AntDesignOutlined, EditOutlined, DeleteOutlined, CameraTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { createMember, getMemberById, updateMember } from '../../api/member'
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar'
import { checkEmail, checkPhone, setAuthHeader } from '../../api/auth'

const index = ({ role }) => {

    const router = useRouter()
    const [initValue, setInitValue] = useState({ name: '', email: '', phone: '', address: '', role: 'member' })
    const [image, setImage] = useState("https://www.imggroup.com.vn/Content/images/logo-img.png")
    const [form] = Form.useForm()
    const isVNPhoneMobile =
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

    useEffect(() => {
        if (role && role !== 'admin') {
            router.push('/403')
        }
    }, [role])

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 3,
        })
    }

    const checkErrorEmail = async (email) => {
        let isError = false
        if (email && email.trim().length !== 0) {
            const response = await checkEmail(email)
            if (response.success === 'false') {
                form.setFields([
                    {
                        name: 'email',
                        errors: ['Email exist'],
                    },
                ])
                isError = true
            }
        }

        return isError
    }

    const checkErrorPhone = async (phone) => {
        let isError = false
        if (phone && phone.trim().length !== 0) {
            const response = await checkPhone(phone)
            if (response.success === 'false') {
                form.setFields([
                    {
                        name: 'phone',
                        errors: ['Phone exist'],
                    },
                ])
                isError = true
            }
        }

        return isError
    }

    const onBlurEmail = () => {
        checkErrorEmail(initValue.email)
    }

    const onBlurPhone = () => {
        checkErrorPhone(initValue.phone)
    }

    const handleOk = async () => {
        const isErrorEmail = await checkErrorEmail(initValue.email)
        const isErrorPhone = await checkErrorPhone(initValue.phone)
        if (!isErrorEmail && !isErrorPhone) {
            const response = await createMember(initValue)
            if (response.success === 'true') {
                openNotification('success', "Create Successful")
                setTimeout(() => router.push('/member'))
            } else {
                openNotification('error', 'Create Failed')
            }
        }
    }

    return (
        <div>
            <Navbar />
            <Row type='flex' justify='center' align='middle' style={{ marginTop: '100px' }}>
                <Col span={9}>
                    <div style={{ cursor: 'pointer' }}
                    >
                        <Avatar
                            style={{ display: 'block', margin: '0 auto', position: 'relative' }}
                            preview={false}
                            size={200}
                            icon={<AntDesignOutlined />}
                            src={image}

                        />
                    </div>

                </Col>
                <Col
                    span={10}
                    style={{ border: '2px solid black', borderRadius: '10px', padding: '20px' }}
                >

                    <Form
                        form={form}
                    >
                        <Form.Item
                            name='name'
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input type="text" onChange={(e) => { setInitValue({ ...initValue, name: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item
                            name='email'
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email'
                                },
                            ]}
                        >
                            <Input
                                onBlur={onBlurEmail}
                                type="email"
                                onChange={(e) => { setInitValue({ ...initValue, email: e.target.value }) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='phone'
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                },
                                () => ({
                                    validator(_, value) {
                                        if (isVNPhoneMobile.test(value) === false) {
                                            return Promise.reject(
                                                new Error('Phone is not type'),
                                            )
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <Input
                                onBlur={onBlurPhone}
                                type="text"
                                onChange={(e) => { setInitValue({ ...initValue, phone: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item
                            name='address'
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input type="text" onChange={(e) => { setInitValue({ ...initValue, address: e.target.value }) }} />
                        </Form.Item>
                        <Button onClick={handleOk} type='primary' style={{
                            float: 'right', width: '120px',
                            height: '40px',
                            fontSize: '20px',
                            borderRadius: '10px'
                        }}>Create</Button>
                    </Form>
                </Col>
                <Col span={5} />
            </Row>
        </div>
    )
}

export default index
