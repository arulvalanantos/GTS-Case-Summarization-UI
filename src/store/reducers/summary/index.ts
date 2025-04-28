import constants from '@/common/constants'
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { summaryInitialState } from './types'

const initialState: summaryInitialState = {
    isSummaryExpanded: true,
    summary:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

const summarySlice = createSlice({
    name: constants.STORE.SUMMARY,
    initialState,
    reducers: {
        toggleSummary: (state) => {
            state.isSummaryExpanded = !state.isSummaryExpanded
        }
    },
    extraReducers: () => {}
})

export const { toggleSummary } = summarySlice.actions

export const summarySelector = (state: RootState) => state.summary

export default summarySlice.reducer
