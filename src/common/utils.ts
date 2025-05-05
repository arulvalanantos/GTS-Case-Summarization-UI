/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { GetThunkAPI } from '@reduxjs/toolkit'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import constants from './constants'
import { showSnackbar } from '@/store/reducers/alert'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const { ERROR_TEXT, MESSAGE, DEFAULT_DATE_FORMAT } = constants

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

    static populateStartEndDate = (
        start: string | null,
        end: string | null
    ) => {
        const today = dayjs().startOf('day')
        const sixMonthsAgo = today.subtract(6, 'months')
        const minDate = dayjs(constants.MIN_START_DATE).startOf('day')

        let finalizedStartDate = sixMonthsAgo
        let finalizedEndDate = today

        if (start) {
            const startDate = dayjs(start, DEFAULT_DATE_FORMAT, true).startOf(
                'day'
            )
            if (
                startDate.isValid() &&
                (startDate.isSame(minDate) ||
                    startDate.isSame(today) ||
                    (startDate.isAfter(minDate) && startDate.isBefore(today)))
            ) {
                finalizedStartDate = startDate
            }
        }

        if (end) {
            const endDate = dayjs(end, DEFAULT_DATE_FORMAT, true).startOf('day')
            if (
                endDate.isValid() &&
                (endDate.isSame(minDate) ||
                    endDate.isSame(today) ||
                    (endDate.isAfter(minDate) && endDate.isBefore(today)))
            ) {
                finalizedEndDate = endDate
            }
        }

        return {
            startDate: finalizedStartDate.toISOString(),
            endDate: finalizedEndDate.toISOString()
        }
    }

    static isValidClaimantID = (claimantID: string): boolean => {
        if (claimantID === null || claimantID === undefined) return false
        if (claimantID === '') return true

        const digitOnlyRegex = /^\d{0,8}$/
        return digitOnlyRegex.test(claimantID)
    }
}

export default Utils
