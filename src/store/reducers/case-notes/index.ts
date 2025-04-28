import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import constants from '@/common/constants'
import { CaseNotesInitialState } from './types'

const initialState: CaseNotesInitialState = {
    caseNotes: [],
    noOfRowsPerPage: 10,
    isCaseNotesExpanded: true,
    sort: {
        date: 'desc',
        claimantID: 'desc'
    }
}

const caseNotesSlice = createSlice({
    name: constants.STORE.CASE_NOTES,
    initialState,
    reducers: {
        setNoOfRowsPerPage: (state, action) => {
            state.noOfRowsPerPage = action.payload
        },
        toggleCaseNotes: (state) => {
            state.isCaseNotesExpanded = !state.isCaseNotesExpanded
        },
        toggleSortDateOrder: (state) => {
            state.sort.date = state.sort.date === 'asc' ? 'desc' : 'asc'
        },
        toggleSortClaimantIDOrder: (state) => {
            state.sort.claimantID =
                state.sort.claimantID === 'asc' ? 'desc' : 'asc'
        }
    },
    extraReducers: () => {}
})

export const {
    setNoOfRowsPerPage,
    toggleCaseNotes,
    toggleSortClaimantIDOrder,
    toggleSortDateOrder
} = caseNotesSlice.actions

export const caseNotesSelector = (state: RootState) => state.caseNotes

export default caseNotesSlice.reducer
