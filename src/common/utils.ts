/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { GetThunkAPI } from '@reduxjs/toolkit'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import constants from './constants'
import { showSnackbar } from '@/store/reducers/alert'
import { ICaseNote } from '@/store/reducers/case-notes/types'

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

    static isValidClaimantID = (
        claimantID: string,
        minLength = 1,
        maxLength = 8
    ): boolean => {
        if (claimantID === null || claimantID === undefined) return false
        if (claimantID === '') return minLength === 0

        const digitOnlyRegex = new RegExp(`^\\d{${minLength},${maxLength}}$`)
        return digitOnlyRegex.test(claimantID)
    }

    static generateCaseNotes = (count = 10000): ICaseNote[] => {
        const processTypes = ['Review', 'Approval', 'Investigation', 'Closure']
        const statuses = ['Open', 'Closed', 'Pending', 'In Progress']
        const creators = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']

        const notes: ICaseNote[] = []

        for (let i = 0; i < count; i++) {
            const randomDaysAgo = Math.floor(Math.random() * 365)
            notes.push({
                Claim_ID: Math.floor(Math.random() * 100000000)
                    .toString()
                    .padStart(8, '0'), // 8-digit ID
                Created_Date: dayjs()
                    .subtract(randomDaysAgo, 'day')
                    .toISOString(),
                Process_Type:
                    processTypes[
                        Math.floor(Math.random() * processTypes.length)
                    ],
                Created_By:
                    creators[Math.floor(Math.random() * creators.length)],
                Message: `Sample case note message #${i + 1}`,
                Redacted: Math.random() > 0.8 ? 'Yes' : 'No', // 20% chance of being redacted
                Status: statuses[Math.floor(Math.random() * statuses.length)]
            })
        }

        return notes
    }

    static getAPIOptions = (timeout = 1) => {
        return {
            timeout: timeout * 1000
        }
    }
}

export default Utils
