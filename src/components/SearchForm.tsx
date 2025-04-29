import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import React, { useEffect, useMemo, useRef } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CircularProgress from '@mui/material/CircularProgress'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import SectionTitle from './SectionTitle'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { showSnackbar } from '@/store/reducers/alert'
import { fetchCaseNotes } from '@/store/reducers/case-notes/thunk'
import { configSelector, setFormExpanded } from '@/store/reducers/config'
import {
    caseNotesSelector,
    updateCaseNoteEndDate,
    updateCaseNoteStartDate,
    updateClaimantID
} from '@/store/reducers/case-notes'

const SearchForm: React.FC = () => {
    const claimantIDRef = useRef<HTMLInputElement | null>(null)

    const dispatch = useAppDispatch()

    const { isFormExpanded } = useSelector(configSelector)
    const { form, isFetchingCaseNotes } = useSelector(caseNotesSelector)

    const Icon = useMemo(() => {
        return isFormExpanded ? FaAngleDoubleLeft : FaAngleDoubleRight
    }, [isFormExpanded])

    const width = useMemo(() => {
        return isFormExpanded ? 'w-40' : 'w-9'
    }, [isFormExpanded])

    const toggleFormExpand = () => {
        dispatch(setFormExpanded(!isFormExpanded))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (value === '') {
            dispatch(updateClaimantID(''))
            return
        }

        // Strict: Only digits (0-9), max 8 characters
        const digitOnlyRegex = /^\d{0,8}$/
        if (!digitOnlyRegex.test(value)) return

        dispatch(updateClaimantID(value))
    }

    const onStartDateChange = (value: dayjs.Dayjs | null) => {
        dispatch(updateCaseNoteStartDate(value ? value.toISOString() : null))
    }

    const onEndDateChange = (value: dayjs.Dayjs | null) => {
        dispatch(updateCaseNoteEndDate(value ? value.toISOString() : null))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const start = dayjs(form.startDate)
        const end = dayjs(form.endDate)

        if (end.isBefore(start)) {
            const message = 'End date cannot be before start date.'
            dispatch(showSnackbar(message))
            return
        }

        const diffInYears = end.diff(start, 'year', true)
        if (diffInYears > 1) {
            const message =
                'The gap between Start date and End date must not exceed 1 year.'

            dispatch(showSnackbar(message))
            return
        }

        const diffInDays = end.diff(start, 'day')
        if (diffInDays < 0) {
            const message = 'Invalid date range selected.'
            dispatch(showSnackbar(message))
            return
        }

        dispatch(fetchCaseNotes())
    }

    useEffect(() => {
        if (!claimantIDRef.current) return

        claimantIDRef.current?.focus()

        const today = dayjs()
        const sixMonthsAgo = today.subtract(6, 'month')

        dispatch(updateCaseNoteStartDate(sixMonthsAgo.toISOString()))
        dispatch(updateCaseNoteEndDate(today.toISOString()))
    }, [dispatch])

    return (
        <div
            className={`content-box ${width} ${
                isFormExpanded ? 'max-w-40 min-w-40' : 'max-w-9 min-w-9'
            } bg-secondary p-2 overflow-hidden w-full h-full overflow-y-auto`}
        >
            <div
                className={`flex flex-row items-center ${
                    isFormExpanded ? 'justify-between' : 'justify-center'
                }`}
            >
                {isFormExpanded && (
                    <SectionTitle title={constants.TITLE.CLAIM_DETAILS} />
                )}
                <button
                    type="button"
                    className="flex items-center justify-center cursor-pointer"
                    onClick={toggleFormExpand}
                    title={
                        isFormExpanded
                            ? 'Collapse Search Form'
                            : 'Expand Search Form'
                    }
                    aria-label={
                        isFormExpanded
                            ? 'Collapse Search Form'
                            : 'Expand Search Form'
                    }
                >
                    <Icon />
                </button>
            </div>
            {isFormExpanded && (
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-2 mt-5"
                >
                    <div>
                        <label
                            htmlFor="claimantID"
                            className="text-xs select-none"
                        >
                            Claimant ID
                        </label>
                        <TextField
                            id="claimantID"
                            name="claimantID"
                            variant="outlined"
                            autoComplete="off"
                            type="text"
                            disabled={isFetchingCaseNotes}
                            inputRef={claimantIDRef}
                            size="small"
                            placeholder="Enter Claimant ID"
                            className="w-full"
                            value={form.claimantID}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label id="startDate" className="text-xs select-none">
                            Start Date
                        </label>
                        <DatePicker
                            name="startDate"
                            className="w-full bg-white"
                            disabled={isFetchingCaseNotes}
                            minDate={dayjs(constants.MIN_START_DATE)}
                            disableFuture
                            value={dayjs(form.startDate)}
                            onChange={onStartDateChange}
                            reduceAnimations
                        />
                    </div>
                    <div>
                        <label id="endDate" className="text-xs select-none">
                            End Date
                        </label>
                        <DatePicker
                            name="endDate"
                            className="w-full bg-white"
                            disabled={isFetchingCaseNotes}
                            minDate={dayjs(constants.MIN_START_DATE)}
                            disableFuture
                            value={dayjs(form.endDate)}
                            onChange={onEndDateChange}
                            reduceAnimations
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isFetchingCaseNotes || !form.claimantID}
                        className="bg-primary disabled:bg-gray disabled:cursor-not-allowed text-white py-2 px-3 rounded text-sm cursor-pointer hover:scale-98 transition-transform duration-200 ease-in-out flex items-center gap-2 justify-center"
                    >
                        {isFetchingCaseNotes && (
                            <CircularProgress
                                sx={{ color: 'inherit' }}
                                size="12px"
                            />
                        )}
                        <span>Submit</span>
                    </button>
                </form>
            )}
        </div>
    )
}

export default SearchForm
