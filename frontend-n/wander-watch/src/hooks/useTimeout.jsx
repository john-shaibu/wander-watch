import { useEffect, useRef } from "react";


export function useTimeout(callback, delay = 1000, autoplay = false, startImmediate = false) {
    const timeoutRef = useRef()
    const callbackRef = useRef(callback)
    const delayRef = useRef(delay)

    useEffect(() => {
        if (autoplay) {
            if ( startImmediate ) callbackRef.current()
            set()
        }

        return clear
    }, [])

    const set = () => {
        timeoutRef.current = setTimeout(callbackRef.current, delayRef.current)
    }

    const clear = () => {
        clearTimeout(timeoutRef.current)
    }

    const reset = () => {
        clear()
        set()
    }

    return [ set, clear, reset ]
}