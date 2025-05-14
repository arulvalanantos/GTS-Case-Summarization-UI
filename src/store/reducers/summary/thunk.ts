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

            const { form } = state.caseNotes
            const { rest_api_timeout_in_seconds } = state.config.configuration

            const response = await SummaryService.getSummary(
                form,
                rest_api_timeout_in_seconds
            )
            return response.summary ?? ''
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_SUMMARY
            )
        }
    }
)
