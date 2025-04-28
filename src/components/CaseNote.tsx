import dayjs from 'dayjs'
import React from 'react'
import { FaRegClone } from 'react-icons/fa'
import { BsBoxArrowInUpRight } from 'react-icons/bs'

import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { showSnackbar } from '@/store/reducers/alert'
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

    return (
        <div className="bg-secondary p-2 flex flex-col gap-2 rounded">
            <div className="border-b-2 pb-3 border-primary">
                <div className="flex flex-row items-center justify-between  ">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm md:text-base font-bold">
                            CLAIM ID: {caseNote.Claim_ID}
                        </h2>
                        <div className="flex flex-row items-center gap-5 text-xs md:text-sm">
                            <p className="text-primary ">
                                {
                                    <p className="text-primary">
                                        {dayjs(caseNote.Created_Date).format(
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
                    <div className="flex flex-row items-center gap-2">
                        <button
                            type="button"
                            title="Copy Case Note"
                            aria-label="Copy Case Note"
                            className="bg-white text-primary px-2 py-1 border-[1.5px] border-primary rounded text-xs flex items-center gap-2 cursor-pointer"
                            onClick={handleCopy}
                        >
                            <FaRegClone size={12} />
                            <span className="hidden lg:flex">Copy</span>
                        </button>
                        <button
                            type="button"
                            title="View Case Note"
                            aria-label="View Case Note"
                            className="bg-white text-primary px-2 py-1 border-[1.5px] border-primary rounded text-xs flex items-center gap-2 cursor-pointer"
                        >
                            <BsBoxArrowInUpRight size={12} />
                            <span className="hidden lg:flex">View</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-5 mt-2 text-xs md:text-sm text-primary">
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
