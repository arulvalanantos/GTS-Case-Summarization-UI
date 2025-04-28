import { FaRegClone } from 'react-icons/fa'
import { BsBoxArrowInUpRight } from 'react-icons/bs'

const CaseNote = () => {
    const claimId = '1234567890'

    return (
        <div className="bg-secondary p-2 flex flex-col gap-2 rounded">
            <div className="border-b-2 pb-3 border-primary">
                <div className="flex flex-row items-center justify-between  ">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm md:text-base font-bold">
                            CLAIM ID: {claimId}
                        </h2>
                        <div className="flex flex-row items-center gap-5 text-xs md:text-sm">
                            <p className="text-primary ">03-18-2025</p>
                            <p className="bg-primary text-white px-2 rounded">
                                Redacted
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <button
                            type="button"
                            title="Copy Case Note"
                            aria-label="Copy Case Note"
                            className="bg-white text-primary px-2 py-1 border-[1.5px] border-primary rounded text-xs flex items-center gap-2 cursor-pointer"
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
                        Created By: <span>User 1</span>
                    </p>
                    <p>
                        Process Type: <span>Type A</span>
                    </p>
                </div>
            </div>
            <div>
                <p className="text-xs md:text-sm font-normal line-clamp-3">
                    Rest assured, John, we’ll get this resolved for you. Let me
                    double-check if there’s a known issue with security
                    questions or if your account has specific settings causing
                    this.
                </p>
            </div>
        </div>
    )
}

export default CaseNote
