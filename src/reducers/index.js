import { combineReducers } from 'redux'

import { userData } from './userReducer'

const allReducers = combineReducers({
    userData
})

export default allReducers