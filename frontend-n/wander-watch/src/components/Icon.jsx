import React from 'react'

export const Icon = (props) => {
    const IconElement = props.iconelement

    return <IconElement className={`icon ${props.className}`}/>
}