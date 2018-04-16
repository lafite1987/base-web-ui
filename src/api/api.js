import axios from './axiosWrapper';


import * as auth from './modules/authApi.js'
import * as user from './modules/userApi.js'
import * as role from './modules/roleApi.js'

let prefix = process.env.API_ROOT

export default {
    auth,
    user,
    role
}