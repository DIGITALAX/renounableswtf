import { createModule } from 'redux-modules'
import cloneDeep from 'lodash.clonedeep'
import { Map } from 'immutable'

const DEFAULT_FIELDS = Map({
  isShowModalNoMetamask: false,

  isShowModalConnectMetamask: false,
  isShowModalPlaceBid: false,
  isShowModalRaiseBid: false,
  isShowModalWithdrawBid: false,
  isShowModalSignup: false,
  isShowBuyNow: false,
  isShowPreviewMaterial: false,
  isSwitchNetwork: false,
  isShowModalCryptoOptions: false,
  isPurchaseSuccess: false,
  params: null
})


export default createModule({
  name: 'modals',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setValue: {
      reducer: (state, { payload }) => {
        state = state.set(payload.field, payload.value)
        return state
      }
    }
  }
})
