import API from '../helpers'
import constants from '@/common/constants'

class SummaryService {
    async getSummary() {
        const endpoint = constants.ENDPOINTS.SUMMARISE_NOTES
        return await API.getRequest<string>(endpoint)
    }
}

const summaryService = new SummaryService()
export default summaryService as SummaryService
