


import { FETCH_ALL, SET_LIST } from '../actions'

function list(state = [], action) {
    switch (action.type) {
        case SET_LIST:
            return action.payload;
        default:
            return state;
    }
}

export default list