import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useSelector } from 'react-redux'
import timezone from 'dayjs/plugin/timezone'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import Utils from '@/common/utils'
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

dayjs.extend(utc)
dayjs.extend(timezone)

const SearchForm: React.FC = () => {
    const claimantIDRef = useRef<HTMLInputElement | null>(null)

    const dispatch = useAppDispatch()

    const { isFormExpanded, configuration } = useSelector(configSelector)
    const { form, isFetchingCaseNotes, isFetchingClaimantID } =
        useSelector(caseNotesSelector)

    const queryParams = useMemo(() => {
        const url = new URL(window.location.href)
        const params = new URLSearchParams(url.search)
        const claimantID = params.get('claimant_id')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')

        return { claimantID, startDate, endDate }
    }, [])

    const { minDate, maxDate } = useMemo(() => {
        return {
            minDate: dayjs(
                `01-01-${configuration.max_goback_year_as_start_date}`
            ).startOf('day'),
            maxDate: dayjs().startOf('day')
        }
    }, [configuration.max_goback_year_as_start_date])

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

        if (
            !Utils.isValidClaimantID(
                value,
                configuration.claimant_id_min_length,
                configuration.claimant_id_max_length
            )
        )
            return

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

        const start = dayjs(form.start_date)
        const end = dayjs(form.end_date)

        if (end.isBefore(start)) {
            const message =
                constants.VALIDATION_MESSAGE.END_DATE_BEFORE_START_DATE
            dispatch(showSnackbar(message))
            return
        }

        const diffInMonths = end.diff(start, 'month', true)
        if (diffInMonths > configuration.max_date_range_diff_in_months) {
            const message = `Start and end dates must be within ${configuration.max_date_range_diff_in_months} months of each other.`
            dispatch(showSnackbar(message))
            return
        }

        dispatch(fetchCaseNotes())
    }

    const populateStartAndEndDate = useCallback(async () => {
        const startDate = queryParams.startDate
        const endDate = queryParams.endDate

        const dateRange = Utils.populateStartEndDate(
            startDate,
            endDate,
            configuration.default_date_range_in_months,
            configuration.max_goback_year_as_start_date
        )
        await dispatch(updateCaseNoteStartDate(dateRange.startDate))
        await dispatch(updateCaseNoteEndDate(dateRange.endDate))
    }, [dispatch, queryParams.startDate, queryParams.endDate, configuration])

    const populateClaimantID = useCallback(async () => {
        const claimantID = queryParams.claimantID
        if (
            !claimantID ||
            !Utils.isValidClaimantID(
                claimantID,
                configuration.claimant_id_min_length,
                configuration.claimant_id_max_length
            )
        )
            return

        await dispatch(updateClaimantID(claimantID))
    }, [dispatch, queryParams.claimantID, configuration])

    const fetchInfo = useCallback(async () => {
        await populateClaimantID()
        await populateStartAndEndDate()

        if (!claimantIDRef.current) return

        claimantIDRef.current?.focus()
    }, [populateStartAndEndDate, populateClaimantID])

    useEffect(() => {
        fetchInfo()
    }, [fetchInfo])

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
                            disabled={
                                isFetchingCaseNotes || isFetchingClaimantID
                            }
                            inputRef={claimantIDRef}
                            size="small"
                            placeholder="Enter Claimant ID"
                            className="w-full"
                            value={form.claimant_id}
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
                            disabled={
                                isFetchingCaseNotes || isFetchingClaimantID
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                            disableFuture
                            value={
                                form.start_date ? dayjs(form.start_date) : null
                            }
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
                            disabled={
                                isFetchingCaseNotes || isFetchingClaimantID
                            }
                            minDate={minDate}
                            maxDate={maxDate}
                            disableFuture
                            value={form.end_date ? dayjs(form.end_date) : null}
                            onChange={onEndDateChange}
                            reduceAnimations
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isFetchingCaseNotes || !form.claimant_id}
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
