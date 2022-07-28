


import { combineReducers } from 'redux'

import juzi from './juzi'
import collection from './collection'
import tag from './tag'


const juziApp = combineReducers({
    juzi,
    tag,
    collection
  })
  
  export default juziApp