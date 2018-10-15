import {api} from './apiLinks'
import axios from 'axios'


export function getUserData() {
    return (dispatch) => {

        return axios.get(api.GET_USER_DATA,
            {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    "Content-Type": "application/json",
                },

                withCredentials: true
            })

            .then(res => {
                // console.log("response", res)
                dispatch({
                    type: "UPDATE_USER_DATA",
                    payload: res.data
                })
            })

            .catch(err => {
                console.error('bad', err)
                throw err
            })
    }
}
