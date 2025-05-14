import API from '../helpers'
import constants from '@/common/constants'
import Utils from '@/common/utils'
import { SummaryRequest, SummaryResponse } from '@/store/reducers/summary/types'

class SummaryService {
    async getSummary(payload: SummaryRequest, timeout: number) {
        const endpoint = constants.ENDPOINTS.SUMMARISE_NOTES
        const options = Utils.getAPIOptions(timeout)

        return await API.postRequest<SummaryResponse, SummaryRequest>(
            endpoint,
            payload,
            options
        )
    }
}

const summaryService = new SummaryService()
export default summaryService as SummaryService
