import React from 'react'

import { FaRegClone } from 'react-icons/fa'
import { FaArrowRotateLeft } from 'react-icons/fa6'

import SectionTitle from './Title'
import constants from '@/common/constants'

const CaseSummary: React.FC = () => {
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
                        className="bg-primary w-5 h-5 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer"
                    >
                        <FaRegClone size={8} />
                    </button>
                    <button
                        title="Regenerate Summary"
                        type="button"
                        className="bg-primary w-5 h-5 text-white rounded-sm flex items-center justify-center text-sm cursor-pointer"
                    >
                        <FaArrowRotateLeft size={8} />
                    </button>
                </div>
            </div>
            <div>
                <p className="bg-secondary p-2 rounded font-normal text-sm">
                    A user is struggling to reset their password due to repeated
                    errors with their security question. Despite trying multiple
                    browsers and clearing cache, the issue persists. The agent
                    verifies the user’s email, confirms troubleshooting steps,
                    and escalates the issue to the technical team for manual
                    intervention. The user appreciates the help and awaits an
                    email with further instructions.
                </p>
            </div>
        </section>
    )
}

export default CaseSummary
