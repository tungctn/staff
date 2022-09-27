import axios from 'axios'

const config = {
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export default axios.create(config)