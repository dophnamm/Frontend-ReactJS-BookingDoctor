import actionTypes from './actionTypes';
import {
    getAllServiecs, createNewUserServices,
    getAllUsers, deleteUserServices,
    editUserServices, getTopDoctorHomeServices,
    getAllDoctors, saveDetailDoctorServices,
    getAllSpecialty,
} from "../../services/userService";
import { toast } from 'react-toastify';


// Gender --------------------------------------
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllServiecs('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})


// Position --------------------------------------
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllServiecs('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})


// Role --------------------------------------
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllServiecs('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

// Create new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserServices(data);
            if (res && res.errCode === 0) {
                toast.success("Thành Công .")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Thất bại, vui lòng thử lại .")
                dispatch(saveUserFailded())
            }
        } catch (e) {
            toast.error("Thất Bại, vui lòng thử lại .")
            dispatch(saveUserFailded())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SECCESS,
})

export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
})


//Delete user
export const deleteAUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserServices(id);
            if (res && res.errCode === 0) {
                toast.success("Xoá thành công . ")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Xoá không thành công . ")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error("Xoá không thành công .")
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SECCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

// Edit user
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserServices(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật thành công . ")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Cập nhật thất bại .")
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("Cập nhật thất bại . ")
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SECCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})


// Fetch all user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIDED
})

// Fetch doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeServices('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_USER_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_USER_FAILDED
                })
            }
        } catch (e) {
            console.log('FETCH_USER_DOCTOR FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_USER_FAILDED
            })
        }
    }
}

// Fetch All Doctors

export const fechAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorServices(data)
            if (res && res.errCode === 0) {
                toast.success('Lưu thành công')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS
                })
            } else {
                toast.error('Lưu không thành công, vui lòng thử lại')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILDED
                })
            }
        } catch (e) {
            toast.error('Lưu không thành công, vui lòng thử lại')
            console.log('SAVE_DETAIL_DOCTORS_FAILDED ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILDED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllServiecs("TIME")
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILDED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILDED
            })
        }
    }
}


// get info extra
export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START })
            let resPrice = await getAllServiecs('PRICE')
            let resPayment = await getAllServiecs('PAYMENT')
            let resProvince = await getAllServiecs('PROVINCE')
            let resSpecialty = await getAllSpecialty()

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0) {

                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchAllRequireDoctorInfoSuccess(data))
            } else {
                dispatch(fetchAllRequireDoctorInfoFaild())
            }
        } catch (e) {
            dispatch(fetchAllRequireDoctorInfoFaild())
            console.log(e)
        }
    }
}

export const fetchAllRequireDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchAllRequireDoctorInfoFaild = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILDED
})