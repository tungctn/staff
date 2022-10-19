
import Router from "next/router"
import axios from "./axios"

export const getMember = async (input, filter) => {
    try {

        const response = await axios.get(`/member/list/${filter}/${input ?? ''}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const changePassword = async (password, id) => {
    try {
        const response = await axios.post(`/changepassword/${id}`, password)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}

export const getMemberById = async (id) => {
    try {
        const response = await axios.get(`/member/${id}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}

export const createMember = async (params) => {
    try {
        const response = await axios.post('/member/create', params)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const updateMember = async (member, id) => {
    try {
        const response = await axios.post(`/member/edit/${id}`, member)

        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}

export const deleteMember = async (id) => {
    try {
        const response = await axios.delete(`/delete/${id}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }

}


