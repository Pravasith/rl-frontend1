import Axios from "axios"


export function navBarLoadingAnimationShowHide(showOrNot) {

    let data

    if (showOrNot) {
        data = {
            loadingAnimationClass: "loadingAnimation",
            uploadClass: "upload hide"
        }
    }

    else {
        data = {
            loadingAnimationClass: "loadingAnimation hide",
            uploadClass: "upload"
        }
    }

    return (dispatch) => {
        dispatch({
            type: "LOADING_INITIATED",
            payload: data
        })
    }
}



export function hitApi(apiURL, typeOfRequest, requestPayload) {

    // returns the response and the code from the backend |||||||||||||||||||||||||||||||||||||||||||||||||

    const requestData = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            "Content-Type": "application/json",
        },

        withCredentials: true
    }

    // console.log(requestPayload)

    // send requests and get deliveries |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    if (typeOfRequest === "GET") {
        return dispatch => {
            return Axios.get(
                apiURL,
                requestData
            )

                .then(responsePayload => {
                    dispatch({
                        type: "API_DELIVERED_RESPONSE",
                        payload: {
                            responsePayload: responsePayload.data,
                            responseCode: responsePayload.status,
                            isError: false
                        }
                    })
                })

                .catch(error => {
                    dispatch({
                        type: "API_THREW_ERROR",
                        payload: {
                            responsePayload: error.response,
                            responseCode: error.response.status,
                            isError: true
                        }
                    })
                })
        }

    }

    else if (typeOfRequest === "POST") {
        return dispatch => {
            return Axios.post(
                apiURL,
                requestPayload,
                requestData
            )

                .then(responsePayload => {
                    dispatch({
                        type: "API_DELIVERED_RESPONSE",
                        payload: {
                            responsePayload: responsePayload.data,
                            responseCode: responsePayload.status,
                            isError: false
                        }
                    })
                })

                .catch(error => {
                    dispatch({
                        type: "API_THREW_ERROR",
                        payload: {
                            responsePayload: error.response,
                            responseCode: error.response.status,
                            isError: true
                        }
                    })
                })
        }
    }

    else if (typeOfRequest === "PUT") {
        return dispatch => {
            return Axios.put(
                apiURL,
                requestPayload,
                requestData
            )

                .then(responsePayload => {
                    dispatch({
                        type: "API_DELIVERED_RESPONSE",
                        payload: {
                            responsePayload: responsePayload.data,
                            responseCode: responsePayload.status,
                            isError: false
                        }
                    })
                })

                .catch(error => {
                    dispatch({
                        type: "API_THREW_ERROR",
                        payload: {
                            responsePayload: error.response,
                            responseCode: error.response.status,
                            isError: true
                        }
                    })
                })
        }
    }

    else if (typeOfRequest === "DELETE") {
        return dispatch => {
            return Axios.delete(
                apiURL,
                // requestPayload,
                requestData
            )

                .then(responsePayload => {
                    dispatch({
                        type: "API_DELIVERED_RESPONSE",
                        payload: {
                            responsePayload: responsePayload.data,
                            responseCode: responsePayload.status,
                            isError: false
                        }
                    })
                })

                .catch(error => {
                    dispatch({
                        type: "API_THREW_ERROR",
                        payload: {
                            responsePayload: error.response,
                            responseCode: error.response.status,
                            isError: true
                        }
                    })
                })
        }
    }
}



