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

const getAllServiecs = (type) => {
    return axios.get(`/api/allcode?type=${type}`)
}

const getTopDoctorHomeServices = (limit) => {
    return axios.get(`/api/top-doctor-home?=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/all-doctor`)
}

const saveDetailDoctorServices = (data) => {
    return axios.post('/api/save-info-doctor', data)
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

export { 
    handleLogin, 
    getAllUsers, 
    createNewUserServices,
    deleteUserServices,
    editUserServices,
    getAllServiecs,
    getTopDoctorHomeServices,
    getAllDoctors,
    saveDetailDoctorServices,
    getDetailInfoDoctor
};
