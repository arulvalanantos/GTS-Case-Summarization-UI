import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import Snackbar from '@mui/material/Snackbar'

import './App.css'
import constants from './common/constants'
import CaseNotes from './components/CaseNotes'
import { useAppDispatch } from './store/hooks'
import SearchForm from './components/SearchForm'
import CaseSummary from './components/CaseSummary'
import CaseNoteView from './components/CaseNoteView'
import { ICaseNote } from './store/reducers/case-notes/types'
import { alertSelector, closeSnackbar } from './store/reducers/alert'
import {
    caseNotesSelector,
    setNoOfRowsPerPage,
    updateCaseNotes
} from './store/reducers/case-notes'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const snackbar = useSelector(alertSelector)
    const { isViewMode } = useSelector(caseNotesSelector)

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar())
    }

    const generateCaseNotes = (count = 10000): ICaseNote[] => {
        const processTypes = ['Review', 'Approval', 'Investigation', 'Closure']
        const statuses = ['Open', 'Closed', 'Pending', 'In Progress']
        const creators = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']

        const notes: ICaseNote[] = []

        for (let i = 0; i < count; i++) {
            const randomDaysAgo = Math.floor(Math.random() * 365)
            notes.push({
                Claim_ID: Math.floor(Math.random() * 100000000)
                    .toString()
                    .padStart(8, '0'), // 8-digit ID
                Created_Date: dayjs()
                    .subtract(randomDaysAgo, 'day')
                    .toISOString(),
                Process_Type:
                    processTypes[
                        Math.floor(Math.random() * processTypes.length)
                    ],
                Created_By:
                    creators[Math.floor(Math.random() * creators.length)],
                Message: `Sample case note message #${i + 1}`,
                Redacted: Math.random() > 0.8 ? 'Yes' : 'No', // 20% chance of being redacted
                Status: statuses[Math.floor(Math.random() * statuses.length)]
            })
        }

        return notes
    }

    useEffect(() => {
        const caseNotes = generateCaseNotes()
        dispatch(updateCaseNotes(caseNotes))
    }, [dispatch])

    useEffect(() => {
        const savedRowsPerPage = localStorage.getItem(
            constants.LOCAL_STORAGE.ROWS_PER_PAGE
        )
        if (savedRowsPerPage) {
            dispatch(setNoOfRowsPerPage(Number(savedRowsPerPage)))
        }
    }, [dispatch])

    return (
        <main className="!m-auto w-full h-screen max-w-[1200px] border-r-1 border-gray-200 border-l-1">
            <div className="flex flex-row w-full h-full">
                <SearchForm />
                <div className="flex flex-col w-full h-full">
                    <CaseSummary />
                    {isViewMode ? <CaseNoteView /> : <CaseNotes />}
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={snackbar.message}
                action={
                    <button
                        type="button"
                        className="text-white cursor-pointer"
                        onClick={handleCloseSnackbar}
                    >
                        <IoIosClose size={25} />
                    </button>
                }
            />
        </main>
    )
}

export default App
