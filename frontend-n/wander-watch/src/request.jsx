import axios from "./axios-instance"
import AppError from "./utils/AppError"

const baseUrl = import.meta.env.VITE_BACKEND_URL || `http://localhost:3000`

const axiosOptions = {
    withCredentials: true
}

const throwError = (error) => {
    throw new AppError(error)
}

const checkError = (err) => {
    if (err.code !== "ERR_NETWORK") {
        throwError(err)
    }
    else {
        throw err
    }
}

const globalOptions = {
    retry: 3, retryDelay: 2000, retryCallback() { }, increaseRetries() { }
}

export function registerUser(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/register`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}
export function LoginUser(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/login`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}
export function LogoutUser(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/logout`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}
export function verifyOTP(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/verify-otp`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}

export function resendVerifyOTP(requestParams, configurations = {}) {
    return axios.get(`${baseUrl}/auth/resend-verify-otp?email=${requestParams?.email ?? ''}`, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}

export function updatePassword(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/login`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}
export function recoverPassword(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/auth/login`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}

export function pingLogin(requestParams, configurations = {}) {
    return axios.get(`${baseUrl}/auth/`, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}

export function getProfile(requestParams, configurations = {}) {
    return axios.get(`${baseUrl}/users/profile`, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}


export function saveLocation(requestParams, configurations = {}) {
    return axios.post(`${baseUrl}/locations/`, requestParams, {
        ...axiosOptions,
        ...globalOptions,
        ...configurations
    })
        .then(res => {
            return res.data
        })
        .catch(checkError)
}