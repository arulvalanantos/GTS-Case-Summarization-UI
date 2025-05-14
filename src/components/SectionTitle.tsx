import React from 'react'

type SectionTitleProps = {
    title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <h3
            draggable={false}
            className="text-sm sm:text-lg font-bold select-none pointer-events-none"
        >
            {title}
        </h3>
    )
}

export default SectionTitle
