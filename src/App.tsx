import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import './App.css'
import HomePage from './pages/Home'
import Loader from './components/Loader'
import constants from './common/constants'
import { useAppDispatch } from './store/hooks'
import AlertToast from './components/AlertToast'
import { configSelector } from './store/reducers/config'
import { setNoOfRowsPerPage } from './store/reducers/case-notes'
import { fetchAdminConfig } from './store/reducers/config/thunk'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    const { isFetchingAdminConfig } = useSelector(configSelector)

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

    useEffect(() => {
        dispatch(fetchAdminConfig())
    }, [dispatch])

    return (
        <main className="!m-auto w-full h-screen max-w-[1200px] border-r-1 border-gray-200 border-l-1">
            {isFetchingAdminConfig ? (
                <Loader
                    message={constants.LOADER_MESSAGE.FETCHING_ADMIN_CONFIG}
                />
            ) : (
                <HomePage />
            )}
            <AlertToast />
        </main>
    )
}

export default App
