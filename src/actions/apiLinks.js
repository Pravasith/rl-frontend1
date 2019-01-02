// export const API_BASE_URL = 'http://159.65.144.155:8000/'
// export const API_SOCKETS_URL = 'ws://159.65.144.155:8000/nes'

// export const API_BASE_URL = 'https://api.tscalehub.com:8000/'
// export const API_SOCKETS_URL = 'wss://api.tscalehub.com:8000/nes'

export const API_SOCKETS_URL = 'ws://localhost:8000/nes'
const API_BASE_URL = 'http://localhost:8000/'

// export const API_BASE_URL = 'http://159.89.175.187:8000/' - old

const API_PATH = 'api/'
const API_URL = API_BASE_URL + API_PATH

export const api = {
    CREATE_USER : API_URL + 'user/create-user',
    GET_USER_DATA : API_URL + 'user/get-user-data',

    UPDATE_USER_DATA : API_URL + 'user/update-user-data',
    UPDATE_VENDOR_DATA: API_URL + 'user/update-vendor-data',

    GET_VENDOR_DATA: API_URL + 'user/get-vendor-data',

    USER_SIGN_OUT: API_URL + 'user/sign-out',
    USER_LOGIN : API_URL + 'user/login',

    UPDATE_USER_TYPE : API_URL + 'user/update-user-type',
    
    KNOCK_LINKEDIN_VENDOR: API_BASE_URL + 'knock/linkedin-vendor',
    KNOCK_GOOGLE_VENDOR: API_BASE_URL + 'knock/google-vendor',
    REGISTER_LINKEDIN_USER : API_URL + 'user/login-linkedin-user',
    REGISTER_GOOGLE_USER : API_URL + 'user/login-google-user',

    UPLOAD_IMAGE : API_URL + 'common/upload-image',

    GET_SUB_CATEGORIES : API_URL + 'categories/get-sub-categories',
    GET_PRODUCT_TYPES : API_URL + 'categories/get-product-types',

    ADD_NEW_PRODUCT : API_URL + 'categories/add-new-product',
    GET_PRODUCT_DATA : API_URL + 'categories/get-product-data',
    UPDATE_PRODUCT : API_URL + 'categories/update-product-data',

    DELETE_PRODUCT : API_URL + 'categories/delete-product'
}