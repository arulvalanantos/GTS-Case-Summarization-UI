import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import TextField from '@mui/material/TextField'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import CaseNote from './CaseNote'
import SectionTitle from './Title'
import constants from '@/common/constants'

const CaseNotes: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <section
            id="case-notes"
            className="flex-4 flex flex-col w-full h-full min-h-0"
        >
            <div className="flex flex-col gap-3 p-2 px-3 flex-none">
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-0">
                    <SectionTitle title={constants.TITLE.CASE_NOTES} />
                    <div className="flex flex-row gap-3">
                        <button
                            type="button"
                            className="bg-primary text-white py-2 px-3 text-sm rounded flex flex-row items-center gap-3 cursor-pointer"
                        >
                            <span className="text-xs flex flex-row items-center gap-1">
                                <span className="hidden sm:flex">Sort by</span>
                                <span className="text-xs">Claimant ID</span>
                            </span>
                            <FaArrowDown size={12} />
                        </button>
                        <button
                            type="button"
                            className="bg-primary text-white py-2 px-3 text-sm rounded flex flex-row items-center gap-3 cursor-pointer"
                        >
                            <span className="text-xs flex flex-row items-center gap-1">
                                <span className="hidden sm:flex">Sort by</span>
                                <span className="text-xs">Note Date</span>
                            </span>
                            <FaArrowUp size={12} />
                        </button>
                    </div>
                </div>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Filter the results or search for the content"
                    className="w-full"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <FaSearch
                                    className={
                                        isFocused
                                            ? 'text-primary mr-2'
                                            : 'text-gray-500 mr-2'
                                    }
                                />
                            )
                        }
                    }}
                />
            </div>
            <div className="bg-white p-2 flex-1 min-h-0 w-full overflow-auto grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-min">
                {Array.from({ length: 5 }, (_, index) => (
                    <CaseNote key={index} claimId={(index + 1).toString()} />
                ))}
            </div>
            <div className="bg-white h-8 w-full flex flex-row items-center justify-end gap-8 text-sm px-3 flex-none">
                <div className="flex flex-row items-center gap-2">
                    <p className="text-xs text-dark-gray">Rows per page:</p>
                    <select className="text-xs outline-none border-none">
                        <option value="5">10</option>
                        <option value="10">25</option>
                        <option value="20">50</option>
                    </select>
                </div>
                <div className="flex flex-row items-center gap-5">
                    <p className="text-xs">1 of 10</p>
                    <button type="button" className="cursor-pointer">
                        <IoIosArrowBack />
                    </button>
                    <button type="button" className="cursor-pointer">
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CaseNotes
