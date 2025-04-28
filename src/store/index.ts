import { configureStore } from '@reduxjs/toolkit'

import configReducer from '@store/reducers/config'
import summaryReducer from '@store/reducers/summary'
import caseNotesReducer from '@store/reducers/case-notes'

const store = configureStore({
    reducer: {
        config: configReducer,
        summary: summaryReducer,
        caseNotes: caseNotesReducer
    }
})

export default store
