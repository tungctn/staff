import React, { useEffect, useState } from 'react'
import Profile from '../../components/Profile'
import { useRouter } from 'next/router'
import { getCurrentUser, setAuthHeader } from '../../api/auth'

const index = () => {

    return (
        <div>
            {/* <Profile id={currentUser.id} /> */}
            <Profile />
        </div>
    )
}

export default index
