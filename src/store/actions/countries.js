import * as actionTypes from './actionTypes';

export const fetchCountriesSuccess = (countries) => {
    return {
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
        countries: countries
    }
}
export const fetchCountriesFail = (error) => {
    return {
        type: actionTypes.FETCH_COUNTRIES_FAIL,
        error: error,
    }
}
export const fetchCountriesStart = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES_START
    }
}
export const fetchCountries = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES
    }
}