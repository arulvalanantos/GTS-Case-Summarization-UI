import { useSelector } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import Snackbar from '@mui/material/Snackbar'

import './App.css'
import { RootState } from './store/types'
import CaseNotes from './components/CaseNotes'
import { useAppDispatch } from './store/hooks'
import SearchForm from './components/SearchForm'
import CaseSummary from './components/CaseSummary'
import { closeSnackbar } from './store/reducers/alert'

function App() {
    const dispatch = useAppDispatch()
    const snackbar = useSelector((state: RootState) => state.alert)

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar())
    }

    return (
        <main className="!m-auto w-full h-screen max-w-[1200px] border-r-1 border-gray-200 border-l-1">
            <div className="flex flex-row w-full h-full">
                <SearchForm />
                <div className="flex flex-col w-full h-full">
                    <CaseSummary />
                    <CaseNotes />
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
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
