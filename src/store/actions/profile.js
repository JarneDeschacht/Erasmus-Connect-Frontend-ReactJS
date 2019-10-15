import * as actionTypes from './actionTypes';

export const fetchProfileSuccess = (profile) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile: profile
    }
}
export const fetchProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        error: error,
    }
}
export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
}
export const fetchProfile = (token, userId) => {
    return {
        type: actionTypes.FETCH_PROFILE,
        token: token,
        userId: userId
    }
}