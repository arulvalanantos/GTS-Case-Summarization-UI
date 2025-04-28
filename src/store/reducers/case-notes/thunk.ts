import { createAsyncThunk } from '@reduxjs/toolkit'

import CaseNotesService from '@api/services/case-notes'

export const fetchCaseNotes = createAsyncThunk(
    'case_notes/fetchCaseNotes',
    async (_, thunkAPI) => {
        try {
            const response = await CaseNotesService.fetchCaseNotes()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    }
)
