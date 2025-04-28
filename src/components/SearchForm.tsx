import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import SectionTitle from './Title'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { configSelector, setFormExpanded } from '@/store/reducers/config'
import dayjs from 'dayjs'

const SearchForm: React.FC = () => {
    const dispatch = useAppDispatch()

    const { isFormExpanded } = useSelector(configSelector)

    const Icon = useMemo(() => {
        return isFormExpanded ? FaAngleDoubleLeft : FaAngleDoubleRight
    }, [isFormExpanded])

    const width = useMemo(() => {
        return isFormExpanded ? 'w-40' : 'w-9'
    }, [isFormExpanded])

    const toggleFormExpand = () => {
        dispatch(setFormExpanded(!isFormExpanded))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
    }

    return (
        <div
            className={`content-box ${width} max-w-40 min-w-9 bg-secondary p-2 overflow-hidden w-full`}
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
                    className="flex items-center justify-center"
                    onClick={toggleFormExpand}
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
                        <label className="text-xs">Claimant ID</label>
                        <input
                            type="text"
                            placeholder="Enter Claimant ID"
                            className="w-full border border-gray focus:border-primary px-2 py-1 rounded bg-white text-xs"
                        />
                    </div>
                    <div>
                        <label className="text-xs">Start Date</label>
                        <DatePicker className="w-full bg-white border-primary text-xs" />
                    </div>
                    <div>
                        <label className="text-xs">End Date</label>
                        <DatePicker
                            className="w-full bg-white border-primary px-2 py-1 rounded text-xs"
                            maxDate={dayjs()}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-3 rounded text-sm"
                    >
                        <span>Submit</span>
                    </button>
                </form>
            )}
        </div>
    )
}

export default SearchForm
