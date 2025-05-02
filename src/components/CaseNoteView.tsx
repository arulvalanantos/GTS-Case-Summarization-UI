import React from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

import SectionTitle from './SectionTitle'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { caseNotesSelector, clearViewMode } from '@/store/reducers/case-notes'

const allowedFontSizes = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl'
] as const
type FontSize = (typeof allowedFontSizes)[number]

const CaseNoteView: React.FC = () => {
    const dispatch = useAppDispatch()

    const { caseNotes, viewCaseNoteID, isCaseNotesExpanded, isViewMode } =
        useSelector(caseNotesSelector)

    const [fontSize, setFontSize] = React.useState<FontSize>(() => {
        const saved = localStorage.getItem(
            constants.LOCAL_STORAGE.CASE_NOTE_FONT_SIZE
        )
        if (allowedFontSizes.includes(saved as FontSize)) {
            return saved as FontSize
        }
        return 'text-sm'
    })

    if (!viewCaseNoteID) return null

    const caseNote = caseNotes.find((note) => note.Claim_ID === viewCaseNoteID)
    const isRedacted = caseNote?.Redacted === 'Yes'

    const increaseFontSize = () => {
        setFontSize((prev) => {
            const next = (() => {
                switch (prev) {
                    case 'text-xs':
                        return 'text-sm'
                    case 'text-sm':
                        return 'text-base'
                    case 'text-base':
                        return 'text-lg'
                    case 'text-lg':
                        return 'text-xl'
                    default:
                        return 'text-xl'
                }
            })()
            localStorage.setItem(
                constants.LOCAL_STORAGE.CASE_NOTE_FONT_SIZE,
                next
            )
            return next
        })
    }

    const decreaseFontSize = () => {
        setFontSize((prev) => {
            const next = (() => {
                switch (prev) {
                    case 'text-xl':
                        return 'text-lg'
                    case 'text-lg':
                        return 'text-base'
                    case 'text-base':
                        return 'text-sm'
                    case 'text-sm':
                        return 'text-xs'
                    default:
                        return 'text-xs'
                }
            })()
            localStorage.setItem(
                constants.LOCAL_STORAGE.CASE_NOTE_FONT_SIZE,
                next
            )
            return next
        })
    }

    const handleCloseView = () => {
        dispatch(clearViewMode())
    }

    return (
        <div
            className={`${
                isViewMode ? 'flex' : 'hidden'
            } flex-col gap-2 overflow-auto ${
                isCaseNotesExpanded ? 'flex-4 w-full h-full min-h-0' : 'h-10'
            }`}
        >
            <div className="flex flex-row items-center justify-between py-2 px-3 bg-gray-100">
                <SectionTitle title={`CLAIM ID: ${caseNote?.Claim_ID}`} />
                <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-row gap-1 items-end">
                        <button
                            type="button"
                            id="knowledge-assist-decreaser"
                            title="Decrease Font Size"
                            className="group bg-primary text-white text-xs w-5 h-5 rounded cursor-pointer disabled:bg-gray disabled:cursor-not-allowed hover:scale-95 transition-transform duration-300 ease-in"
                            onClick={decreaseFontSize}
                            disabled={fontSize === 'text-xs'}
                        >
                            <span className="group-hover:scale-90">A</span>
                        </button>
                        <button
                            type="button"
                            id="knowledge-assist-increaser"
                            title="Increase Font Size"
                            className="group bg-primary text-white text-sm w-7 h-7 rounded cursor-pointer disabled:bg-gray disabled:cursor-not-allowed hover:scale-95 transition-transform duration-300 ease-in"
                            onClick={increaseFontSize}
                            disabled={fontSize === 'text-xl'}
                        >
                            <span className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                A
                            </span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseView}
                        className="group bg-white p-1 text-primary border-primary border-[1.5px] rounded cursor-pointer flex flex-row gap-1 items-center hover:scale-95 transition-transform duration-300 ease-in"
                    >
                        <IoMdClose
                            size={14}
                            className="group-hover:scale-105 transform duration-300 ease-in"
                        />
                        <span className="text-xs">Close</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-3">
                <div className="flex flex-row items-center gap-5 text-xs md:text-sm">
                    <p className="text-primary flex flex-row gap-1 items-center">
                        <span>Created At:</span>
                        <span>
                            {dayjs(caseNote?.Created_Date).format(
                                'MM-DD-YYYY'
                            ) || ''}
                        </span>
                    </p>
                    {isRedacted && (
                        <p className="bg-primary text-white px-2 rounded">
                            Redacted
                        </p>
                    )}
                </div>
            </div>
            <div className="px-3 flex flex-row items-center gap-5 text-xs md:text-sm text-primary">
                <p className="flex flex-row gap-1 items-center">
                    <span>Created By:</span>
                    <span>{caseNote?.Created_By}</span>
                </p>
                <p className="flex flex-row gap-1 items-center">
                    <span>Process Type:</span>{' '}
                    <span>{caseNote?.Process_Type}</span>
                </p>
            </div>
            <div className="px-3">
                <p className={`${fontSize} font-normal`}>
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
                <p className={`${fontSize} font-normal`}>{caseNote?.Message}</p>
            </div>
        </div>
    )
}

export default CaseNoteView
