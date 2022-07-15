import BaseActions from '@actions/base-actions'
import userActions from '@actions/user.actions'
import globalReducer from '@reducers/global.reducer'
import { isMetamaskInstalled } from '@services/metamask.service'
import {
  getDefaultNetworkChainId,
  getEnabledNetworkByChainId,
} from '@services/network.service'

import ws from '@services/api/ws.service'

class GlobalActions extends BaseActions {

  initApp() {
    return async (dispatch) => {
      /**
       * Check installed Metamask
       */
      if (!isMetamaskInstalled()) {
        dispatch(this.changeNetwork(getDefaultNetworkChainId()))
        dispatch(this.setValue('isInitialized', true))
        return
      }

      const { ethereum } = window
      /**
       * Init subscribers
       */
      ethereum.on('accountsChanged', (accounts) => {
        const [account] = accounts
        console.log('changed account: ', account)
      })

      if (ethereum.selectedAddress) {
        dispatch(userActions.setValue('account', ethereum.selectedAddress))
      }

      ethereum.on('chainChanged', async (chainId) => {
        if (!chainId) {
          return
        }

        dispatch(this.changeNetwork(chainId))

        if (getEnabledNetworkByChainId(chainId)) {

        } else {
          console.error('Wrong network. Contracts are not deployed yet')
        }
      })
      
      dispatch(this.changeNetwork(ethereum.chainId))
      dispatch(this.setValue('isInitialized', true))

    }
  }

  changeNetwork(chainId) {
    return async (dispatch) => {
      ws.create()
      dispatch(this.setValue('chainId', chainId))
    }
  }

  setAllUsers(values) {
    return (dispatch) => {
      dispatch(this.setValue('allUsers', values));
    };
  }

}

export default new GlobalActions(globalReducer)
