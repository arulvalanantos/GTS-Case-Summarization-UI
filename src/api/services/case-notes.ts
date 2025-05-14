import API from '../helpers'
import Utils from '@/common/utils'
import constants from '@/common/constants'
import {
    CaseNoteFetchRequest,
    CaseNoteFetchResponse
} from '@/store/reducers/case-notes/types'

class CaseNotesService {
    async fetchCaseNotes(payload: CaseNoteFetchRequest, timeout: number) {
        const endpoint = constants.ENDPOINTS.GET_NOTES
        const options = Utils.getAPIOptions(timeout)

        return await API.postRequest<
            CaseNoteFetchResponse,
            CaseNoteFetchRequest
        >(endpoint, payload, options)
    }
}

const caseNotesService = new CaseNotesService()
export default caseNotesService as CaseNotesService
