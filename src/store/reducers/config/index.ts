import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/types'
import constants from '@common/constants'
import { configInitialState } from './types'

const initialState: configInitialState = {
    isFormExpanded: true
}

const configSlice = createSlice({
    name: constants.STORE.CONFIG,
    initialState,
    reducers: {
        setFormExpanded(state, action: PayloadAction<boolean>) {
            state.isFormExpanded = action.payload
        }
    }
})

export const { setFormExpanded } = configSlice.actions

export const configSelector = (state: RootState) => state.config

export default configSlice.reducer
