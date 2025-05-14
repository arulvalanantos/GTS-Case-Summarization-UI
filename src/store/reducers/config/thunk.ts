import Utils from '@/common/utils'
import constants from '@/common/constants'
import generalService from '@/api/services/general'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAdminConfig = createAsyncThunk(
    'config/fetchAdminConfig',
    async (_, thunkAPI) => {
        try {
            const configuration = await generalService.getAdminConfig()

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
