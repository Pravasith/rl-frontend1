// import React, {Component} from "react"
// import {createStore} from "redux"

// import allReducers from "../reducers"

// // // create a simple reducer
// // const reducer = (state = {
// //     foo: ''
// // }, action) => {
// //     switch (action.type) {
// //         case 'FOO':
// //             return {
// //                 ...state,
// //                 foo: action.payload
// //             }
// //         default:
// //             return state
// //     }
// // }

// // create a store creator
// const makeStore = (initialState) => {
//     return createStore(allReducers, initialState)
// }

// export default makeStore




import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'

// import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { logger } from 'redux-logger'

// import registerServiceWorker from './registerServiceWorker';

// import App from './App';
import allReducers from '../reducers'

// import './index.css';

const makeStore = compose
    (
    applyMiddleware(
        thunk,
        // logger 
    )
    )
    (createStore)
    (allReducers)


export default makeStore


