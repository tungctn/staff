import React, { useContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Row, Image, Button, Form, Col, Input, Checkbox, notification, Spin } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { APIRegister, checkEmail, checkLogin, setAuthHeader } from '../../api/auth';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'antd/lib/form/Form';

// import './style.css'


const index = () => {

    // const { isLogin, setIsLogin } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState(false)

    const [isSuccess, setIsSuccess] = useState(false)

    const [email, setEmail] = useState('')

    const router = useRouter()

    const [form] = Form.useForm()

    const [initValue, setInitValue] = useState({ name: '', email: '', password: '' })

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 3,
        })
    }

    // useEffect(() => {
    //     if (isLogin) {
    //         // setIsLoading(true)
    //         setTimeout(() => {
    //             router.push('/home')
    //         }, 3000)
    //     }
    // }, [isLogin])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [isLoading])

    const checkError = async (email) => {
        let isError = false
        // setAuthHeader(localStorage['token'])
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
        return isError
    }

    // const onBlur = (params) => {
    //     checkError(params)
    // }

    const onBlur = () => {
        checkError(initValue.email)
    }

    const onFinish = async (values) => {
        const isError = await checkError(values.email)
        if (!isError) {
            setIsLoading(true)
            await APIRegister(values)
            setIsSuccess(true)
            openNotification('success', 'Register successful')
        }
    };

    const handleOk = async () => {
        const isError = await checkError(initValue.email)
        if (!isError) {
            setIsLoading(true)
            await APIRegister(initValue)
            console.log(APIRegister({ name: 'tung', email: 'tung1@gmail.com', password: 'tung' }).then((res) => { console.log(res.data) }))
            setIsSuccess(true)
            openNotification('success', 'Register successful')
        }
    }

    const onFinishFailed = (errorInfo) => {
        // setIsLoading(true)
        // setIsLogin(false)
        // openNotification('error', 'Login failed')
    };


    return (
        <div>

            <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
                <Col>
                    <Image
                        preview={false}
                        width={400}
                        src="https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-lock-security-locked-login-business-flat-line-filled-icon-ve-png-image_1622471.jpg"
                    />
                    <Spin
                        tip="Loading..."
                        spinning={isLoading}
                    >
                        <Form
                            form={form}
                            name='authForm'
                            className='form'
                            layout='vertical'
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        // onFieldsChange={onFieldsChange}
                        >
                            <Form.Item
                                label='Name'
                                name='name'
                                rules={[
                                    { required: true, message: 'Please input your name' }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder='Name' onChange={(e) => setInitValue({ ...initValue, name: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    { required: true, type: 'email', message: 'Please input your email' }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder='Email' onChange={(e) => setInitValue({ ...initValue, email: e.target.value })} onBlur={onBlur} />
                            </Form.Item>

                            <Form.Item
                                label='Password'
                                name='password'
                                rules={[{ required: true, message: 'Please input your password' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='Password' onChange={(e) => setInitValue({ ...initValue, password: e.target.value })} />
                            </Form.Item>

                            {/* <Form.Item
                                label='Confirm passwword'
                                name='rePassword'
                                rules={[{ required: true, message: 'Please confirm your password' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder='Password' />
                            </Form.Item> */}

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                {/* <a style={{ float: 'right' }} href="">
                                    Forgot password
                                </a> */}
                            </Form.Item>

                            <Form.Item>
                                <Button onClick={handleOk} htmlType="submit" style={{ width: '100%' }} className='btn' type='primary'>
                                    Register
                                </Button>
                                You have an account? <a href='./login'>Login now!</a>
                            </Form.Item>
                            {/* {isSuccess && <h3>Success!</h3>} */}
                        </Form>
                    </Spin>

                </Col>
            </Row>

        </div>
    )
}

export default index
