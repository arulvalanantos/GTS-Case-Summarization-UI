import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchCaseNotes } from './thunk'
import { RootState } from '@/store/types'
import constants from '@/common/constants'
import { CaseNotesInitialState, ICaseNote } from './types'

const initialState: CaseNotesInitialState = {
    isFetchingCaseNotes: false,
    caseNotes: [],
    noOfRowsPerPage: 10,
    currentPage: 0,
    totalPages: 0,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchCaseNotes.pending, (state) => {
                state.isFetchingCaseNotes = true
                state.caseNotes = []
            })
            .addCase(
                fetchCaseNotes.fulfilled,
                (state, action: PayloadAction<ICaseNote[]>) => {
                    state.caseNotes = action.payload
                    state.isFetchingCaseNotes = false
                }
            )
            .addCase(fetchCaseNotes.rejected, (state) => {
                state.caseNotes = []
                state.isFetchingCaseNotes = false
            })
    }
})

export const {
    setNoOfRowsPerPage,
    toggleCaseNotes,
    toggleSortClaimantIDOrder,
    toggleSortDateOrder
} = caseNotesSlice.actions

export const caseNotesSelector = (state: RootState) => state.caseNotes

export default caseNotesSlice.reducer
