import axios from 'axios'

import constants from '@common/constants'

const createConfig = () => ({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: constants.API_CONFIG.DEFAULT_AXIOS_TIMEOUT,
    timeoutErrorMessage: constants.API_CONFIG.AXIOS_TIMEOUT_MESSAGE
})

/**
 * Axios instance for making API requests.
 *
 * @type {import('axios').AxiosInstance}
 */
const APIInstance = axios.create(createConfig())

export default APIInstance
