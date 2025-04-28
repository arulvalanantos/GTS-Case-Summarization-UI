const constants = {
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
        CASE_NOTES: 'Case Notes'
    },
    MESSAGE: {
        COPIED: 'Copied to clipboard'
    },
    ERROR_MESSAGE: {
        FAILED_TO_COPY: 'Failed to copy text: '
    },
    MIN_START_DATE: '2013-10-15',
}

export default Object.freeze(constants)
