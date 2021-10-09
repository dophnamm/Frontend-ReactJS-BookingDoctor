import actionTypes from './actionTypes';
import { getAllServiecs, createNewUserServices } from "../../services/userService";

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
            let res = await createNewUserServices(data) ;
            if(res && res.errCode === 0) {
                dispatch(saveUserSuccess())
            } else {
                dispatch(saveUserFailded())
            }
        } catch(e) {
            dispatch(saveUserFailded())
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SECCESS',
})

export const saveUserFailded = () => ({
    type: 'CREATE_USER_FAILDED',
})