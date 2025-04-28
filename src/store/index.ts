import { configureStore } from '@reduxjs/toolkit'

import alertReducer from '@store/reducers/alert'
import configReducer from '@store/reducers/config'
import summaryReducer from '@store/reducers/summary'
import caseNotesReducer from '@store/reducers/case-notes'

const store = configureStore({
    reducer: {
        config: configReducer,
        summary: summaryReducer,
        caseNotes: caseNotesReducer,
        alert: alertReducer
    }
})

export default store
