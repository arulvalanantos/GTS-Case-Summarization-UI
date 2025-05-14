export type configInitialState = {
    isFormExpanded: boolean
    isFetchingAdminConfig: boolean
    configuration: AdminConfiguration
}

export type AdminConfiguration = {
    claimant_id_max_length: number
    claimant_id_min_length: number
    default_date_range_in_months: number
    is_case_summary_enabled: boolean
    max_date_range_diff_in_months: number
    max_goback_year_as_start_date: number
    rest_api_timeout_in_seconds: number
    status_code: number
}
