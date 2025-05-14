import API from '../helpers'
import constants from '@/common/constants'
import {
    CaseNoteFetchRequest,
    CaseNoteFetchResponse
} from '@/store/reducers/case-notes/types'

class CaseNotesService {
    async fetchCaseNotes(payload: CaseNoteFetchRequest) {
        const endpoint = constants.ENDPOINTS.GET_NOTES

        return await API.postRequest<
            CaseNoteFetchResponse,
            CaseNoteFetchRequest
        >(endpoint, payload)
    }
}

const caseNotesService = new CaseNotesService()
export default caseNotesService as CaseNotesService
