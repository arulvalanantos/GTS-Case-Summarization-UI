import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegClone } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'

import SectionTitle from './Title'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { summarySelector, toggleSummary } from '@/store/reducers/summary'
import { showSnackbar } from '@/store/reducers/alert'

const CaseSummary: React.FC = () => {
    const dispatch = useAppDispatch()
    const { summary, isSummaryExpanded } = useSelector(summarySelector)

    const handleCopy = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (!summary) return
        navigator.clipboard
            .writeText(summary)
            .then(() => {
                dispatch(
                    showSnackbar({
                        message: constants.MESSAGE.COPIED,
                        severity: 'success',
                        open: true
                    })
                )
            })
            .catch((error) => {
                console.error('Failed to copy text:', error)
                dispatch(
                    showSnackbar({
                        message: constants.ERROR_MESSAGE.FAILED_TO_COPY,
                        severity: 'error',
                        open: true
                    })
                )
            })
    }

    const generateSummary = (event: React.MouseEvent) => {
        event.stopPropagation()
    }

    const toggleExpand = () => {
        dispatch(toggleSummary())
    }

    return (
        <section
            id="case-summary"
            className={`cursor-pointer flex flex-col gap-3  overflow-auto transition-transform duration-300 ease-in-out  ${
                isSummaryExpanded
                    ? 'flex-1 min-h[100px] max-h-[250px] border-b-1 border-gray-200'
                    : 'h-10'
            }`}
        >
            <div
                className="flex flex-row items-center justify-between bg-gray-100 px-3 py-2"
                onClick={toggleExpand}
            >
                <SectionTitle title={constants.TITLE.CASE_SUMMARY} />
                {isSummaryExpanded && (
                    <div className="flex flex-row items-center gap-1">
                        <button
                            title="Copy Summary"
                            type="button"
                            className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer"
                            onClick={handleCopy}
                        >
                            <FaRegClone size={12} />
                        </button>
                        <button
                            onClick={generateSummary}
                            title="Generate Summary"
                            type="button"
                            className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer"
                        >
                            <FaArrowRotateLeft size={12} />
                        </button>
                    </div>
                )}
            </div>
            {isSummaryExpanded && (
                <div className=" px-3 py-2">
                    {summary ? (
                        <div>
                            <p className="bg-secondary p-2 rounded font-normal text-sm select-none">
                                {summary}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xs font-light text-gray flex items-center justify-center w-full h-full select-none">
                            No summary available. Please generate a summary to
                            view it here.
                        </p>
                    )}
                </div>
            )}
        </section>
    )
}

export default CaseSummary
