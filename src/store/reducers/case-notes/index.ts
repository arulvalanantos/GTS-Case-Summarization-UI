import { RootState } from '@/store/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    caseNotes: []
}

const caseNotesSlice = createSlice({
    name: 'caseNotes',
    initialState,
    reducers: {},
    extraReducers: () => {}
})

export const caseNotesSelector = (state: RootState) => state.caseNotes

export default caseNotesSlice.reducer
