import { useEffect, useRef, useState } from "react"

export const useSet = (value, callback) => {
    const hasBeenSetRef = useRef(false)

    useEffect(() => {
        if (value && !hasBeenSetRef.current){ // To be reviewed
            hasBeenSetRef.current = true
            callback()
        } 
    }, [value])

    return null
}
