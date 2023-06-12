import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'components/Modal/Modal'

export const ModalContext = createContext({})

export const useModal = () => {
    return useContext(ModalContext)
}

export const ModalProvider = ({ children }) => {
    const [state, setState] = useState({ show: false })

    const showModal = ({ title = '', children = null }) => {
        setState({
            show: true,
            title,
            children
        })
    }

    const hideModal = () => {
        setState({ show: false })
    }

    const values = {
        showModal,
        hideModal
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
            {state.show && <Modal {...state} onClose={hideModal} />}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.node
}

export default ModalProvider
