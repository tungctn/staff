import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar, notification, Spin } from 'antd'
import { AntDesignOutlined, EditOutlined, DeleteOutlined, CameraTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { getMemberById, updateMember } from '../../api/member';
import { AppContext } from '../../context/AppContext';
import Navbar from '../Navbar'
import { setAuthHeader } from '../../api/auth';
import axios from 'axios';
import styled from 'styled-components'
// import axios from '../../../api/axios';

const index = ({ id, email }) => {

    // const { user, getUser, setUser } = useContext(AppContext)    
    const router = useRouter()
    const [member, setMember] = useState({})
    // const [image, setImage] = useState('')
    const [image, setImage] = useState("https://hihisex.biz/wp-content/uploads/2022/07/nu-phat-thanh-vien-dam-duc-len-lut-dit-nhau-cung-anh-quay-phim-e1659111772297-400x300.jpg")
    const [imageUpload, setImageUpload] = useState("https://hihisex.biz/wp-content/uploads/2022/07/nu-phat-thanh-vien-dam-duc-len-lut-dit-nhau-cung-anh-quay-phim-e1659111772297-400x300.jpg")
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const [initInfo, setInitInfo] = useState({})
    const [currentUser, setCurrentUser] = useState({ name: member.name })
    const fileURL = useRef()
    const isVNPhoneMobile =
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const getMember = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getMemberById(id)
        form.setFieldsValue({
            name: response.member[0].name,
            email: response.member[0].email,
            phone: response.member[0].phone,
            address: response.member[0].address,
            role: response.member[0].role,
        })
        console.log(response);
        if (response.member) {
            setMember(response.member[0])
        }

    }
    useEffect(() => {
        if (id) {
            getMember()
            if (email !== member.email) {
                router.push('/403')
            }
        }
    }, [id, email])

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 3,
        })
    }

    const onFinish = async (value) => {
        const response = await updateMember(value, id)
        if (response.success === 'true') {
            openNotification('success', "Update Successful")
            setTimeout(() => router.push('/member'))
        } else {
            openNotification('error', 'Update Failed')
        }
    }

    const handleClick = (e) => {
        // console.log(e.target.files[0]);
        e.preventDefault()
        if (fileURL.current.value !== null) {
            fileURL.current.value = ''
            fileURL.current.click()
        } else {
            fileURL.current.click()
        }
    }

    const handleChange = (file) => {
        setIsLoading(true)
        console.log(file[0]);
        setImage(file[0]);
        setImageUpload(URL.createObjectURL(file[0]))
        console.log(image);
    }
    const submitData = (e) => {
        e.preventDefault()
        // setImage(e[0])
        // setIsSubmit(true)
        setIsLoading(false)
        const data = new FormData()
        data.append("image", image)
        axios.post(`http://127.0.0.1:8000/api/${id}/upload-image`, data).then((res) => {

            openNotification('success', 'Upload image successful')
            setTimeout(() => {
                Router.reload()
            }, 2500)
        }).catch((e) => {
            console.error("fail", e);
        })
    }

    // const handleSubmit = async () => {
    //     const response = await updateMember(initInfo, id)
    //     if (response.success === 'true') {
    //         openNotification('success', "Update Successful")
    //         setTimeout(() => router.push('/member'))
    //     } else {
    //         openNotification('error', 'Update Failed')
    //     }
    // }

    return (
        <div>
            <Navbar />
            <Row type='flex' justify='center' align='middle' style={{ marginTop: '100px' }}>
                <Col span={9}>
                    <input
                        id='image'
                        name='image'
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileURL}
                        accept="image/*"
                        onChange={(e) => handleChange(e.target.files)}
                    />
                    <Spin
                        spinning={isLoading}
                    >
                        <div style={{ cursor: 'pointer' }}
                            onClick={handleClick}
                        >
                            <Avatar
                                style={{ display: 'block', margin: '0 auto', position: 'relative' }}
                                preview={false}
                                size={200}
                                icon={<AntDesignOutlined />}
                                src={member.image}
                            // src='http://localhost:8000/storage/restaurants/V1EQbbAZ137clxYXunqlPw6rS5b1AsQd1tkDwdiz.jpg'
                            />
                            <CameraTwoTone
                                style={{
                                    position: 'absolute', left: '63%',
                                    bottom: '10%', fontSize: '20px', width: '30px',
                                    height: '30px', borderRadius: '50%', backgroundColor: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0 2px 2px #ccc'
                                }} />
                        </div>
                    </Spin>

                </Col>
                <Col
                    span={10}
                    style={{ border: '2px solid black', borderRadius: '10px', padding: '20px' }}
                >

                    <Form
                        form={form}
                        onFinish={onFinish}
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
                            <Input type="text"
                                defaultValue={member?.name}                            // onChange={(e) => setInitInfo({ ...initInfo, name: e.target.value })} 
                                onChange={(e) => {
                                    setInitInfo({ ...initInfo, name: e.target.value })
                                }}
                            />
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
                            <Input type="email" onChange={(e) => setInitInfo({ ...initInfo, email: e.target.value })} />
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
                            <Input type="text" onChange={(e) => setInitInfo({ ...initInfo, phone: e.target.value })} />
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
                            <Input type="text" onChange={(e) => setInitInfo({ ...initInfo, address: e.target.value })} />
                        </Form.Item>
                        <Form.Item
                            name='role'
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input type="text" onChange={(e) => setInitInfo({ ...initInfo, role: e.target.value })} />
                        </Form.Item>
                        <Button htmlType='submit' type='primary' style={{
                            float: 'right',
                            width: '120px',
                            height: '40px',
                            fontSize: '20px',
                            borderRadius: '10px'
                        }}>Update</Button>
                    </Form>


                </Col>
                <Col span={5} />
            </Row>
            <Row>
                <Col span={9} type='flex' justify='center' align='middle'>
                    <Button
                        style={{
                            width: '120px',
                            height: '40px',
                            fontSize: '20px',
                            borderRadius: '10px'
                        }}
                        onClick={submitData}
                    >
                        Upload
                    </Button>
                </Col>

            </Row>
        </div>
    )
}

export default index
