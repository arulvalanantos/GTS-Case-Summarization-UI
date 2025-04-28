import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

import SectionTitle from './Title'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { configSelector, setFormExpanded } from '@/store/reducers/config'

const SearchForm: React.FC = () => {
    const dispatch = useAppDispatch()

    const { isFormExpanded } = useSelector(configSelector)

    const Icon = useMemo(() => {
        return isFormExpanded ? FaAngleDoubleLeft : FaAngleDoubleRight
    }, [isFormExpanded])

    const width = useMemo(() => {
        return isFormExpanded ? 'w-46' : 'w-9'
    }, [isFormExpanded])

    const toggleFormExpand = () => {
        dispatch(setFormExpanded(!isFormExpanded))
    }

    return (
        <div
            className={`content-box ${width} max-w-46 min-w-9 bg-secondary p-2`}
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
            {isFormExpanded && <form onSubmit={() => false}></form>}
        </div>
    )
}

export default SearchForm
