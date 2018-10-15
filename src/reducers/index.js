import { combineReducers } from 'redux'

import { userData } from './userReducer'
import { navBarLoadingClass, responseDataFromAPI } from './generalReducers'

const allReducers = combineReducers({
    userData,
    navBarLoadingClass,
    responseDataFromAPI
})

export default allReducers