// import React from 'react'
import MemberCreate from '../../../components/MemberCreate'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '../../../context/AppContext'


const index = () => {

    const { user } = useContext(AppContext)

    return (
        <div>
            <MemberCreate role={user.role} />
        </div>
    )
}

export default index
