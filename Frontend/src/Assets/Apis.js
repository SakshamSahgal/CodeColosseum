import axios from 'axios';

/**
 * Generalized function for making Axios requests.
 * @param {string} url - The API endpoint.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Data to be sent as the request body (for POST, PUT, etc.).
 * @param {Function} onSuccess - Callback for successful response.
 * @param {Function} onError - Callback for handling errors.
 */
function makeApiRequest({ url, method = 'GET', data = null, onSuccess, onError }) {
    
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

    if (!token) {
        console.error('No authorization token found');
        window.location.href = "/";
        return;
    }

    axios({
        method,
        url,
        headers: {
            Authorization: token,
        },
        data,
    }).then((response) => {
        console.log(response.data);
        if (onSuccess) onSuccess(response.data);
    }).catch((error) => {
        console.error("Error while making API request", error);
        if (error.response?.status === 401) {
            localStorage.removeItem('userInfo');
            window.location.href = "/";
        } else {
            if (onError) onError(error);
        }
    });
}

export default makeApiRequest;