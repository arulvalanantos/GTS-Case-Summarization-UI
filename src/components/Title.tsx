import React from 'react'

type SectionTitleProps = {
    title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return <h3 className="text-base font-bold">{title}</h3>
}

export default SectionTitle
