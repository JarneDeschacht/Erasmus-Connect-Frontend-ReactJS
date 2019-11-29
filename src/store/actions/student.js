import * as actionTypes from './actionTypes';

export const fetchProfileSuccess = (profile) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_SUCCESS,
        profile: profile
    }
}
export const fetchProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_FAIL,
        error: error,
    }
}
export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_START
    }
}
export const fetchProfile = (token, userId) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE,
        token: token,
        userId: userId
    }
}

export const fetchStudentsSuccess = (students) => {
    return {
        type: actionTypes.FETCH_STUDENTS_SUCCESS,
        students: students
    }
}
export const fetchStudentsFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENTS_FAIL,
        error: error,
    }
}
export const fetchStudentsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENTS_START
    }
}
export const fetchStudents = (token, userId) => {
    return {
        type: actionTypes.FETCH_STUDENTS,
        token: token,
        userId: userId
    }
}

export const registerErasmusSuccess = () => {
    return {
        type: actionTypes.REGISTER_ERASMUS_SUCCESS
    }
}
export const registerErasmusFail = (error) => {
    return {
        type: actionTypes.REGISTER_ERASMUS_FAIL,
        error: error,
    }
}
export const registerErasmusStart = () => {
    return {
        type: actionTypes.REGISTER_ERASMUS_START
    }
}
export const registerErasmus = (token, userId, formData) => {
    return {
        type: actionTypes.REGISTER_ERASMUS,
        token: token,
        userId: userId,
        formData: formData
    }
}