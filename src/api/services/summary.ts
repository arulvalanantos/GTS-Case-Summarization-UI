import API from '../helpers'

class SummaryService {
    async getSummary() {
        const endpoint = '/summary'
        return await API.getRequest<string>(endpoint)
    }
}

const summaryService = new SummaryService()
export default summaryService as SummaryService
