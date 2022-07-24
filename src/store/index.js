import { createStore, applyMiddleware } from 'redux'

import promiseMiddleware from 'redux-promise'

import reducer from '../reducers'

const store = createStore(reducer, applyMiddleware(promiseMiddleware))

export default store