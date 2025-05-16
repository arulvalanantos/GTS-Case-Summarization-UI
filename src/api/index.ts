import axios from 'axios'

import constants from '@common/constants'

const APIInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: constants.API_CONFIG.DEFAULT_AXIOS_TIMEOUT,
    timeoutErrorMessage: constants.API_CONFIG.AXIOS_TIMEOUT_MESSAGE
})

export default APIInstance
