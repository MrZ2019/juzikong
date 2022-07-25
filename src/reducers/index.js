


import { combineReducers } from 'redux'

import juzi from './juzi'
import collection from './collection'


const juziApp = combineReducers({
    juzi,
    collection
  })
  
  export default juziApp