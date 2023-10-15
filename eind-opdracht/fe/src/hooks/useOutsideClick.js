import { useEffect } from 'react'

export default function useOutsideClick (ref, onClickOut) {
    useEffect(() => {
        const onClick = ({ target }) => !ref?.contains(target) && onClickOut?.()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [onClickOut, ref])
}
