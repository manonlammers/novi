import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Typography.module.scss'

const VARIANT_TO_HTML_ELEMENT_MAP = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    button: 'span',
    caption: 'span'
}

const Typography = ({
    variant = 'body1',
    className = null,
    children = null,
    gutterBottom = true,
    ...props
}) => {
    const elementType = VARIANT_TO_HTML_ELEMENT_MAP[variant]
    if (!elementType) {
        return null
    }

    return createElement(
        elementType,
        {
            className: cx(styles[variant], {
                [styles.gutterBottom]: gutterBottom,
                [className]: className
            }),
            ...props
        },
        children
    )
}

Typography.propTypes = {
    variant: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption'
    ]),
    className: PropTypes.string,
    children: PropTypes.node,
    gutterBottom: PropTypes.bool
}

export default Typography
