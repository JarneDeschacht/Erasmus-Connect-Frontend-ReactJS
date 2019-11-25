import axios from "../../axios-custom";
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* fetchCountriesSaga() {
    yield put(actions.fetchCountriesStart());
    try {
        const response = yield axios.get('/countries', {
            headers: {
                'Content-Type': 'application/json',
            }
        });     
        yield put(actions.fetchCountriesSuccess(response.data.countries));
    }
    catch (error) {
        yield put(actions.fetchCountriesFail(error));
    }
}