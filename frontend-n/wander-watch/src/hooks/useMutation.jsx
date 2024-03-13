import { useRef, useState, useEffect, useCallback } from 'react'
import { useCounter } from './useCounter'

export function useMutation(mutationFn) {
    const mutationRef = useRef()
    const [isMutating, setMutating] = useState(false)
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)
    const {value:retries, increment} = useCounter(0)

    useEffect(() => {
        mutationRef.current = mutationFn
    }, []);

    const mutate = useCallback((params, { onSuccess, onError, onSettled }, configs = {}) => {
        setMutating(true)
        const successFn = onSuccess ?? function(){}
        const errorFn = onError ?? function(){}
        const settledFn = onSettled ?? function(){};

        mutationRef.current(params, {
            ...configs,
            // increaseRetries: () => {
            //     increment()
            // }
        })
        .then((data) => {
            setValue(data)
            successFn(data)
        })
        .catch((err) => {
            setError(err)
            errorFn(err)
        })
        .finally(() => {
            setMutating(false)
            settledFn({isMutating, value, error, retries})
        })

        return { isMutating, value, error, retries }
    }, [mutationFn])


    return { mutate, isMutating, value, error, retries }
}