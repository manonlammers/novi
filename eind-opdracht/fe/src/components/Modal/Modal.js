import React, { useCallback, useEffect } from 'react'
import styles from './Modal.module.scss'
import Button from '../Button/Button'

import Typography from '../Typography/Typography'
function Modal ({
    show = false,
    title = '',
    children = null,
    onClose = () => {},
    onConfirm = null
}) {
    const closeOnEscapeKeyDown = useCallback((e) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose()
        }
    }, [onClose])

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)

        return function cleanup () {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }
    }, [closeOnEscapeKeyDown])

    if (!show) {
        return null
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <Typography gutterBottom={false} variant="subtitle1">{title}</Typography>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.footer}>
                    <Button onClick={onClose} className={styles.button}>Close</Button>
                    {onConfirm
                        ? (
                            <Button onClick={onConfirm}>OK</Button>
                        )
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Modal
