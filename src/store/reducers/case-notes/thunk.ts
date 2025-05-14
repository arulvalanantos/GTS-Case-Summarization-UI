import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import { RootState } from '@/store/types'
import constants from '@/common/constants'
import CaseNotesService from '@api/services/case-notes'

export const fetchCaseNotes = createAsyncThunk(
    'case_notes/fetchCaseNotes',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState

            const { form } = state.caseNotes
            const { rest_api_timeout_in_seconds } = state.config.configuration

            const response = await CaseNotesService.fetchCaseNotes(
                form,
                rest_api_timeout_in_seconds
            )

            const caseNotes = response?.LookUpNotes?.Notes ?? []

            return caseNotes
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_CASE_NOTES
            )
        }
    }
)
