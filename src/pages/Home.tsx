import React from 'react'
import { useSelector } from 'react-redux'

import CaseNotes from '@/components/CaseNotes'
import SearchForm from '@/components/SearchForm'
import CaseSummary from '@/components/CaseSummary'
import CaseNoteView from '@/components/CaseNoteView'
import { configSelector } from '@/store/reducers/config'

const HomePage: React.FC = () => {
    const { configuration } = useSelector(configSelector)

    return (
        <div className="flex flex-row w-full h-full">
            <SearchForm />
            <div className="flex flex-col w-full h-full">
                {configuration.is_case_summary_enabled && <CaseSummary />}
                <CaseNoteView />
                <CaseNotes />
            </div>
        </div>
    )
}

export default HomePage
