import constants from '@/common/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AlertState {
    open: boolean
    message: string
    severity: 'success' | 'error'
}

const initialState: AlertState = {
    open: false,
    message: '',
    severity: 'success'
}

const alertSlice = createSlice({
    name: constants.STORE.ALERT,
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<AlertState>) => {
            state.open = true
            state.message = action.payload.message
            state.severity = action.payload.severity
        },
        closeSnackbar: (state) => {
            state.open = false
        }
    }
})

export const { showSnackbar, closeSnackbar } = alertSlice.actions

export default alertSlice.reducer
