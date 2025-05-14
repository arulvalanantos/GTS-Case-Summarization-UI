import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/types'
import constants from '@common/constants'
import { fetchAdminConfig } from './thunk'
import { AdminConfiguration, configInitialState } from './types'

const adminConfigInitialState = {
    claimant_id_min_length: 1,
    claimant_id_max_length: 8,
    default_date_range_in_months: 6,
    is_case_summary_enabled: true,
    max_date_range_diff_in_months: 12,
    max_goback_year_as_start_date: 2013,
    rest_api_timeout_in_seconds: 10,
    status_code: 0
}

const initialState: configInitialState = {
    isFormExpanded: true,
    isFetchingAdminConfig: false,
    configuration: adminConfigInitialState
}

const configSlice = createSlice({
    name: constants.STORE.CONFIG,
    initialState,
    reducers: {
        setFormExpanded(state, action: PayloadAction<boolean>) {
            state.isFormExpanded = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminConfig.pending, (state) => {
                state.isFetchingAdminConfig = true
                state.configuration = adminConfigInitialState
            })
            .addCase(
                fetchAdminConfig.fulfilled,
                (state, action: PayloadAction<AdminConfiguration>) => {
                    state.isFetchingAdminConfig = false
                    state.configuration = action.payload
                }
            )
            .addCase(fetchAdminConfig.rejected, (state) => {
                state.configuration = adminConfigInitialState
                state.isFetchingAdminConfig = false
            })
    }
})

export const { setFormExpanded } = configSlice.actions

export const configSelector = (state: RootState) => state.config

export default configSlice.reducer
