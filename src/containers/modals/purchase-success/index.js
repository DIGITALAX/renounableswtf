import React from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import Button from '@components/Button'
import Modal from '@components/modal'
import styles from './styles.module.scss'
import { closePurchaseSuccessModal } from '@actions/modals.actions'

const PurchaseSuccess = ({ className }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closePurchaseSuccessModal())
  }

  const handleClick = (mode) => {
    dispatch(closePurchaseSuccessModal())
  }

  return (
    <>
      {createPortal(
        <Modal
          onClose={() => handleClose()}
          title={'Salutations!'}
          titleStyle={styles.textCenter}
          className='bg-black max-w-lg'
        >
          <div className={styles.footer}>
            <p className={styles.footerCaption}>
                Your instructable bundle has minted! 
                <br /><br />
                This is a momentous step on your journey to seizing the memes of nounish mass proliferation. 
                <br /><br />
                <span className='text-red text-md'>
                  Make sure to verify your shipping information here to receive your printed materials and apparel. Shipping takes approx 3-4 weeks, contigent on continued global supply chain hiccups.
                </span>
            </p>
            <div className={styles.selectWrapper}>
              <Button
                background="black"
                onClick={() => handleClick()}
                className={styles.button}
              >
                OKAY!
              </Button>
            </div>
          </div>
        </Modal>,
        document.body,
      )}
    </>
  )
}

export default PurchaseSuccess
