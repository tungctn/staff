import React, { useContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Row, Image, Button, Form, Col, Input, Checkbox, notification, Spin } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { checkAuth, checkLogin, setAuthHeader } from '../../api/auth';
import { AppContext } from '../../context/AppContext'

// import './style.css'


const index = () => {

    // const { isLogin, setIsLogin, dispatch, state } = useContext(AppContext)
    // const { isLogin, setIsLogin, handleLogin, dispatch, state } = useContext(AppContext)
    // const [isLogin, setIsLogin] = useState(isLogin)
    // const { authState, loadUser, login } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const [isLogin, setIsLogin] = useState(false)

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 3,
        })
    }

    const { handleLogin } = useContext(AppContext)


    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [isLoading])

    const onFinish = async (loginFormData) => {
        setIsLoading(true)
        await handleLogin(loginFormData)
    };

    const onFinishFailed = (errorInfo) => {
        setIsLoading(true)
        setIsLogin(false)
        openNotification('error', 'Login failed')
    };
    return (
        <div className='bg' >

            <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
                <Col style={{ border: '1px solid #ccc', padding: '0 10px', backgroundColor: 'white' }}>
                    <Image
                        preview={false}
                        width={400}
                        src="https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-lock-security-locked-login-business-flat-line-filled-icon-ve-png-image_1622471.jpg"
                    />
                    <Spin
                        tip="Loading..."
                        size="large"
                        spinning={isLoading}
                    >
                        <Form
                            name='authForm'
                            className='form'
                            layout='vertical'
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    { required: true, type: 'email', message: 'Please input your email' }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder='Email' />
                            </Form.Item>

                            <Form.Item
                                label='Password'
                                name='password'
                                rules={[{ required: true, message: 'Please input your password' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='Password' />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a style={{ float: 'right' }} href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" style={{ width: '100%' }} className='btn' type='primary'>
                                    Login
                                </Button>
                                You don't have an account? <a href='./register'>Register now!</a>
                            </Form.Item>
                        </Form>
                    </Spin>

                </Col>
            </Row>

        </div>
    )
}

export default index
