import React from 'react'


import SectionTitle from './Title'
import constants from '@/common/constants'

const CaseNotes: React.FC = () => {
    return (
        <section id="case-notes" className="flex-4 bg-violet-50 p-2">
            <div>
                <SectionTitle title={constants.TITLE.CASE_NOTES} />
            </div>
        </section>
    )
}

export default CaseNotes
