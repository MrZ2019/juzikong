import {  SET_LIST } from '../actions'

function juzi(state = [], action) {
    switch (action.type) {
        case SET_LIST:
            return action.payload;
        default:
            return state;
    }
}

export default juzi