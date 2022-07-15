import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import ModalNoMetamask from './modal-no-metamask'
import ModalCryptoOptions from './modal-crypto-options'
import PurchaseSuccess from './purchase-success'
import SwitchNetworkModal from './switch-network'

const Modals = () => {
  const modals = useSelector((state) => state.modals.toJS())
  const {
    isShowModalNoMetamask,
    isSwitchNetwork,
    isShowModalCryptoOptions,
    isPurchaseSuccess
  } = modals

  return (
    <>
      {isShowModalNoMetamask && <ModalNoMetamask title='Metamask is not installed.' />}
      {isSwitchNetwork && <SwitchNetworkModal />}
      {isShowModalCryptoOptions && <ModalCryptoOptions />}
      {isPurchaseSuccess && <PurchaseSuccess />}

    </>
  )
}

export default memo(Modals)
