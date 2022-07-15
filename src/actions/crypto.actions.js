import BaseActions from '@actions/base-actions'
import cryptoReducer from '@reducers/crypto.reducer'

class CryptoActions extends BaseActions {
  setCrypto(crypto) {
    return async (dispatch) => {
      dispatch(this.setValue('selectedCrypto', crypto))
    }
  }

  setTicketPrice(price) {
    return async (dispatch) => {
      dispatch(this.setValue('ticketPrice', price))
    }
  }
}

export default new CryptoActions(cryptoReducer)