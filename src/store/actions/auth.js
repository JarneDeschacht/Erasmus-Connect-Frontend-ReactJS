import * as actionTypes from "./actionTypes";

//CHECK STATE & TIMEOUT
export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

//LOGOUT
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

//LOGIN
export const login = (email, password) => {
  return {
    type: actionTypes.LOGIN,
    email: email,
    password: password
  };
};
export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};
export const loginSuccess = (idToken, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};
export const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

//REGISTER
export const register = data => {
  return {
    type: actionTypes.REGISTER,
    data: data
  };
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START
  };
};

export const registerFail = error => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error
  };
};

export const registerSuccess = (idToken, userId) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

//set new password
export const sendForgotPasswordMail = email => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_START,
    email: email
  };
};

export const setNewPassword = (studentId, password) => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD,
    newPassword: password,
    studentId: studentId
  };
};

export const sentPasswordMailSucces = () => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_MAIL_SUCCES
  };
};

export const sentPasswordMailFail = error => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_MAIL_FAIL,
    error: error
  };
};

export const passwordChangedSucces = () => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD_SUCCESS
  };
};

export const passwordChangedFail = error => {
  return {
    type: actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD_FAIL,
    error: error
  };
};

export const clearConfirmationMessage = () => {
  return {
    type: actionTypes.CLEAR_CONFIRMATION_MESSAGE
  };
};

export const clearErrorsAuth = () => {
  return {
    type: actionTypes.CLEAR_ERRORS_AUTH
  };
};
