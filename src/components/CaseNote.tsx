import dayjs from 'dayjs'
import React from 'react'
import { FaRegClone } from 'react-icons/fa'
import { BsBoxArrowInUpRight } from 'react-icons/bs'

import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { showSnackbar } from '@/store/reducers/alert'
import { setViewMode } from '@/store/reducers/case-notes'
import { ICaseNote } from '@/store/reducers/case-notes/types'

type CaseNoteProps = {
    caseNote: ICaseNote
}

const CaseNote: React.FC<CaseNoteProps> = ({ caseNote }) => {
    const dispatch = useAppDispatch()

    const isRedacted = caseNote.Redacted === 'Yes'

    const handleCopy = () => {
        if (!caseNote || !caseNote.Message) return

        navigator.clipboard
            .writeText(caseNote.Message)
            .then(() => {
                dispatch(showSnackbar(constants.MESSAGE.COPIED))
            })
            .catch((error) => {
                dispatch(
                    showSnackbar(constants.ERROR_MESSAGE.FAILED_TO_COPY + error)
                )
            })
    }

    const handleView = (id: string) => {
        dispatch(setViewMode(id))
    }

    return (
        <div className="bg-secondary p-2 flex flex-col gap-2 rounded @container">
            <div className="border-b-2 pb-3 border-primary">
                <div className="flex flex-row items-center justify-between  ">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm md:text-base font-bold">
                            CLAIM ID: {caseNote.Claim_ID}
                        </h2>
                        <div className="flex flex-col @[300px]:flex-row items-start @[300px]:items-center gap-2 @[300px]:gap-5 text-xs md:text-sm">
                            <p className="text-primary ">
                                {dayjs(caseNote.Created_Date).format(
                                    constants.DEFAULT_DATE_FORMAT
                                ) || ''}
                            </p>
                            {isRedacted && (
                                <p className="bg-primary text-white px-2 rounded">
                                    Redacted
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <button
                            type="button"
                            title="Copy Case Note"
                            aria-label="Copy Case Note"
                            className="group bg-white text-primary px-2 py-1 border-[1.5px] border-primary rounded text-xs flex items-center gap-2 cursor-pointer"
                            onClick={handleCopy}
                        >
                            <FaRegClone
                                size={12}
                                className="group-hover:scale-105 transition-transform duration-300 ease-in"
                            />
                            <span className="hidden lg:flex">Copy</span>
                        </button>
                        <button
                            type="button"
                            title="View Case Note"
                            aria-label="View Case Note"
                            className="group bg-white text-primary px-2 py-1 border-[1.5px] border-primary rounded text-xs flex items-center gap-2 cursor-pointer"
                            onClick={() => handleView(caseNote.Claim_ID)}
                        >
                            <BsBoxArrowInUpRight
                                size={12}
                                className="group-hover:translate-x-[2px] transition-transform duration-300 ease-in"
                            />
                            <span className="hidden lg:flex">View</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col @[425px]:flex-row items-start @[425px]:items-center gap-2 @[425px]:gap-5 mt-2 text-xs md:text-sm text-primary">
                    <p>
                        Created By: <span>{caseNote.Created_By}</span>
                    </p>
                    <p>
                        Process Type: <span>{caseNote.Process_Type}</span>
                    </p>
                </div>
            </div>
            <div>
                <p className="text-xs md:text-sm font-normal line-clamp-3">
                    {caseNote.Message}
                </p>
            </div>
        </div>
    )
}

export default CaseNote
