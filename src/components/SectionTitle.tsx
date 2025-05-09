import React from 'react'

type SectionTitleProps = {
    title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return <h3 className="text-sm sm:text-lg font-bold select-none">{title}</h3>
}

export default SectionTitle
