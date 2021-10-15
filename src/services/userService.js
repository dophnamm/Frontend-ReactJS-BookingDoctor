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

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorbyDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-info-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/patient-verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
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
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorbyDate,
    getExtraInfoById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById
};
