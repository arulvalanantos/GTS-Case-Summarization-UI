import API from '../helpers'
import constants from '@/common/constants'
import { AdminConfiguration } from '@/store/reducers/config/types'

class GeneralService {
    async getAdminConfig() {
        const endpoint = constants.ENDPOINTS.GET_APP_CONFIG
        const query = `?app_configs_key=case_notes`
        return await API.getRequest<AdminConfiguration>(endpoint + query)
    }
}

const generalService = new GeneralService()
export default generalService as GeneralService
