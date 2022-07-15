import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'

import { formatEther } from '@ethersproject/units'

import { getAccount } from '@selectors/user.selectors'
import { getChainId } from '@selectors/global.selectors'
import {
  getSelectedCrypto,
} from '@selectors/crypto.selectors'

import {
  getERC20TokenContract,
  getMarketplaceContract
} from '@services/contract.service'

import {
  getERC20ContractAddressByChainId
} from '@services/network.service'

import config from '@utils/config'

import { POLYGON_CHAINID } from '@constants/global.constants'

import { useIsMainnet } from './useIsMainnet'
import usePollar from './usePollar'
import Web3 from 'web3'

export function useTokenAllowance() {
  const [allowance, setAllowance] = useState('0')
  const account = useSelector(getAccount)
  const isMainnet = useIsMainnet()
  const chainId = useSelector(getChainId)
  const selectedCrypto = useSelector(getSelectedCrypto)

  const selectedCryptoRef = useRef(selectedCrypto)
  selectedCryptoRef.current = selectedCrypto

  const targetAddress = config.PAYMENT_ACCEPT['matic']

  const fetchAllowance = useCallback(async () => {
    // Only Polygon is acceptable
    if (account && chainId && chainId == POLYGON_CHAINID) {
      if (selectedCryptoRef.current === 'matic') {
        setAllowance(await '10000000000')
      } else {
        // get ERC20 Token contract
        const contract = await getERC20TokenContract(selectedCryptoRef.current, chainId)

        try {
          contract && setAllowance(
            formatEther(
              await contract.methods.allowance(account, targetAddress).call({ from: account })
            )
          )
        } catch (e) {
          console.log({ e });
          throw e;
        }
      }
    }
  }, [account, chainId])

  fetchAllowance()
  usePollar(fetchAllowance)

  return allowance
}

export default function useERC20Approve(amount) {
  const account = useSelector(getAccount)
  const chainId = useSelector(getChainId)
  const selectedCrypto = useSelector(getSelectedCrypto)
  console.log('config2: ', config)
  const targetAddress = config.PAYMENT_ACCEPT['matic']

  const [approved, setApproved] = useState(false)

  const allowance = useTokenAllowance()

  useEffect(() => {
    console.log('allowance: ', parseFloat(allowance))
    console.log('amount: ', parseFloat(amount))

    if (selectedCrypto && parseFloat(allowance) >= 10000000000) {
      setApproved(true)
    } else {
      setApproved(false)
    }
  }, [amount, allowance, selectedCrypto])

  const selectedCryptoRef = useRef(selectedCrypto)
  selectedCryptoRef.current = selectedCrypto

  const approveFunc = async () => {
    if (account && chainId) {
      // get ERC20 Token contract
      const contract = await getERC20TokenContract(selectedCryptoRef.current, chainId)

      try {
        const web3 = new Web3(window.ethereum)
        const gas = await web3.eth.getGasPrice()
        contract && await contract.methods.approve(targetAddress, amount).send({ from: account, gasPrice: gas })
      } catch (e) {
        console.log({ e })
        throw e
      }      
    }
  }

  const purchaseOffer = async () => {
    if (
      selectedCrypto != 'mona' && 
      selectedCrypto != 'weth' &&
      selectedCrypto != 'usdt' &&
      selectedCrypto != 'matic'
    ) return
    
    // get Marketplace Contract
    const contract = await getMarketplaceContract(POLYGON_CHAINID)

    try {
      const web3 = new Web3(window.ethereum)
      const gas = await web3.eth.getGasPrice()
      const address = await getERC20ContractAddressByChainId(selectedCrypto, chainId)    
      
      console.log('gas price: ', gas)
      console.log('contract.methods: ', contract)
      const listener = contract.methods
        .buyOffer(
          address,
          0,
          0
        )
        .send({
          from: account,
          gasPrice: gas
        })
  
      const promise = new Promise((resolve, reject) => {
        listener.on('error', (error) => reject(error))
        listener.on('confirmation', (transactionHash) => resolve(transactionHash))
      })
  
      return {
        promise,
        unsubscribe: () => {
          listener.off('error')
          listener.off('confirmation')
        },
      }
    } catch (err) {
      console.log(err)
      throw err
    }    
  }

  console.log('selectedCrypto: ', selectedCrypto)
  console.log('approved: ', approved)
  return { approved, approveFunc, purchaseOffer }
}
