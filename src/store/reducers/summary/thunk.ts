import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import constants from '@/common/constants'
import SummaryService from '@api/services/summary'

export const fetchSummary = createAsyncThunk(
    'summary/fetchSummary',
    async (_, thunkAPI) => {
        try {
            const response = await SummaryService.getSummary()
            return response.data
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_SUMMARY
            )
        }
    }
)
