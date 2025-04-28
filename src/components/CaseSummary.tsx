import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegClone } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'

import Utils from '@/common/utils'
import SectionTitle from './Title'
import constants from '@/common/constants'
import { summarySelector } from '@/store/reducers/summary'

const CaseSummary: React.FC = () => {
    const { summary } = useSelector(summarySelector)

    const handleCopy = () => {
        if (!summary) return
        Utils.copyToClipboard(summary)
    }

    return (
        <section
            id="case-summary"
            className="flex-1 px-3 py-2 flex flex-col gap-3 min-h[100px] max-h-[250px] overflow-auto border-b-2 border-gray"
        >
            <div className="flex flex-row items-center justify-between">
                <SectionTitle title={constants.TITLE.CASE_SUMMARY} />
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
                        title="Regenerate Summary"
                        type="button"
                        className="bg-primary w-6 h-6 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer"
                    >
                        <FaArrowRotateLeft size={12} />
                    </button>
                </div>
            </div>
            {summary ? (
                <div>
                    <p className="bg-secondary p-2 rounded font-normal text-sm">
                        {summary}
                    </p>
                </div>
            ) : (
                <p className="text-xs font-light text-gray flex items-center justify-center w-full h-full">
                    No summary available. Please generate a summary to view it
                    here.
                </p>
            )}
        </section>
    )
}

export default CaseSummary
