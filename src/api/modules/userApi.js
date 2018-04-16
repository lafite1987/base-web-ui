import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const add = (params) => { return axios.post(`${prefix}/manager/user/add.json`, params); };

export const update = (id, params) => { return axios.post(`${prefix}/manager/user/${id}/update.json`, params); };

export const list = (params) => { return axios.post(`${prefix}/manager/user/list.json`, params); };

export const del = (id) => { return axios.post(`${prefix}/manager/user/${id}/del.json`); };

export const detail = (id) => { return axios.get(`${prefix}/manager/user/${id}/detail.json`); };

export const roles = (id) => { return axios.get(`${prefix}/manager/user/${id}/roles.json`); };

export const saveRoles = (id, roleIds) => { return axios.post(`${prefix}/manager/user/${id}/saveRoles.json?roleIds=` + roleIds); };