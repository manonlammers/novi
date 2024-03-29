import React, { useRef, useState, cloneElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import useOutsideClick from 'hooks/useOutsideClick'
import styles from './Dropdown.module.scss'

const Dropdown = ({
    trigger = null,
    menu = [],
    top = null,
    right = null,
    bottom = null,
    left = null
}) => {
    const dropdownRef = useRef()

    const [open, setOpen] = useState(false)

    useOutsideClick(dropdownRef?.current, () => {
        setOpen(false)
    })

    const handleOpen = (e) => {
        e.stopPropagation()
        setOpen(!open)
    }

    return (
        <div ref={dropdownRef} className={styles.dropdown}>
            {cloneElement(trigger, {
                onClick: (e) => {
                    e.stopPropagation()
                    setOpen(!open)
                },
                className: cx(styles.trigger, {
                    [trigger.props.className]: trigger.props.className
                })
            })}
            {open && (
                <div className={styles.menuWrapper} style={{ top, right, bottom, left }}>
                    <ul className={styles.menu}>
                        {menu.map((menuItem, index) => (
                            <li key={index} onClick={handleOpen}>
                                {cloneElement(menuItem, { className: styles.menuItem })}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

Dropdown.propTypes = {
    trigger: PropTypes.any,
    menu: PropTypes.array,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
}

export default Dropdown
