import React from 'react'
import { useSelector } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import Snackbar from '@mui/material/Snackbar'

import { useAppDispatch } from '@store/hooks'
import { alertSelector, closeSnackbar } from '@store/reducers/alert'

const AlertToast: React.FC = () => {
    const dispatch = useAppDispatch()
    const snackbar = useSelector(alertSelector)

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar())
    }

    return (
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
    )
}

export default AlertToast
