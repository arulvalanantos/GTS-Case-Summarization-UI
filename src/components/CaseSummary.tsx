import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegClone } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'

import SectionTitle from './SectionTitle'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { summarySelector, toggleSummary } from '@/store/reducers/summary'
import { showSnackbar } from '@/store/reducers/alert'
import { caseNotesSelector } from '@/store/reducers/case-notes'

const CaseSummary: React.FC = () => {
    const dispatch = useAppDispatch()
    const { summary, isSummaryExpanded } = useSelector(summarySelector)
    const { isCaseNotesExpanded, caseNotes } = useSelector(caseNotesSelector)

    const handleCopy = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (!summary) return
        navigator.clipboard
            .writeText(summary)
            .then(() => {
                dispatch(showSnackbar(constants.MESSAGE.COPIED))
            })
            .catch((error) => {
                dispatch(
                    showSnackbar(constants.ERROR_MESSAGE.FAILED_TO_COPY + error)
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
            className={`flex flex-col gap-3  overflow-hidden transition-transform duration-300 ease-in-out  ${
                isSummaryExpanded
                    ? `min-h[100px] ${
                          isCaseNotesExpanded
                              ? 'max-h-[200px]'
                              : 'h-full max-h-full'
                      } border-b-1 border-gray-200`
                    : 'h-10'
            }`}
        >
            <div
                className="cursor-pointer flex flex-row items-center justify-between bg-gray-100 px-3 py-2"
                onClick={toggleExpand}
            >
                <SectionTitle title={constants.TITLE.CASE_SUMMARY} />
                {isSummaryExpanded && (
                    <div className="flex flex-row items-center gap-1">
                        <button
                            title="Copy Summary"
                            type="button"
                            className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer group disabled:bg-gray disabled:cursor-not-allowed"
                            onClick={handleCopy}
                            disabled={!summary}
                        >
                            <FaRegClone
                                size={12}
                                className="group-hover:scale-95 transition duration-500 ease-in-out"
                            />
                        </button>
                        <button
                            onClick={generateSummary}
                            title="Generate Summary"
                            type="button"
                            disabled={!caseNotes.length}
                            className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer group disabled:bg-gray disabled:cursor-not-allowed"
                        >
                            <FaArrowRotateLeft
                                size={12}
                                className="group-hover:rotate-360 transition duration-500 ease-in-out"
                            />
                        </button>
                    </div>
                )}
            </div>
            {isSummaryExpanded && (
                <div
                    className={`px-3 py-2 h-full overflow-auto ${
                        !summary ? 'my-5' : ''
                    }`}
                >
                    {summary && (
                        <div>
                            <p className="bg-secondary p-2 rounded font-normal text-sm select-none">
                                {summary}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default CaseSummary
