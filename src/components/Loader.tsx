import CircularProgress from '@mui/material/CircularProgress'

type LoaderProps = {
    message?: string
}

const Loader: React.FC<LoaderProps> = ({ message = '' }) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-row gap-4 items-center">
                <CircularProgress size={20} title={message} />
                {message && (
                    <p className="italic font-light text-xs md:text-sm text-gray">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Loader
