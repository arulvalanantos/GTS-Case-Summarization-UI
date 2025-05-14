import constants from '@/common/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchSummary } from './thunk'
import { RootState } from '@/store/types'
import { summaryInitialState } from './types'

const initialState: summaryInitialState = {
    isFetchingSummary: false,
    isSummaryExpanded: true,
    summary: ''
}

const summarySlice = createSlice({
    name: constants.STORE.SUMMARY,
    initialState,
    reducers: {
        toggleSummary: (state) => {
            state.isSummaryExpanded = !state.isSummaryExpanded
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSummary.pending, (state) => {
                state.isFetchingSummary = true
                state.summary = ''
            })
            .addCase(
                fetchSummary.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.summary = action.payload
                    state.isFetchingSummary = false
                }
            )
            .addCase(fetchSummary.rejected, (state) => {
                state.summary = ''
                state.isFetchingSummary = false
            })
    }
})

export const { toggleSummary } = summarySlice.actions

export const summarySelector = (state: RootState) => state.summary

export default summarySlice.reducer
