import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import constants from '@/common/constants'
import GeneralService from '@/api/services/general'
import CaseNotesService from '@api/services/case-notes'

export const fetchCaseNotes = createAsyncThunk(
    'case_notes/fetchCaseNotes',
    async (_, thunkAPI) => {
        try {
            const response = await CaseNotesService.fetchCaseNotes()
            return response.data
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_CASE_NOTES
            )
        }
    }
)

export const fetchClaimantID = createAsyncThunk(
    'case_notes/fetchClaimantID',
    async (_, thunkAPI) => {
        try {
            const response = await GeneralService.getClaimantID()
            return response.data
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_CLAIMANT_ID
            )
        }
    }
)
