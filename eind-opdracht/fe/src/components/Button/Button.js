import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Typography from '../Typography/Typography'
import styles from './Button.module.scss'

function Button ({
    color = 'primary',
    className = null,
    disabled = false,
    children = null,
    ...prop
}) {
    return (
        <button
            {...prop}
            className={cx(styles.component, className, {
                [styles[color]]: color,
                [styles.disabled]: disabled
            })}
        >
            <Typography variant="button" gutterBottom={false}>{children}</Typography>
        </button>
    )
}

Button.prototypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary']),
    disable: PropTypes.bool
}
export default Button
