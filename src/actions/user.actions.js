import Router from 'next/router'

import {
  openNotInstalledMetamask
} from '@actions/modals.actions'
import globalActions from '@actions/global.actions'
import {
  STORAGE_TOKEN,
  STORAGE_WALLET,
} from '@constants/storage.constants'
import { WALLET_METAMASK } from '@constants/global.constants'
import userReducer from '@reducers/user.reducer'
import { isMetamaskInstalled } from '@services/metamask.service'
import { setWeb3Provider } from '@services/web3-provider.service'
import BaseActions from './base-actions'

class UserActions extends BaseActions {
  tryToConnect(source) {
    return async (dispatch) => {
      localStorage.setItem(STORAGE_WALLET, source)
      await setWeb3Provider()
      
      if (source === WALLET_METAMASK) {
        if (!isMetamaskInstalled()) {
          dispatch(openNotInstalledMetamask())
          console.log('METAMASK WAS NOT DETECTED ON TRY TO LOGIN')
          return
        }

        const { ethereum } = window

        try {
          const [account] = await ethereum.request({
            method: 'eth_requestAccounts',
          })

          if (!account) {
            console.error('Account is epmty.')
            return
          }

          console.log('account: ', account)
          localStorage.setItem('account', account)
          dispatch(this.setValue('account', account))
          // dispatch(openSignupModal())
          dispatch(globalActions.initApp())
        } catch (e) {
          console.error(e.message)
        }
      }
    }
  }

  tryToDisconnect() {
    return async (dispatch) => {
      localStorage.removeItem(STORAGE_TOKEN)
      localStorage.removeItem('account')
      Router.push('/')
    }
  }

  checkStorageAuth() {
    return async (dispatch) => {
      await setWeb3Provider()
      dispatch(this.setValue('account', localStorage.getItem('account')))
    }
  }
}

export default new UserActions(userReducer)
