import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Modal from '@components/modal'
import { closeNotInstalledMetamask } from '@actions/modals.actions'

const ModalConnectWallet = ({ title }) => {
  const dispatch = useDispatch()
    const handleClose = () => {
    dispatch(closeNotInstalledMetamask())
  }

  return (
    <>
      {createPortal(
        <Modal onClose={() => handleClose()} title={title} className='flex flex-col items-center max-w-md'>
          Please install the metamask to continue.
        </Modal>,
        document.body
      )}
    </>
  )
}

ModalConnectWallet.propTypes = {
  title: PropTypes.string
}

ModalConnectWallet.defaultProps = {
  title: 'Connect Wallet'
}

export default ModalConnectWallet
