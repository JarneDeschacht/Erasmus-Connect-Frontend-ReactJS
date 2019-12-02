import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axiosCustom from '../../axios-custom'

export function* getMessagesSaga(action) {
    yield put(actions.getMessagesStart())
    try{
        const response = yield axiosCustom.get(`/getConversation/${action.userId}/${action.chatWithId}/`)
        const conversation = response.data.messages;
        yield put(actions.getMessagesSuccess(conversation))
    }
    catch (error){
        yield put(actions.getMessagesFailed(error))
    }
}

export function* sendMessageSaga(action){
    const messageData = {
        sender: action.senderId,
        receiver: action.receiverId,
        content: action.content
    }

    yield put(actions.sendMessageStart())
    try{
        yield axiosCustom.post('/sendMessage', messageData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }catch (error){
        yield put(actions.sendMessagefail(error.response.data.message))
    }
}