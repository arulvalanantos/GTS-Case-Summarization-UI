import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import { RootState } from '@/store/types'
import constants from '@/common/constants'
import GeneralService from '@/api/services/general'
import CaseNotesService from '@api/services/case-notes'

export const fetchCaseNotes = createAsyncThunk(
    'case_notes/fetchCaseNotes',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const { form } = state.caseNotes
            const response = await CaseNotesService.fetchCaseNotes(form)

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

export const fetchClaimantID = createAsyncThunk(
    'case_notes/fetchClaimantID',
    async (_, thunkAPI) => {
        try {
            const response = await GeneralService.getClaimantID()

            const claimantID = response?.LookUpClaimantID?.CID ?? ''
            return claimantID
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_CLAIMANT_ID
            )
        }
    }
)
