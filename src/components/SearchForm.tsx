import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import React, { useEffect, useMemo, useRef } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CircularProgress from '@mui/material/CircularProgress'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import SectionTitle from './Title'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
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
        console.log(form)
    }

    useEffect(() => {
        if (!claimantIDRef.current) return

        claimantIDRef.current?.focus()
    }, [])

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
                    title={isFormExpanded ? 'Collapse' : 'Expand'}
                    aria-label={isFormExpanded ? 'Collapse' : 'Expand'}
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
                        <label className="text-xs select-none">
                            Claimant ID
                        </label>
                        <TextField
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
                        <label className="text-xs select-none">
                            Start Date
                        </label>
                        <DatePicker
                            className="w-full bg-white"
                            disabled={isFetchingCaseNotes}
                            reduceAnimations
                            slots={{
                                textField: (props) => (
                                    <TextField {...props} size="small" />
                                )
                            }}
                            minDate={dayjs('2013-10-15')}
                            disableFuture
                            enableAccessibleFieldDOMStructure={false}
                            value={dayjs(form.startDate)}
                            onChange={onStartDateChange}
                        />
                    </div>
                    <div>
                        <label className="text-xs select-none">End Date</label>
                        <DatePicker
                            className="w-full bg-white"
                            disabled={isFetchingCaseNotes}
                            maxDate={dayjs()}
                            reduceAnimations
                            slots={{
                                textField: (props) => (
                                    <TextField {...props} size="small" />
                                )
                            }}
                            disableFuture
                            enableAccessibleFieldDOMStructure={false}
                            value={dayjs(form.endDate)}
                            onChange={onEndDateChange}
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
