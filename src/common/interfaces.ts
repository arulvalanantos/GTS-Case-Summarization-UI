import { RESPONSE_STATUS } from './enums'

export type AxiosResponseData<T> = {
    /**
     * The data payload in the response.
     */
    data: T

    /**
     * The status of the response, which can be one of:
     * - RESPONSE_STATUS.SUCCESS
     * - RESPONSE_STATUS.FAIL
     * - RESPONSE_STATUS.ERROR
     */
    status: RESPONSE_STATUS

    /**
     * A numeric code associated with the response.
     */
    code: number

    /**
     * An error message or A success message
     */
    message?: string
}

export type APIResponse<T> = Promise<AxiosResponseData<T>>
