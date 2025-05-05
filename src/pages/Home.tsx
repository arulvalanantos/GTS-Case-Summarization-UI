import React, { useEffect } from 'react'

import Utils from '@common/utils'
import { useAppDispatch } from '@store/hooks'
import { updateCaseNotes } from '@store/reducers/case-notes'

import CaseNotes from '@/components/CaseNotes'
import SearchForm from '@/components/SearchForm'
import CaseNoteView from '@/components/CaseNoteView'

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const caseNotes = Utils.generateCaseNotes()
        dispatch(updateCaseNotes(caseNotes))
    }, [dispatch])

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
