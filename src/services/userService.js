import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserServices = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserServices = (id) => {
    return axios.delete('/api/delete-user', {
        data: { id }
    })
}

const editUserServices = (data) => {
    return axios.put('/api/edit-user', data)
}

export { 
    handleLogin, 
    getAllUsers, 
    createNewUserServices,
    deleteUserServices,
    editUserServices,
};
