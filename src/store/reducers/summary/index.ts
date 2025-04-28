import constants from '@/common/constants'
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/store/types'
import { summaryInitialState } from './types'

const initialState: summaryInitialState = {
    summary: ''
}

const summarySlice = createSlice({
    name: constants.STORE.SUMMARY,
    initialState,
    reducers: {},
    extraReducers: () => {}
})

export const summarySelector = (state: RootState) => state.summary

export default summarySlice.reducer
