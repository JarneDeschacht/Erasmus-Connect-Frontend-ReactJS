import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axiosCustom from '../../axios-custom'

export function* getMessagesSaga(action) {
    yield put(actions.getMessagesStart())

    try{
        const response = yield axiosCustom.get(`/getMessagesFromUser/${action.userId}`)
        const conversation = response.data.messages;
        yield put(actions.getMessagesSuccess(conversation))
    }
    catch (error){
        yield put(actions.getMessagesFailed(error))
    }
}