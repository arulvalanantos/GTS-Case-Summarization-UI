import React from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

import { useAppDispatch } from '@/store/hooks'
import { caseNotesSelector, clearViewMode } from '@/store/reducers/case-notes'
import SectionTitle from './SectionTitle'
import constants from '@/common/constants'

const CaseNoteView: React.FC = () => {
    const dispatch = useAppDispatch()

    const { caseNotes, viewCaseNoteID, isCaseNotesExpanded } =
        useSelector(caseNotesSelector)

    if (!viewCaseNoteID) return null

    const caseNote = caseNotes.find((note) => note.Claim_ID === viewCaseNoteID)
    const isRedacted = caseNote?.Redacted === 'Yes'

    const increaseFontSize = () => {}
    const decreaseFontSize = () => {}

    const handleCloseView = () => {
        dispatch(clearViewMode())
    }

    return (
        <div
            className={`flex flex-col gap-2 overflow-auto ${
                isCaseNotesExpanded ? 'flex-4 w-full h-full min-h-0' : 'h-10'
            }`}
        >
            <div className="flex flex-row items-start justify-between py-2 px-3 bg-gray-100">
                <SectionTitle title={constants.TITLE.CASE_NOTE_DETAILS} />
                <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-row gap-1 items-end">
                        <button
                            type="button"
                            id="knowledge-assist-decreaser"
                            title="Decrease Font Size"
                            className="bg-primary text-white text-xs w-5 h-5 rounded cursor-pointer"
                            onClick={increaseFontSize}
                        >
                            A
                        </button>
                        <button
                            type="button"
                            id="knowledge-assist-increaser"
                            title="Increase Font Size"
                            className="bg-primary text-white text-sm w-7 h-7 rounded cursor-pointer"
                            onClick={decreaseFontSize}
                        >
                            A
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseView}
                        className="bg-white p-1 text-primary border-primary border-[1.5px] rounded cursor-pointer flex flex-row gap-1 items-center"
                    >
                        <IoMdClose size={14} />
                        <span className="text-xs">Close</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-3">
                <h2 className="text-sm md:text-base font-bold">
                    CLAIM ID: {caseNote?.Claim_ID}
                </h2>
                <div className="flex flex-row items-center gap-5 text-xs md:text-sm">
                    <p className="text-primary ">
                        {
                            <p className="text-primary">
                                {dayjs(caseNote?.Created_Date).format(
                                    'MM-DD-YYYY'
                                ) || ''}
                            </p>
                        }
                    </p>
                    {isRedacted && (
                        <p className="bg-primary text-white px-2 rounded">
                            Redacted
                        </p>
                    )}
                </div>
            </div>
            <div className="px-3 flex flex-row items-center gap-5 text-xs md:text-sm text-primary">
                <p>
                    Created By: <span>{caseNote?.Created_By}</span>
                </p>
                <p>
                    Process Type: <span>{caseNote?.Process_Type}</span>
                </p>
            </div>
            <div className="px-3">
                <p className="text-xs md:text-sm font-normal">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Atque impedit quo accusantium beatae. Labore, animi?
                    Accusamus omnis in commodi velit veniam consequatur quis
                    quisquam, ipsum doloremque! Assumenda velit quos
                    repellendus? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Quia dolorum est impedit eos cum harum
                    nemo quis. Culpa ex quisquam quam unde voluptate enim sed
                    est. Amet accusantium praesentium aperiam. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Pariatur rem rerum
                    sint dignissimos delectus, iusto nisi minima nulla, tempore,
                    laborum aperiam. Nemo voluptate impedit est dolores
                    quibusdam tempora. Nobis, tenetur? Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Porro doloribus in
                    voluptatibus pariatur temporibus esse perferendis
                    exercitationem, debitis fuga placeat voluptatum vel
                    praesentium tempore ut minus quia? Error, eveniet porro!
                </p>
                <p className="text-xs md:text-sm font-normal">
                    {caseNote?.Message}
                </p>
            </div>
        </div>
    )
}

export default CaseNoteView
