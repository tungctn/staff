import React, { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { UserOutlined, SearchOutlined } from "@ant-design/icons"
import axios from '../../api/axios';
import { getMember } from '../../api/member';
import Router, { useRouter } from 'next/router';
import { setAuthHeader } from '../../api/auth';

const index = () => {

    const [member, setMember] = useState([])

    // const [id, setID] = useState(1)
    const [filter, setFilter] = useState('')

    const router = useRouter()

    useEffect(() => {
        ListMember()
    }, [filter]);

    const ListMember = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getMember(filter)
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

    return (
        <div>
            <Input
                style={{ width: '30%', float: 'right', marginBottom: '10px' }}
                size="large" placeholder="search"
                prefix={<SearchOutlined />}
                onChange={searchInput}
            />
            <Table
                pagination={{ position: ['bottomCenter'] }}
                columns={columns}
                dataSource={data}
                onRow={(r) => ({
                    onClick: () => { viewMember(r.key) }
                })}
            />
        </div>
    )
}

export default index
