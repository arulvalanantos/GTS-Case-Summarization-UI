import { createAsyncThunk } from '@reduxjs/toolkit'

import SummaryService from '@api/services/summary'

export const fetchSummary = createAsyncThunk(
    'summary/fetchSummary',
    async (_, thunkAPI) => {
        try {
            const response = await SummaryService.getSummary()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    }
)
