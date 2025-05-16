export type summaryInitialState = {
    isFetchingSummary: boolean
    isSummaryExpanded: boolean
    summary: string
    notes: string
}

export type SummaryRequest = {
    claimant_id: string
    start_date: string | null
    end_date: string | null
}

export type SummaryResponse = {
    message: string
    notes: string
}
