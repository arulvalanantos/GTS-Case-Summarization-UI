import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { FaRegClone } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Loader from './Loader'
import SectionTitle from './SectionTitle'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { showSnackbar } from '@/store/reducers/alert'
import { fetchSummary } from '@/store/reducers/summary/thunk'
import { caseNotesSelector } from '@/store/reducers/case-notes'
import { summarySelector, toggleSummary } from '@/store/reducers/summary'

const MIN_HEIGHT = 100
const MAX_HEIGHT = 200

const CaseSummary: React.FC = () => {
    const dispatch = useAppDispatch()
    const { summary, isSummaryExpanded, isFetchingSummary } =
        useSelector(summarySelector)
    const { isCaseNotesExpanded, caseNotes } = useSelector(caseNotesSelector)

    const [height, setHeight] = useState<number | null>(() => {
        const savedHeight = localStorage.getItem(
            constants.LOCAL_STORAGE.CASE_SUMMARY_HEIGHT
        )
        if (savedHeight) {
            const height = parseInt(savedHeight, 10)
            return isNaN(height) ? null : height
        }
        return null
    })
    const [isResizing, setIsResizing] = useState(false)

    const heightInfo = useMemo(() => {
        let currentHeight = `${height}px`
        let minHeight = `${MIN_HEIGHT}px`
        let maxHeight = `${MAX_HEIGHT}px`

        if (isSummaryExpanded) {
            if (isCaseNotesExpanded) {
                currentHeight = `${height}px`
                minHeight = `${MIN_HEIGHT}px`
                maxHeight = `${MAX_HEIGHT}px`
            } else {
                currentHeight = '100%'
                minHeight = `${MIN_HEIGHT}px`
                maxHeight = '100%'
            }
        } else {
            currentHeight = '40px'
            minHeight = '40px'
            maxHeight = '40px'
        }

        return {
            currentHeight,
            minHeight,
            maxHeight
        }
    }, [isSummaryExpanded, isCaseNotesExpanded, height])

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

        dispatch(fetchSummary())
    }

    const toggleExpand = () => {
        dispatch(toggleSummary())
    }

    const startResizing = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsResizing(true)
    }

    const stopResizing = () => {
        setIsResizing(false)
    }

    const resize = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return

            const container = document.getElementById('case-summary')
            if (!container) return

            const newHeight = e.clientY - container.getBoundingClientRect().top
            const clampedHeight = Math.min(
                MAX_HEIGHT,
                Math.max(MIN_HEIGHT, newHeight)
            )

            // 👇 Live DOM update (faster than setState)
            container.style.height = `${clampedHeight}px`
            container.style.maxHeight = `${clampedHeight}px`
            container.style.minHeight = `${clampedHeight}px`

            // 👇 Save to state and localStorage after drag ends
            setHeight(clampedHeight)

            localStorage.setItem(
                constants.LOCAL_STORAGE.CASE_SUMMARY_HEIGHT,
                String(clampedHeight)
            )
        },
        [isResizing]
    )

    useEffect(() => {
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResizing)
        return () => {
            window.removeEventListener('mousemove', resize)
            window.removeEventListener('mouseup', stopResizing)
        }
    }, [isResizing, resize])

    useEffect(() => {
        if (isResizing) {
            document.body.style.cursor = 'row-resize'
        } else {
            document.body.style.cursor = ''
        }

        return () => {
            document.body.style.cursor = ''
        }
    }, [isResizing])

    return (
        <>
            <section
                id="case-summary"
                className={`flex flex-col overflow-hidden ${
                    isResizing
                        ? ''
                        : 'transition-height duration-300 ease-in-out'
                }`}
                style={{
                    height: heightInfo.currentHeight,
                    minHeight: heightInfo.minHeight,
                    maxHeight: heightInfo.maxHeight
                }}
            >
                <div className="flex flex-row items-center justify-between bg-gray-100 px-3 py-2">
                    <div className="flex flex-row items-center gap-2">
                        <SectionTitle title={constants.TITLE.CASE_SUMMARY} />
                        <button
                            type="button"
                            onClick={toggleExpand}
                            className="cursor-pointer"
                            title={isSummaryExpanded ? 'Collapse' : 'Expand'}
                        >
                            <IoIosArrowDown
                                size={16}
                                className={`text-gray-500 transition-transform duration-300 ease-in-out ${
                                    isSummaryExpanded ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    </div>
                    {isSummaryExpanded && (
                        <div className="flex flex-row items-center gap-1">
                            <button
                                title="Copy Summary"
                                type="button"
                                className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer group disabled:bg-gray disabled:cursor-not-allowed transition-all duration-500 ease-in"
                                onClick={handleCopy}
                                disabled={!summary}
                            >
                                <FaRegClone
                                    size={12}
                                    className="group-hover:scale-95 transition duration-500 ease"
                                />
                            </button>
                            <button
                                onClick={generateSummary}
                                title="Generate Summary"
                                type="button"
                                disabled={!caseNotes.length}
                                className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer group disabled:bg-gray disabled:cursor-not-allowed transition-all duration-500 ease-in"
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
                        className={`px-3 py-2 h-full ${
                            !summary || isFetchingSummary
                                ? 'my-5'
                                : ' overflow-auto'
                        }`}
                    >
                        {isFetchingSummary && (
                            <Loader
                                message={
                                    constants.LOADER_MESSAGE
                                        .FETCHING_CASE_SUMMARY
                                }
                            />
                        )}
                        {summary && !isFetchingSummary && (
                            <div className="bg-secondary p-2 rounded font-normal text-sm select-none">
                                <ReactMarkdown>{summary}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                )}
            </section>
            {isSummaryExpanded && isCaseNotesExpanded && (
                <div
                    onMouseDown={startResizing}
                    className={`h-[2px] cursor-row-resize ${
                        isResizing ? 'bg-primary' : 'bg-gray-300'
                    } hover:bg-primary`}
                />
            )}
        </>
    )
}

export default CaseSummary
