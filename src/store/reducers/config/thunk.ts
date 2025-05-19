import { createAsyncThunk } from '@reduxjs/toolkit'

import Utils from '@/common/utils'
import constants from '@/common/constants'
import { adminConfigInitialState } from '.'
import generalService from '@/api/services/general'

export const fetchAdminConfig = createAsyncThunk(
    'config/fetchAdminConfig',
    async (_, thunkAPI) => {
        try {
            const response = await generalService.getAdminConfig()
            const configuration = response?.data ?? adminConfigInitialState

            return configuration
        } catch (error) {
            return Utils.handleThunkRejection(
                error,
                thunkAPI,
                constants.ERROR_MESSAGE.UNABLE_TO_FETCH_ADMIN_CONFIG
            )
        }
    }
)
