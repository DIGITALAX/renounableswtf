import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

import cryptoActions from '@actions/crypto.actions'
import {
  closeCryptoOptionsModal,
  openPurchaseSuccessModal
} from '@actions/modals.actions'

import { 
  getSelectedCrypto,
} from '@selectors/crypto.selectors'

import useERC20Approve from '@hooks/useERC20Approve'

import Button from '@components/Button'
import Modal from '@components/modal'

const cryptoList = [
  {
    name: 'matic',
    label: 'MATIC'
  },
  {
    name: 'mona',
    label: 'MONA'
  },
  {
    name: 'weth',
    label: 'ETH'
  },
  {
    name: 'usdt',
    label: 'USDT'
  }
]


const ModalCryptoOptions = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { approved, approveFunc, purchaseOffer } = useERC20Approve(ethers.utils.parseEther("20000000000"))

  const selectedCrypto = useSelector(getSelectedCrypto)

  const handleClose = () => {
    dispatch(closeCryptoOptionsModal())
  }

  useEffect(() => {
    if (window.localStorage.getItem('CRYPTO_OPTION')) {
      dispatch(cryptoActions.setCrypto(window.localStorage.getItem('CRYPTO_OPTION') || ''))
    }
  }, [])

  const onCryptoOptionSelect = option => {
    if (!loading) {
      dispatch(cryptoActions.setCrypto(option))
      window.localStorage.setItem('CRYPTO_OPTION', option.toString())
    }
  }

  const onApprove = async () => {
    if (!approved) {
      try {
        setLoading(true)
        await approveFunc()
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
        throw err
      }
    } else {
      setLoading(true)
      const { promise, unsubscribe } = await purchaseOffer()

      await promise
      .then(async (hash) => {
        console.log('this is after calling buy offer')
        unsubscribe()
        setLoading(false)
        dispatch(closeCryptoOptionsModal())
        dispatch(openPurchaseSuccessModal())
      })
      .catch(async (err) => {
        console.log(err)
        unsubscribe()
        setLoading(false)
        dispatch(closeCryptoOptionsModal())
        toast(err.message)
      })
    }
  }

  return (
    <>
      {createPortal(
        <Modal onClose={() => handleClose()} className='bg-black max-w-lg'>
          <div className='flex flex-col items-center'>
            <p className='text-center text-2xl mt-4'>CHOOSE PAYMENT TOKEN</p>
            <div className='flex flex-row justify-center items-center flex-wrap gap-3 md:gap-6 mt-4 w-4/5'>
              {
                cryptoList.map(cryptoItem => {
                  const { name, label } = cryptoItem
                  return (
                    <div
                      className={`cryptoIcon ${
                        selectedCrypto === name && 'selected'
                      } ${loading && 'disabled'}`}
                      onClick={() => onCryptoOptionSelect(name)}
                      key={name}
                    >
                      <img src={`/images/cryptos/options/${name}.png`} className='m-auto' />
                      <span className='text-xs'> { label } </span>
                    </div>
                  )
                })
              }
            </div>

            <Button
              className='bg-black flex justify-center text-white w-28 mt-5'
              onClick={onApprove}
              disabled={!cryptoList.length}
              loading={loading}
            >
              {!approved ? 'Approve' : 'Mint'}
            </Button>
          </div>
        </Modal>,
        document.body
      )}
    </>
  )
}

export default ModalCryptoOptions
