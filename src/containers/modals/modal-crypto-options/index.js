import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { MaxUint256 } from '@ethersproject/constants'

import cryptoActions from '@actions/crypto.actions'
import {
  closeCryptoOptionsModal,
  openPurchaseSuccessModal
} from '@actions/modals.actions'

import {
  getPayableTokenReport
} from '@services/api/apiService'

import { 
  getSelectedCrypto,
  getTicketPrice
} from '@selectors/crypto.selectors'

import useERC20Approve from '@hooks/useERC20Approve'

import {
  getERC20ContractAddressByChainId
} from '@services/network.service'

import { POLYGON_CHAINID } from '@constants/global.constants'

import { convertToWei } from '@helpers/price.helpers'

import Button from '@components/Button'
import Modal from '@components/modal'

import styles from './styles.module.scss'


const cryptoList = [
  {
    name: 'mona',
    label: 'MONA'
  },
  {
    name: 'dai',
    label: 'DAI'
  },
  {
    name: 'weth',
    label: 'ETH'
  },
  {
    name: 'bnt',
    label: 'BNT'
  },
  {
    name: 'usdt',
    label: 'USDT'
  },
  {
    name: 'w3f',
    label: 'W3F'
  },
  {
    name: 'matic',
    label: 'MATIC'
  }
]


const ModalCryptoOptions = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [cryptoPrice, setCryptoPrice] = useState(1)
  const { approved, approveFunc, sendCrypto } = useERC20Approve(MaxUint256)

  const selectedCrypto = useSelector(getSelectedCrypto)
  const ticketPrice = useSelector(getTicketPrice)

  const handleClose = () => {
    dispatch(closeCryptoOptionsModal())
  }

  const fetchCryptoPrice = async crypto => {
    if (crypto === 'usdt' || crypto === 'dai') {
      setCryptoPrice(1)
      return
    }

    const erc20ContractAddress = getERC20ContractAddressByChainId(crypto.toLowerCase(), POLYGON_CHAINID)

    const result = await getPayableTokenReport(
      POLYGON_CHAINID, erc20ContractAddress
    )

    if (!result) return
    const { payableTokenReport } = result

    if (!payableTokenReport) return

    setCryptoPrice(payableTokenReport.payload / 1e18)
  }

  useEffect(() => {
    if (window.localStorage.getItem('CRYPTO_OPTION')) {
      dispatch(cryptoActions.setCrypto(window.localStorage.getItem('CRYPTO_OPTION') || ''))
    }
  }, [])

  useEffect(() => {
    if (selectedCrypto) { 
      fetchCryptoPrice(selectedCrypto)
    }
  }, [selectedCrypto])

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
      const { promise, unsubscribe } = await sendCrypto(convertToWei(cryptoPrice * ticketPrice))

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
        <Modal onClose={() => handleClose()} className={styles.cryptoOptions}>
          <div className={styles.modalItem}>
            <p className={styles.description}> Choose A Token To Get A Ticket. </p>
            <div className={styles.cryptoList}>
              {
                cryptoList.map(cryptoItem => {
                  const { name, label } = cryptoItem
                  return (
                    <div
                      className={`${styles.cryptoIcon} ${
                        selectedCrypto === name && styles.selected
                      } ${loading && styles.disabled}`}
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
              className={styles.approveButton}
              onClick={onApprove}
              disabled={!cryptoList.length}
              loading={loading}
            >
              {!approved ? 'Approve' : 'Purchase'}
            </Button>
          </div>
        </Modal>,
        document.body
      )}
    </>
  )
}

export default ModalCryptoOptions
