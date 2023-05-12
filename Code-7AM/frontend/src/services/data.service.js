import basePath from '../helpers/global';

export const dataService = {
    login,
    register,

    getAllCategory,
    getAllBrands,
    getAllProductList,
    doPayment
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

async function getAllCategory() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(basePath.BASE_API_PATH + 'Category/GetAll/', requestOption);
    const res = await handleResponse(response);
    return res;
}

async function getAllBrands() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(basePath.BASE_API_PATH + 'BrandLogo/GetAll/', requestOption);
    const res = await handleResponse(response);
    return res;
}
async function getAllProductList() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(basePath.BASE_API_PATH + 'ProductMaster/GetProductList/', requestOption);
    const res = await handleResponse(response);
    return res;
}

async function doPayment(model) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };

    const response = await fetch(basePath.BASE_API_PATH + 'PaymentMaster/Save/', requestOption);
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

