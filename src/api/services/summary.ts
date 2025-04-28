import API from '../helpers'

class SummaryService {
    async getSummary() {
        const endpoint = '/summary'
        return await API.getRequest<string>(endpoint)
    }
}

const summaryInstance = new SummaryService()
export default summaryInstance as SummaryService
