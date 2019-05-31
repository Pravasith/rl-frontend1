import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'

// import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

// import registerServiceWorker from './registerServiceWorker'
// import App from './App'

import allReducers from '../reducers'

// import './index.css'

const makeStore = compose
    (
    applyMiddleware(
        thunk,
        logger 
    )
    )
    (createStore)
    (allReducers)


export default makeStore


