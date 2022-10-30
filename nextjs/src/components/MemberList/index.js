import React, { useState, useEffect } from 'react'
import { Table, Input, Select, Button, Popover, Row, Col, Card } from 'antd'
import 'antd/dist/antd.css'
import { UserOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons"
import axios from '../../api/axios';
import { getMember } from '../../api/member';
import Router, { useRouter } from 'next/router';
import { setAuthHeader } from '../../api/auth';
import style from './index.module.css'
import moment from 'moment'

const index = () => {

    const { Option } = Select
    const [member, setMember] = useState([])
    const [filter, setFilter] = useState('')
    const [visible, setVisible] = useState(false)
    const [chooseFilter, setChooseFilter] = useState('email')
    const router = useRouter()

    useEffect(() => {
        ListMember()
    }, [filter, chooseFilter]);

    const ListMember = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getMember(filter, chooseFilter)
        setMember(response.member)
    }

    const viewMember = (id) => {
        router.push(`/member/${id}`)
    }

    const searchInput = (e) => {
        setFilter(e.target.value)
    }

    const [pagination, setPagination] = useState({
        position: ['bottomCenter'],
        pageSize: 5,
        showSizeChanger: false,
    })

    const handleSelect = async (value) => {
        setPagination((preState) => (
            { ...preState, pageSize: value }
        ))
    }

    const handleOpenChange = (newOpen) => {
        setVisible(newOpen)
    };

    const columns = [
        {
            title: '###',
            dataIndex: 'number',
            key: 'number'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }
    ];

    const data = member?.map((user, index) => {

        return {
            number: index + 1,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            date: moment(user.created_at).format('YYYY/MM/DD'),
            key: user.id,
        }
    })

    const handleFilter = (value) => {
        setChooseFilter(value)
    }

    const listFilter = (
        <div>
            <h3>Choose filter</h3>
            <Select
                defaultValue="email"
                style={{
                    width: 120,
                }}
                onChange={handleFilter}
            >
                <Option value="email">Email</Option>
                <Option value="phone">Phone</Option>
                <Option value="address">Address</Option>
            </Select>
        </div>
    )



    return (
        <div
        >
            <Row>
                <Col span={4}>
                    <Select
                        defaultValue={5}
                        style={{
                            width: 120,
                        }}
                        onChange={handleSelect}
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={15}>15</Option>
                    </Select>
                </Col>
                <Col span={12} />
                <Col span={1}>
                    <Popover
                        onOpenChange={handleOpenChange}
                        open={visible}
                        content={listFilter}
                        placement="bottom"
                        trigger="click"
                    >

                        <FilterOutlined

                            style={{
                                fontSize: '30px',
                                padding: '5px',
                                borderRadius: '40%',
                                border: '1px solid #333',
                                backgroundColor: visible ? '#bfff00' : null
                            }}
                        />


                    </Popover>
                </Col>
                <Col
                    span={6}>
                    <Input
                        className={style.input}
                        size="large" placeholder="search"
                        prefix={<SearchOutlined />}
                        onChange={searchInput}
                    />
                </Col>
            </Row>


            <Card
                bordered={true}
                style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', marginTop: '20px' }}
            >
                <Table
                    pagination={pagination}
                    columns={columns}
                    dataSource={data}
                    onRow={(r) => ({
                        onClick: () => { viewMember(r.key) }
                    })}
                />
            </Card>
        </div>
    )
}


export default index
