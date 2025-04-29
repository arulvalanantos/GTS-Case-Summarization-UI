import { ICaseNote } from '@/store/reducers/case-notes/types'
import API from '../helpers'

class CaseNotesService {
    async fetchCaseNotes() {
        const endpoint = '/case-notes'
        return await API.getRequest<ICaseNote[]>(endpoint)
    }
}

const caseNotesService = new CaseNotesService()
export default caseNotesService as CaseNotesService
