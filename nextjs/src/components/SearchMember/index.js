import React from 'react'
import { Input } from 'antd'
import { UserOutlined, SearchOutlined } from "@ant-design/icons"

const index = () => {

    const test = "tung"
    const searchInput = (e) => {
        console.log(e.target.value);

    }

    return (
        <div>
            <Input
                style={{ width: '30%', float: 'right', marginBottom: '10px' }}
                size="large" placeholder="large size"
                prefix={<SearchOutlined />}
                onChange={searchInput}
            />
        </div>
    )
}

export default index
