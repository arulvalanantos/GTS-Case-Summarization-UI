export type CaseNotesInitialState = {
    isFetchingCaseNotes: boolean
    isFetchingClaimantID: boolean
    caseNotes: ICaseNote[]
    searchText: string
    noOfRowsPerPage: number
    currentPage: number
    totalPages: number
    isCaseNotesExpanded: boolean
    isViewMode: boolean
    viewCaseNoteID: string
    sort: {
        date: 'asc' | 'desc'
        claimantID: 'asc' | 'desc'
    }
    form: {
        claimant_id: string
        start_date: string | null
        end_date: string | null
    }
}

export type ICaseNote = {
    Claim_ID: string
    Created_Date: string
    Process_Type: string
    Created_By: string
    Message: string
    Redacted: string
    Status: string
}

export type CaseNoteFetchRequest = {
    claimant_id: string
    start_date: string | null
    end_date: string | null
}

export type CaseNoteFetchResponse = {
    LookUpNotes: {
        status: string
        CID: string
        Notes: ICaseNote[]
    }
}

export type GetClaimantIDRequest = {
    conversationID: string
}

export type GetClaimantIDResponse = {
    LookUpClaimantID: {
        status: string
        CID: string
    }
}
