import constants from '@/common/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AlertInitialState } from './types'

const initialState: AlertInitialState = {
    open: false,
    message: ''
}

const alertSlice = createSlice({
    name: constants.STORE.ALERT,
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<string>) => {
            state.open = true
            state.message = action.payload
        },
        closeSnackbar: (state) => {
            state.open = false
        }
    }
})

export const { showSnackbar, closeSnackbar } = alertSlice.actions

export const alertSelector = (state: { alert: AlertInitialState }) =>
    state.alert

export default alertSlice.reducer
