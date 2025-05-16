import dayjs from 'dayjs'
import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import { RootState } from '@/store/types'
import constants from '@/common/constants'
import SummaryService from '@api/services/summary'

export const fetchSummary = createAsyncThunk(
    'summary/fetchSummary',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState

            const { currentFormInfo } = state.caseNotes
            const { rest_api_timeout_in_seconds } = state.config.configuration

            const payload = {
                claimant_id: currentFormInfo.claimant_id,
                start_date: dayjs(currentFormInfo.start_date).format(
                    constants.DEFAULT_DATE_FORMAT
                ),
                end_date: dayjs(currentFormInfo.end_date).format(
                    constants.DEFAULT_DATE_FORMAT
                )
            }

            const response = await SummaryService.getSummary(
                payload,
                rest_api_timeout_in_seconds
            )
            return (
                response ?? {
                    message: '',
                    notes: ''
                }
            )
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_SUMMARY
            )
        }
    }
)
