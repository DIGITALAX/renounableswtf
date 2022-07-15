import React from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'

import Modal from '@components/modal'
import Button from '@components/Button'

import { closeSwitchNetworkModal } from '@actions/modals.actions'
import { requestSwitchNetwork } from '@services/network.service'

import styles from './styles.module.scss'

const SwitchNetworkModal = () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeSwitchNetworkModal())
  }

  const handleClick = async () => {
    const res = await requestSwitchNetwork()
    dispatch(closeSwitchNetworkModal())
  }

  return (
    <>
      {createPortal(
        <Modal
          onClose={() => handleClose()}
          title={'Please Switch to Polygon Network!'}
          titleStyle={styles.textCenter}
          className='max-w-lg'
        >
          <div className={styles.footer}>
            <p className={styles.footerCaption}>
              <span>
                Make sure you are connected to Polygon Mainnet and try again.
              </span>
            </p>
            <div className={styles.selectWrapper}>
              <Button
                background="black"
                onClick={() => handleClick()}
                className={styles.button}
              >
                SWITCH NETWORK
              </Button>
            </div>
          </div>
        </Modal>,
        document.body,
      )}
    </>
  )
}

export default SwitchNetworkModal
