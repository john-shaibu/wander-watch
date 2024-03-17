import { useRef, useState, useEffect, useCallback } from 'react'
import { useCounter } from './useCounter'

const defaultEvents = { onSuccess: function(){}, onError: function(){}, onSettled: function(){} }

export function useMutation(mutationFn, events = {}) {
    const mutationRef = useRef(null)
    const [isMutating, setMutating] = useState(false)
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)
    const {value:retries, increment} = useCounter(0)
    let globalEvents = {
        onSuccess: events.onSuccess ?? defaultEvents.onSuccess,
        onError: events.onError ?? defaultEvents.onError,
        onSettled: events.onSettled ?? defaultEvents.onSettled
    }

    useEffect(() => {
        mutationRef.current = mutationFn
    }, []);

    const mutate = useCallback((params, mutateEvents, configs = {}) => {
        setMutating(true)
        const successFn = mutateEvents?.onSuccess ?? globalEvents.onSuccess
        const errorFn = mutateEvents?.onError ?? globalEvents.onError
        const settledFn = mutateEvents?.onSettled ?? globalEvents.onSettled;

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