import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import constants from '@/common/constants'
import { CaseNotesInitialState } from './types'

const initialState: CaseNotesInitialState = {
    caseNotes: [],
    noOfRowsPerPage: 10
}

const caseNotesSlice = createSlice({
    name: constants.STORE.CASE_NOTES,
    initialState,
    reducers: {
        setNoOfRowsPerPage: (state, action) => {
            state.noOfRowsPerPage = action.payload
        }
    },
    extraReducers: () => {}
})

export const { setNoOfRowsPerPage } = caseNotesSlice.actions

export const caseNotesSelector = (state: RootState) => state.caseNotes

export default caseNotesSlice.reducer
