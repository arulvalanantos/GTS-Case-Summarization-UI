import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import constants from '@/common/constants'
import { fetchCaseNotes, fetchClaimantID } from './thunk'
import { CaseNotesInitialState, ICaseNote } from './types'

const initialState: CaseNotesInitialState = {
    isFetchingCaseNotes: false,
    isFetchingClaimantID: false,
    caseNotes: [],
    searchText: '',
    noOfRowsPerPage: 10,
    currentPage: 1,
    totalPages: 0,
    isCaseNotesExpanded: true,
    isViewMode: false,
    viewCaseNoteID: '',
    sort: {
        date: 'desc',
        claimantID: 'desc'
    },
    form: {
        claimantID: '',
        startDate: null,
        endDate: null
    }
}

const caseNotesSlice = createSlice({
    name: constants.STORE.CASE_NOTES,
    initialState,
    reducers: {
        setNoOfRowsPerPage: (state, action) => {
            state.noOfRowsPerPage = action.payload
            state.currentPage = 1
            state.totalPages = Math.ceil(
                state.caseNotes.length / action.payload
            )
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
        },
        updateClaimantID: (state, action: PayloadAction<string>) => {
            state.form.claimantID = action.payload
        },
        updateCaseNoteStartDate: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.form.startDate = action.payload
        },
        updateCaseNoteEndDate: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.form.endDate = action.payload
        },
        previousPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1
            }
        },
        nextPage: (state) => {
            if (state.currentPage < state.totalPages) {
                state.currentPage += 1
            }
        },
        updateCaseNotes: (state, action: PayloadAction<ICaseNote[]>) => {
            state.caseNotes = action.payload
            state.currentPage = 1
            state.totalPages = Math.ceil(
                action.payload.length / state.noOfRowsPerPage
            )
        },
        setViewMode: (state, action: PayloadAction<string>) => {
            state.isViewMode = true
            state.viewCaseNoteID = action.payload
        },
        clearViewMode: (state) => {
            state.isViewMode = false
            state.viewCaseNoteID = ''
        },
        updateSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload
            state.currentPage = 1
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
            .addCase(fetchClaimantID.pending, (state) => {
                state.isFetchingClaimantID = true
            })
            .addCase(fetchClaimantID.fulfilled, (state) => {
                state.isFetchingClaimantID = false
            })
            .addCase(fetchClaimantID.rejected, (state) => {
                state.isFetchingClaimantID = false
            })
    }
})

export const {
    setNoOfRowsPerPage,
    toggleCaseNotes,
    toggleSortClaimantIDOrder,
    toggleSortDateOrder,
    updateClaimantID,
    updateCaseNoteStartDate,
    updateCaseNoteEndDate,
    updateCaseNotes,
    previousPage,
    nextPage,
    setViewMode,
    clearViewMode,
    updateSearchText
} = caseNotesSlice.actions

export const caseNotesSelector = (state: RootState) => state.caseNotes

export default caseNotesSlice.reducer
