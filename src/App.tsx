import React, { useEffect } from 'react'

import './App.css'
import HomePage from './pages/Home'
import constants from './common/constants'
import { useAppDispatch } from './store/hooks'
import AlertToast from './components/AlertToast'
import { setNoOfRowsPerPage } from './store/reducers/case-notes'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchStorageInfo = () => {
            const savedRowsPerPage = localStorage.getItem(
                constants.LOCAL_STORAGE.ROWS_PER_PAGE
            )
            if (savedRowsPerPage) {
                dispatch(setNoOfRowsPerPage(Number(savedRowsPerPage)))
            }
        }

        fetchStorageInfo()
    }, [dispatch])

    return (
        <main className="!m-auto w-full h-screen max-w-[1200px] border-r-1 border-gray-200 border-l-1">
            <HomePage />
            <AlertToast />
        </main>
    )
}

export default App
