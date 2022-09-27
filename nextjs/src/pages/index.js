import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoginForm from '../components/LoginForm'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import { AppContext } from '../context/AppContext'

function Page() {
    const router = useRouter()

    useEffect(() => {
        // setTimeout(() => {
        //     router.push('/login', undefined, { shallow: true })
        // }, 3000)
        setTimeout(() => {
            if (localStorage['token']) {
                router.push('/member')
            } else {
                router.push('/login')
            }
        }, 3000)

    }, [])

    return (
        <div style={{ height: '600px', textAlign: 'center', lineHeight: '600px' }}>
            <Spin
                size='large'
                tip="Loading..."
            >
            </Spin>
        </div>
    )
}

export default Page