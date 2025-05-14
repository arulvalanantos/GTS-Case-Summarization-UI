import React from 'react'

type SectionTitleProps = {
    title: string
    className?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '' }) => {
    return (
        <h3
            draggable={false}
            className={`text-sm sm:text-lg font-bold select-none pointer-events-none ${className}`}
        >
            {title}
        </h3>
    )
}

export default SectionTitle
