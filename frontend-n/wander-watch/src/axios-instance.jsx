import axios from "axios";

const axiosInstance = axios.create();

// Add a response interceptor
// axiosInstance.interceptors.response.use(undefined, function (err) {
//     const { config, message } = err;

//     if (!config || !config.retry) {
//         return Promise.reject(err)
//     }

//     if (message.includes('timeout') || message.includes('Network Error')) {
//         return Promise.reject(err)
//     }

    
//     config.retry -= 1
//     config.increaseRetries()
//     config.retryCallback()
//     const delayRetryRequest = new Promise(resolve => {
//         setTimeout(resolve, config.retryDelay || 1000)
//     })

//     return delayRetryRequest.then(() => {
//         axiosInstance(config)
//     })
// });

export default axiosInstance