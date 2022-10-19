import React, { useState, useEffect } from 'react'
import { Table, Input, Select, Button, Popover, Row, Col, Card } from 'antd'
import 'antd/dist/antd.css'
import { UserOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons"
import axios from '../../api/axios';
import { getMember } from '../../api/member';
import Router, { useRouter } from 'next/router';
import { setAuthHeader } from '../../api/auth';
import style from './index.module.css'

// const data = []

// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`
//     });
// }



const index = () => {

    const { Option } = Select
    const [member, setMember] = useState([])

    // const [id, setID] = useState(1)
    const [filter, setFilter] = useState('')
    const [select, setSelect] = useState(10)
    const [visible, setVisible] = useState(false)
    const [chooseFilter, setChooseFilter] = useState('email')
    const [bgColor, setBgColor] = useState('#bae8e8')
    const router = useRouter()

    useEffect(() => {
        ListMember()
        console.log(chooseFilter);
    }, [filter, chooseFilter]);

    const ListMember = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getMember(filter, chooseFilter)
        console.log(response)
        setMember(response.member)
    }

    const viewMember = (id) => {
        router.push(`/member/${id}`)
    }

    const searchInput = (e) => {
        console.log(e.target.value);
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
        setVisible(newOpen);
        console.log(newOpen);
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
    ];

    const data = member?.map((user, index) => {

        return {
            number: index + 1,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
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
                        // style={{ margin: '0 20px' }}
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

// const index = () => {

//     return (
//         <div>
//             <Table
//                 columns={columns}
//                 dataSource={data} />
//         </div>
//     );
// }

export default index
