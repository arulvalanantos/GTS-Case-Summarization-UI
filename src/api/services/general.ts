import { GetClaimantIDResponse } from '@/store/reducers/case-notes/types'
import API from '../helpers'

class GeneralService {
    async getClaimantID() {
        const endpoint = '/claimant-id'
        return await API.getRequest<GetClaimantIDResponse>(endpoint)
    }

    async getAdminConfig() {
        const endpoint = '/admin-config'
        return await API.getRequest<string>(endpoint)
    }
}

const generalService = new GeneralService()
export default generalService as GeneralService
