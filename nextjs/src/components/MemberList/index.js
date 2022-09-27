import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd';
import axios from '../../api/axios';
import { getMember } from '../../api/member';
import Router, { useRouter } from 'next/router';
import { setAuthHeader } from '../../api/auth';

const index = () => {

    const [member, setMember] = useState([])

    // const [id, setID] = useState(1)

    const router = useRouter()

    useEffect(() => {
        ListMember()
    }, []);

    const ListMember = async () => {
        setAuthHeader(localStorage['token'])
        const response = await getMember()
        console.log(response)
        setMember(response.member)
    }

    const viewMember = (id) => {
        router.push(`/member/${id}`)
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
        // setID(user.id)
        // let number = 0

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
