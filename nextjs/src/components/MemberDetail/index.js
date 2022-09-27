import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Layout, Col, Row, Image, Form, Button, Input, Avatar } from 'antd'
import { AntDesignOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { deleteMember, getMemberById } from '../../api/member';
import { AppContext } from '../../context/AppContext';
import Navbar from '../Navbar'
import { setAuthHeader } from '../../api/auth';
// import axios from '../../../api/axios';

const index = ({ id, role, isEdit }) => {


    const router = useRouter()
    const [member, setMember] = useState({})
    const { openNotification } = useContext(AppContext)
    const [image, setImage] = useState("https://hihisex.biz/wp-content/uploads/2022/07/nu-phat-thanh-vien-dam-duc-len-lut-dit-nhau-cung-anh-quay-phim-e1659111772297-400x300.jpg")


    useEffect(() => {

        if (id) {
            setAuthHeader(localStorage['token'])
            getMemberById(id).then((res) => {
                if (res.success === 'false') {
                    router.push('/404')
                } else {
                    setMember(res.member[0])
                }
            })
        }
    }, [id])

    const deleteHandle = async () => {
        const response = await deleteMember(id)
        if (response.success === 'true') {
            openNotification('success', 'Delete successful')
            router.push('/member')
        } else {
            openNotification('success', 'Delete failed')
        }

        console.log(response);
    }

    return (
        <div>
            <Navbar />
            <Row style={{ marginTop: '100px' }}>
                <Col span={17}></Col>
                <Col span={4} style={{ fontSize: '40px', color: '#00bfff' }}>
                    {role === 'admin' && <DeleteOutlined onClick={deleteHandle} />}
                    {
                        isEdit &&
                        <EditOutlined onClick={() => router.push(`/member/${id}/edit`)} />
                    }
                </Col>
                <Col span={3}></Col>
            </Row>
            <Row type='flex' justify='center' align='middle' >
                <Col span={9}>
                    <Avatar
                        style={{ display: 'block', margin: '0 auto' }}
                        preview={false}
                        size={200}
                        icon={<AntDesignOutlined />}
                        src={member.image}
                    />
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
                            {member.name}
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
                            {member.email}
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {member.phone}
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
                            {member.address}
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {member.role}
                        </Form.Item>
                    </Form>


                </Col>
                <Col span={5} />
            </Row>
        </div>
    )
}

export default index
