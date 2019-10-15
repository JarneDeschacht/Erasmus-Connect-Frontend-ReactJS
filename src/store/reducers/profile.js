import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const fetchProfileStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}
const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile,
        loading: false,
    })
}
const fetchProfileFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}

const initialState = {
    profile: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
        default: return state;
    }
};

export default reducer;