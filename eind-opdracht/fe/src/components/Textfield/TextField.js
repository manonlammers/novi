import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Typography from 'components/Typography/Typography'
import styles from './TextField.module.scss'

function TextField ({
    label = null,
    helpText = null,
    error = null,
    disabled = false,
    name = null,
    defaultValue = '',
    type = 'text',
    className = null,
    onChange = null,
    ...props
}) {
    const [focused, setFocus] = useState(false)
    const [value, setValue] = useState(props.value || '')
    const moveLabelToTop = value !== '' || focused

    return (
        <div className={cx(styles.component, className)}>
            {label && (
                <div className={styles.labelWrapper}>
                    <Typography gutterBottom={false} className={cx(styles.label, { [styles.labelToTop]: moveLabelToTop })}>
                        {label}
                    </Typography>
                </div>
            )}
            <input
                name={name}
                value={defaultValue || value}
                type={type}
                onChange={e => {
                    if (onChange) {
                        onChange(e)
                    }

                    setValue(e.target.value)
                }}
                className={styles.input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...props}
            />
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    error: PropTypes.bool,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default TextField
