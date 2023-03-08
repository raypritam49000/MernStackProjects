import { authHeader } from '../_helpers/auth.header';
import basePath from '../_helpers/basePath';

export const commonService = {
    login,
    register,

    save,
    update,
    getAll,
    getById,
    getProductPicturebyId,
    delete: _delete,

    getDataFN,
    updateProfile
};


async function login(username, password) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Login/', requestOption);
    const res = await handleResponse(response);
    return res;
}

async function register(model) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };

    const response = await fetch(basePath.BASE_API_PATH + 'UserMaster/Save/', requestOption);
    const res = await handleResponse(response);
    return res;
}


async function save(controlerName, isFile, model) {
    const requestOption = {
        method: 'POST',
        body: isFile ? model : JSON.stringify(model),
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/Save/`, requestOption);
    const res = await handleResponse(response);
    return res;
}


async function update(controlerName, isFile, model) {
    const requestOption = {
        method: 'POST',
        body: isFile ? model : JSON.stringify(model),
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/Update/`, requestOption);
    const res = await handleResponse(response);
    return res;
}

async function getAll(controlerName, isFile,) {
    const requestOption = {
        method: 'GET',
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/GetAll`, requestOption);
    const res = await handleResponse(response);
    return res;
}

async function getById(controlerName, isFile, id) {
    const requestOption = {
        method: 'GET',
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/GetbyId/${id}`, requestOption);
    const res = await handleResponse(response);
    return res;
}

async function getProductPicturebyId(controlerName, isFile, id) {
    const requestOption = {
        method: 'GET',
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/GetProductPicturebyId/${id}`, requestOption);
    const res = await handleResponse(response);
    return res;
}

async function _delete(controlerName, isFile, model) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify(model),
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/Delete/`, requestOption);
    const res = await handleResponse(response);
    return res;
}

async function getDataFN(controlerName, fnName, isFile,) {
    const requestOption = {
        method: 'GET',
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/${fnName}`, requestOption);
    const res = await handleResponse(response);
    return res;
}


async function updateProfile(controlerName, isFile, model) {
    const requestOption = {
        method: 'POST',
        body: isFile ? model : JSON.stringify(model),
        headers: authHeader(isFile)
    };

    const response = await fetch(basePath.BASE_API_PATH + `${controlerName}/UpdateProfile/`, requestOption);
    const res = await handleResponse(response);
    return res;
}


function handleResponse(response) {
    return response.text().then(txt => {
        const data = JSON.parse(txt);
        if (!response.ok) {
            if (response.status === 401) {
                console.log(response);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

