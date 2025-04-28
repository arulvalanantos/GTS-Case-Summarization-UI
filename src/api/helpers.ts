import { AxiosRequestConfig } from 'axios'

import APIInstance from '.'
import { APIResponse, AxiosResponseData } from '@common/interfaces'

/**
 * Wraps an API response callback in a Promise.
 *
 * @template T - The type of data expected in the API response.
 * @param {APIResponse<T>} callback - The API response callback.
 * @returns {Promise<APIResponse<T>>} A Promise that resolves to the API response or rejects with an error.
 */
const APIRequest = <T>(callback: APIResponse<T>): APIResponse<T> => {
    return new Promise((resolve, reject) => {
        return callback
            .then((response: AxiosResponseData<T>) => resolve(response))
            .catch((error: unknown) => reject(error))
    })
}

/**
 * A utility class for making API requests using Axios.
 *
 * @class
 */
class API {
    /**
     * Sends a GET request to the specified URL.
     *
     * @static
     * @template T - The type of data expected in the response.
     * @param {string} url - The URL to send the GET request to.
     * @param {AxiosRequestConfig} [options] - Additional options for the GET request.
     * @returns {APIResponse<T>} A promise representing the GET request response.
     */
    static getRequest<T>(
        url: string,
        options?: AxiosRequestConfig
    ): APIResponse<T> {
        return APIRequest(APIInstance.get(url, options))
    }

    /**
     * Sends a POST request to the specified URL with data.
     *
     * @static
     * @template T - The type of data expected in the response.
     * @template D - The type of data to send in the POST request.
     * @param {string} url - The URL to send the POST request to.
     * @param {D} data - The data to send in the POST request body.
     * @param {AxiosRequestConfig} [options] - Additional options for the POST request.
     * @returns {APIResponse<T>} A promise representing the POST request response.
     */
    static postRequest<T, D>(
        url: string,
        data: D,
        options?: AxiosRequestConfig
    ): APIResponse<T> {
        return APIRequest(APIInstance.post(url, data, options))
    }

    /**
     * Sends a PUT request to the specified URL with data.
     *
     * @static
     * @template T - The type of data expected in the response.
     * @template D - The type of data to send in the PUT request.
     * @param {string} url - The URL to send the PUT request to.
     * @param {D} data - The data to send in the PUT request body.
     * @param {AxiosRequestConfig} [options] - Additional options for the PUT request.
     * @returns {APIResponse<T>} A promise representing the PUT request response.
     */
    static putRequest<T, D>(
        url: string,
        data: D,
        options?: AxiosRequestConfig
    ): APIResponse<T> {
        return APIRequest(APIInstance.put(url, data, options))
    }

    /**
     * Sends a DELETE request to the specified URL.
     *
     * @static
     * @template T - The type of data expected in the response.
     * @param {string} url - The URL to send the DELETE request to.
     * @param {AxiosRequestConfig} [options] - Additional options for the DELETE request.
     * @returns {APIResponse<T>} A promise representing the DELETE request response.
     */
    static deleteRequest<T>(
        url: string,
        options?: AxiosRequestConfig
    ): APIResponse<T> {
        return APIRequest(APIInstance.delete(url, options))
    }
}

export default API
