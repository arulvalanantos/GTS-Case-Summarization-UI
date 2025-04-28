export type CaseNotesInitialState = {
    caseNotes: ICaseNote[]
    noOfRowsPerPage: number
    isCaseNotesExpanded: boolean
    sort: {
        date: 'asc' | 'desc'
        claimantID: 'asc' | 'desc'
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
