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
    GET_STUDENTS_BY_COLLEGE : API_URL + 'student/get-students-by-college',
    UPDATE_USER_DATA : API_URL + 'user/update-user-data',
    UPDATE_USER_TYPE : API_URL + 'user/update-user-type',
    UPDATE_ARCHITECT_DATA : API_URL + 'user/update-arc-data',
    KNOCK_LINKEDIN : API_BASE_URL + 'knock/linkedin',
    KNOCK_LINKEDIN_VENDOR: API_BASE_URL + 'knock/linkedin-vendor',
    KNOCK_GOOGLE : API_BASE_URL + 'knock/google',
    KNOCK_GOOGLE_VENDOR: API_BASE_URL + 'knock/google-vendor',
    REGISTER_LINKEDIN_USER : API_URL + 'user/login-linkedin-user',
    REGISTER_GOOGLE_USER : API_URL + 'user/login-google-user',
    UPLOAD_IMAGE : API_URL + 'common/upload-image',
    UPLOAD_REGULAR_IMAGE : API_URL + 'common/upload-image-full',
    UPDATE_PROFILE_PICTURE : API_URL + 'user/update-user-profile-pic',
    STUDENT_LOGIN : API_URL + 'student/login',
    UPLOAD_ASSIGNMENT_DATA : API_URL + 'common/post-detailed-assignment',
    POST_NEW_COMMENT : API_URL + 'project/post-new-comment',
    PUT_SKILL : API_URL + 'project/post-skills',
    GET_SKILL_RATED_OR_NOT : API_URL + 'project/get-if-skill-rated',
    GET_UNREAD_NOTIFICATIONS : API_URL + 'user/get-unread-notifications',
    RESET_UNREAD_NOTIFICATIONS : API_URL + 'user/reset-unread-notifications',
    FACULTY_SIGNOUT : API_URL + 'faculty/sign-out',
    STUDENT_SIGNOUT : API_URL + 'student/sign-out',
    GET_DETAILED_ASSIGNMENTS_SUBJECT : API_URL + 'assignment/get-detailed-assignments/subject-wise',
    UPLOAD_PROJECT_DATA : API_URL + 'project/post-project',
    GET_PROJECTS_EMAILID : API_URL + 'project/get-projects',
    GET_PROJECTS_BY_ID : API_URL + 'project/get-projects-by-id',
    GET_PROJECT_BY_ID : API_URL + 'project/get-project-by-id',
    GET_FULL_USER_DETAILS : API_URL + 'user/get-user-by-id-auth',
    GET_PROJECTS_BY_COLLEGE : API_URL + 'project/get-projects-by-college',
    GET_PROJECTS_BY_ID_AUTH : API_URL + 'project/get-project-by-id-auth',
    GET_ALL_PROJECTS : API_URL + 'project/get-all-projects',
    GET_PROJECTS_RANDOM : API_URL + 'project/get-projects-random',
    CHECK_FOR_DATA : API_URL + 'architect/check-data',
    SEND_OTP_MOBILE : API_URL + 'architect/send-mobile-otp',
    SEND_OTP_EMAIL : API_URL + 'architect/send-email-otp',
    SEND_OTP_EMAIL_MOBILE : API_URL + 'architect/send-email-mobile-otp',
    VALIDATE_OTP : API_URL + 'architect/validate-otp',
    UPDATE_ARCCOINS_ON_PROJECT : API_URL + 'project/update-arccoins',
    DELETE_PROJECT_OWN : API_URL + 'project/delete-project',
}