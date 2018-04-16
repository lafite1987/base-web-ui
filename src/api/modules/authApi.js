import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const login = (params) => { return axios.post(`${prefix}/login.json`, params); };
export const getAccountInfo = () => { return axios.get(`${prefix}/getUserInfo.json`); };
export const getMenuList = () => { return axios.get(`${prefix}/manager/menu`); };