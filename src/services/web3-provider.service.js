import Web3 from 'web3'
import config from '@utils/config'

import { isMetamaskInstalled } from '@services/metamask.service'
import { WALLET_METAMASK } from '@constants/global.constants'
import { STORAGE_WALLET } from '@constants/storage.constants'

export const setWeb3Provider = async () => {
  const WALLET = localStorage.getItem(STORAGE_WALLET)
  if (WALLET === WALLET_METAMASK) {
    const provider = isMetamaskInstalled() ? window.ethereum : config.DEFAULT_WEB3_URL
    window.web3 = new Web3(provider)
    return
  }
}
