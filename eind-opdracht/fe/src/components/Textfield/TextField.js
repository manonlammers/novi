import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Typography from 'components/Typography/Typography'
import styles from './TextField.module.scss'

function TextField ({
    label = null,
    helpText = null,
    error = false,
    name = null,
    value = '',
    type = 'text',
    className = null,
    onChange = () => {},
    ...props
}) {
    const [focused, setFocus] = useState(false)
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
                value={value}
                type={type}
                onChange={onChange}
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
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default TextField
