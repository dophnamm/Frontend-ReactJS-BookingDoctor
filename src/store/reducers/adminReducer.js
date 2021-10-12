import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // get gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = true;
            state.genders = [];
            return {
                ...state
            }

        // get position 
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state
            }

        // get role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state
            }

        // fetch user redux
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIDED:
            state.users = [];
            return {
                ...state
            }

        // fetch top user doctor
        case actionTypes.FETCH_TOP_USER_SUCCESS:
            state.topDoctor = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_USER_FAILDED:
            state.topDoctor = [];
            return {
                ...state
            }

        // Fetch All doctor
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            state.allDoctor = [];
            return {
                ...state
            }

        // fetch all time 
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = [];
            return {
                ...state
            }

        // get all require
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILDED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;