import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    messages: null,
    selectedConnection: null
}

const getMessagesSuccess = (state, action) => {
    return updateObject(state, {
        messages: action.messages
    })
}

const selectChat = (state, action) => {
    return updateObject(state, {
        selectedConnection: action.connectionId
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_MESSAGES_SUCCESS: return getMessagesSuccess(state, action);
        case actionTypes.SELECT_CHAT: return selectChat(state, action);
        default: return state;
    }
}

export default reducer;