import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    showNavbar: true
}

const setNavbarDisplay = (state, action) => {
    return updateObject(state, { showNavbar: !state.showNavbar });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NAVBAR_SET_DISPLAY: return setNavbarDisplay(state, action);
        default: return state;
    }
}

export default reducer