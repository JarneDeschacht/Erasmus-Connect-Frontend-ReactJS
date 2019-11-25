import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const fetchCountriesStart = (state, action) => {   
    return updateObject(state, {
        loading: true
    });
}
const fetchCountriesSuccess = (state, action) => {
    return updateObject(state, {
        countries: action.countries,
        loading: false,
    })
}
const fetchCountriesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}

const initialState = {
    countries: [],
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COUNTRIES_START: return fetchCountriesStart(state, action);
        case actionTypes.FETCH_COUNTRIES_SUCCESS: return fetchCountriesSuccess(state, action);
        case actionTypes.FETCH_COUNTRIES_FAIL: return fetchCountriesFail(state, action);
        default: return state;
    }
};

export default reducer;