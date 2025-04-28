import { configureStore } from '@reduxjs/toolkit'

import configReducer from '@store/reducers/config'

const store = configureStore({
    reducer: {
        config: configReducer
    }
})

export default store
