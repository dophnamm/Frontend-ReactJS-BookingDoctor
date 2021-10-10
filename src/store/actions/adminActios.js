import actionTypes from './actionTypes';
import { 
    getAllServiecs, createNewUserServices,
    getAllUsers, deleteUserServices,
    editUserServices, getTopDoctorHomeServices
} from "../../services/userService";
import { toast } from 'react-toastify';


// Gender --------------------------------------
export const fetchGenderStart =  () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllServiecs('GENDER')
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch(e) {
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
export const fetchPositionStart =  () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllServiecs('POSITION')
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch(e) {
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
export const fetchRoleStart =  () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllServiecs('ROLE')
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch(e) {
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
            if(res && res.errCode === 0) {
                toast.success("Success ")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Error ")
                dispatch(saveUserFailded())
            }
        } catch(e) {
            toast.error("Error ")
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
            if(res && res.errCode === 0) {
                toast.success("Delete Success ")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete Error ")
                dispatch(deleteUserFailed())
            }
        } catch(e) {
            toast.error("Delete Error ")
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
            if(res && res.errCode === 0) {
                toast.success("Update Success ")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update Error ")
                dispatch(editUserFailed())
            }
        } catch(e) {
            toast.error("Update Error ")
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
export const fetchAllUserStart =  () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if(res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch(e) {
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
            if(res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_USER_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_USER_FAILDED
                })
            }
        } catch(e) {
            console.log('FETCH_USER_DOCTOR FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_USER_FAILDED
            })
        }
    }
}