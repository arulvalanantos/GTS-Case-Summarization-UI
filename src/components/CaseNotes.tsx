import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import TextField from '@mui/material/TextField'
import { IoIosArrowDown } from 'react-icons/io'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import CircularProgress from '@mui/material/CircularProgress'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineDateRange, MdOutlineNumbers } from 'react-icons/md'

import CaseNote from './CaseNote'
import SectionTitle from './SectionTitle'
import constants from '@/common/constants'
import { useAppDispatch } from '@/store/hooks'
import { noOfRowsPerPages } from '@/common/static'
import {
    caseNotesSelector,
    nextPage,
    previousPage,
    setNoOfRowsPerPage,
    toggleCaseNotes,
    toggleSortClaimantIDOrder,
    toggleSortDateOrder,
    updateSearchText
} from '@/store/reducers/case-notes'

const CaseNotes: React.FC = () => {
    const dispatch = useAppDispatch()

    const {
        caseNotes,
        noOfRowsPerPage,
        isCaseNotesExpanded,
        currentPage,
        isFetchingCaseNotes,
        searchText,
        sort: { date: dateSort, claimantID: claimantIDSort }
    } = useSelector(caseNotesSelector)

    const [isFocused, setIsFocused] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)

    const DateSortIcon = useMemo(() => {
        return dateSort === 'asc' ? FaArrowUp : FaArrowDown
    }, [dateSort])

    const ClaimantIDSortIcon = useMemo(() => {
        return claimantIDSort === 'asc' ? FaArrowUp : FaArrowDown
    }, [claimantIDSort])

    const filteredCaseNotes = useMemo(() => {
        return [...caseNotes].filter(
            (note) =>
                note.Claim_ID.toLowerCase().includes(
                    searchText.toLowerCase()
                ) ||
                note.Message?.toLowerCase()?.includes(searchText.toLowerCase())
        )
    }, [caseNotes, searchText])

    const filteredTotalPages = useMemo(() => {
        return Math.ceil(filteredCaseNotes.length / noOfRowsPerPage)
    }, [filteredCaseNotes, noOfRowsPerPage])

    const sortedAndPaginatedNotes = useMemo(() => {
        const claimantOrder = claimantIDSort === 'asc' ? 1 : -1
        const dateOrder = dateSort === 'asc' ? 1 : -1

        return [...filteredCaseNotes]
            .sort((a, b) => {
                const aClaimId = Number(a.Claim_ID)
                const bClaimId = Number(b.Claim_ID)

                // Sort by Claim_ID (numerically), descending default
                if (aClaimId !== bClaimId) {
                    return (aClaimId - bClaimId) * claimantOrder
                }

                // If Claim_IDs are same, sort by Created_Date
                const aDate = dayjs(a.Created_Date)
                const bDate = dayjs(b.Created_Date)

                if (!aDate.isSame(bDate)) {
                    return aDate.isAfter(bDate) ? dateOrder : -dateOrder
                }

                return 0
            })
            .slice(
                (currentPage - 1) * noOfRowsPerPage,
                currentPage * noOfRowsPerPage
            )
    }, [
        filteredCaseNotes,
        noOfRowsPerPage,
        currentPage,
        dateSort,
        claimantIDSort
    ])

    const handleChangeNoOfRowsPerPage = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value
        const isValid = noOfRowsPerPages.some((row) => row.value === +value)
        if (!isValid) return

        const num = parseInt(value, 10)
        if (isNaN(num)) return

        dispatch(setNoOfRowsPerPage(num))
        localStorage.setItem(
            constants.LOCAL_STORAGE.ROWS_PER_PAGE,
            num.toString()
        )
    }

    const handleCaseNoteExpandsion = () => {
        dispatch(toggleCaseNotes())
    }

    const handleCaseNoteDateSort = (event: React.MouseEvent) => {
        event.stopPropagation()
        dispatch(toggleSortDateOrder())
    }

    const handleClaimantIDSort = (event: React.MouseEvent) => {
        event.stopPropagation()
        dispatch(toggleSortClaimantIDOrder())
    }

    const goToPreviousPage = () => {
        dispatch(previousPage())
    }
    const goToNextPage = () => {
        dispatch(nextPage())
    }

    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        dispatch(updateSearchText(value))
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0
        }
    }, [currentPage, noOfRowsPerPage])

    return (
        <section
            id="case-notes"
            className={`flex flex-col ${
                isCaseNotesExpanded ? 'flex-4 w-full h-full min-h-0' : 'h-10'
            }`}
        >
            <div className="flex flex-col gap-3 flex-none">
                <div className="bg-gray-100 p-2 px-3 flex flex-row items-center justify-between gap-2 sm:gap-0">
                    <div className="flex flex-row items-center gap-2">
                        <SectionTitle title={constants.TITLE.CASE_NOTES} />
                        <button
                            type="button"
                            onClick={handleCaseNoteExpandsion}
                            className="cursor-pointer"
                            title={isCaseNotesExpanded ? 'Collapse' : 'Expand'}
                        >
                            <IoIosArrowDown
                                size={16}
                                className={`text-gray-500 transition-transform duration-300 ease-in-out ${
                                    isCaseNotesExpanded ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                    </div>
                    {isCaseNotesExpanded && (
                        <div className="flex flex-row gap-3">
                            <button
                                type="button"
                                onClick={handleClaimantIDSort}
                                disabled={!caseNotes.length}
                                title="Sort by Claimant ID"
                                className="bg-primary text-white px-2 xs:py-2 xs:px-3 text-sm rounded flex flex-row items-center gap-1 xs:gap-3 cursor-pointer select-none hover:scale-98 transition duration-500 ease-in-out disabled:cursor-not-allowed disabled:bg-gray"
                            >
                                <span className="text-xs hidden sm:flex flex-row items-center gap-1">
                                    Sort by Claimant ID
                                </span>
                                <MdOutlineNumbers
                                    size={16}
                                    className="flex sm:hidden"
                                />
                                <ClaimantIDSortIcon size={12} />
                            </button>
                            <button
                                type="button"
                                onClick={handleCaseNoteDateSort}
                                disabled={!caseNotes.length}
                                title="Sort by Note Date"
                                className="bg-primary text-white p-2 xs:py-2 xs:px-3 text-sm rounded flex flex-row items-center gap-1 xs:gap-3 cursor-pointer select-none hover:scale-98 transition duration-500 ease-in-out disabled:cursor-not-allowed disabled:bg-gray"
                            >
                                <span className="hidden sm:flex text-xs flex-row items-center gap-1">
                                    Sort By Note Date
                                </span>
                                <MdOutlineDateRange
                                    size={16}
                                    className="flex sm:hidden"
                                />
                                <DateSortIcon size={12} />
                            </button>
                        </div>
                    )}
                </div>
                {isCaseNotesExpanded && (
                    <div className="px-3">
                        <TextField
                            value={searchText}
                            onChange={onSearchTextChange}
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
                )}
            </div>
            {isCaseNotesExpanded && (
                <>
                    {sortedAndPaginatedNotes?.length && !isFetchingCaseNotes ? (
                        <div
                            ref={scrollRef}
                            className="bg-white p-2 flex-1 min-h-0 w-full overflow-auto grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-min"
                        >
                            {sortedAndPaginatedNotes?.map((caseNote, index) => (
                                <CaseNote key={index} caseNote={caseNote} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-2 flex-1 min-h-0 w-full overflow-auto text-primary">
                            {isFetchingCaseNotes ? (
                                <div className="flex items-center justify-center w-full h-full">
                                    <CircularProgress
                                        color="inherit"
                                        size={16}
                                    />
                                </div>
                            ) : (
                                <p className="text-xs font-light text-gray flex items-center justify-center w-full h-full select-none">
                                    No case notes found
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
            {isCaseNotesExpanded && !!filteredCaseNotes.length && (
                <div className="bg-white h-8 w-full flex flex-row items-center justify-end gap-2 sm:gap-7 text-sm px-3 flex-none">
                    {!!searchText && (
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-[8px] sm:text-xs text-dark-gray">
                                Total Results:
                            </p>
                            <p className="text-[8px] sm:text-xs text-dark-gray">
                                {filteredCaseNotes.length}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-[8px] sm:text-xs text-dark-gray">
                            Rows per page:
                        </p>
                        <select
                            id="rows-per-page"
                            name="rows-per-page"
                            disabled={isFetchingCaseNotes}
                            className="text-[8px] sm:text-xs outline-none border-none"
                            value={noOfRowsPerPage}
                            onChange={handleChangeNoOfRowsPerPage}
                        >
                            {noOfRowsPerPages.map((row) => (
                                <option key={row.value} value={row.value}>
                                    {row.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center gap-2 sm:gap-5">
                        <p className="text-[8px] sm:text-xs select-none">
                            {currentPage} of {filteredTotalPages}
                        </p>
                        <button
                            type="button"
                            className="cursor-pointer disabled:cursor-not-allowed disabled:text-gray"
                            disabled={
                                currentPage < 2 || filteredTotalPages === 0
                            }
                            onClick={goToPreviousPage}
                        >
                            <IoIosArrowBack className="text-[8px] sm:text-base" />
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer disabled:cursor-not-allowed disabled:text-gray"
                            disabled={
                                currentPage >= filteredTotalPages ||
                                filteredTotalPages === 0
                            }
                            onClick={goToNextPage}
                        >
                            <IoIosArrowForward className="text-[8px] sm:text-base" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default CaseNotes
