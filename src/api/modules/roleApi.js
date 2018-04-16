import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT

export const add = (params) => { return axios.post(`${prefix}/manager/role/add.json`, params); };

export const update = (id, params) => { return axios.post(`${prefix}/manager/role/${id}/update.json`, params); };

export const tree = () => { return axios.get(`${prefix}/manager/role/tree.json`); };

export const del = (id) => { return axios.post(`${prefix}/manager/role/${id}/del.json`); };

export const detail = (id) => { return axios.get(`${prefix}/manager/role/${id}/detail.json`); };

export const privileges = (id) => { return axios.get(`${prefix}/manager/role/${id}/privileges.json`); };

export const savePrivileges = (id, menuIds) => { return axios.get(`${prefix}/manager/role/privileges/save.json?roleId=` + id + '&menuIds=' + menuIds); };
