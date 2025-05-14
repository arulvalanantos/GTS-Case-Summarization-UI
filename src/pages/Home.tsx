import React from 'react'

import CaseNotes from '@/components/CaseNotes'
import SearchForm from '@/components/SearchForm'
import CaseNoteView from '@/components/CaseNoteView'

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-full">
            <SearchForm />
            <div className="flex flex-col w-full h-full">
                <CaseNoteView />
                <CaseNotes />
            </div>
        </div>
    )
}

export default HomePage
