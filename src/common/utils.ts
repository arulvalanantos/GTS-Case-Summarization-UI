/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { GetThunkAPI } from '@reduxjs/toolkit'

import constants from './constants'
import { showSnackbar } from '@/store/reducers/alert'

const { ERROR_TEXT, MESSAGE } = constants

class Utils {
    static copyToClipboard(text: string): void {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log('Text copied to clipboard')
            })
            .catch((error) => {
                console.error('Failed to copy text:', error)
            })
    }

    static transformErrorMessage = (originalMessage: string) => {
        const errorMessage = originalMessage?.toLowerCase()
        if (errorMessage === ERROR_TEXT.CANCELED) {
            return MESSAGE.REQUEST_WAS_CANCELLED
        } else {
            return originalMessage
        }
    }

    static getErrorMessage = (
        error: unknown,
        defaultMessage = MESSAGE.SOMETHING_WENT_WRONG
    ): string => {
        let message = ''

        if (error instanceof AxiosError) {
            if (
                error.response &&
                error.response.data &&
                (error.response.data?.detail || error.response.data?.error)
            ) {
                message =
                    error.response.data?.detail || error.response.data.error
            } else {
                message = error.message
            }
        } else if (error instanceof Error) {
            message = error.message
        } else if (typeof error === 'string') {
            message = error
        }

        return message ? Utils.transformErrorMessage(message) : defaultMessage
    }

    static handleAPIError = (
        error: unknown,
        defaultMessage: string,
        thunkAPI: GetThunkAPI<any>
    ): string => {
        const message = Utils.getErrorMessage(error, defaultMessage)
        thunkAPI.dispatch(showSnackbar(message))
        return message
    }

    static handleThunkRejection = (
        error: unknown,
        thunkAPI: GetThunkAPI<any>,
        defaultMessage: string = MESSAGE.SOMETHING_WENT_WRONG
    ): ReturnType<GetThunkAPI<any>['rejectWithValue']> => {
        const message = Utils.handleAPIError(error, defaultMessage, thunkAPI)
        return thunkAPI.rejectWithValue(message)
    }
}

export default Utils
