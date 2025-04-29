const constants = {
    LOCAL_STORAGE: {
        ROWS_PER_PAGE: 'rows_per_page',
        CASE_NOTE_FONT_SIZE: 'case_note_font_size',
        CASE_SUMMARY_HEIGHT: 'case_summary_height',
    },
    API_CONFIG: {
        AXIOS_TIMEOUT: 180000, // 3 minutes
        X_REQUEST_HEADER: 'X-Request-ID',
        AXIOS_TIMEOUT_MESSAGE: 'Timeout exceeded',
        AUTHORIZATION: 'Authorization'
    },
    ENDPOINTS: {},
    STORE: {
        CONFIG: 'config',
        SUMMARY: 'summary',
        CASE_NOTES: 'case_notes',
        ALERT: 'alert'
    },
    TITLE: {
        CLAIM_DETAILS: 'Claim Details',
        CASE_SUMMARY: 'Case Summary',
        CASE_NOTES: 'Case Notes',
        CASE_NOTE_DETAILS: 'Case Note Details'
    },
    ERROR_TEXT: {
        NETWORK_RELATED: 'network-related',
        CANCELED: 'canceled'
    },
    MESSAGE: {
        COPIED: 'Copied to clipboard',
        SOMETHING_WENT_WRONG: 'Something went wrong',
        REQUEST_WAS_CANCELLED: 'Request was cancelled'
    },
    ERROR_MESSAGE: {
        FAILED_TO_COPY: 'Failed to copy text: ',
        UNABLE_TO_FETCH_CASE_NOTES: 'Unable to fetch case notes',
        UNABLE_TO_FETCH_SUMMARY: 'Unable to fetch summary'
    },
    MIN_START_DATE: '2013-10-15'
}

export default Object.freeze(constants)
