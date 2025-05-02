import {
    CaseNoteFetchRequest,
    CaseNoteFetchResponse
} from '@/store/reducers/case-notes/types'
import API from '../helpers'

class CaseNotesService {
    async fetchCaseNotes(payload: CaseNoteFetchRequest) {
        const endpoint = '/case-notes'
        return await API.postRequest<
            CaseNoteFetchResponse,
            CaseNoteFetchRequest
        >(endpoint, payload)
    }
}

const caseNotesService = new CaseNotesService()
export default caseNotesService as CaseNotesService
