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
        claimantID: string
        startDate: string | null
        endDate: string | null
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
    claimantID: string
    startDate: string | null
    endDate: string | null
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