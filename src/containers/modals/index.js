import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import ModalConnectWallet from '@containers/modals/modal-connect-wallet'
import ModalSignup from '@containers/modals/modal-sign-up'
import ModalSuccess from '@containers/modals/modal-gen-success'
import PreviewMaterial from '@containers/modals/preview-material'
import ModalCryptoOptions from './modal-crypto-options'
import PurchaseSuccess from './purchase-success'
import SwitchNetworkModal from './switch-network'
import ModalConnectMatic from './modal-connect-matic'

const Modals = () => {
  const modals = useSelector((state) => state.modals.toJS())
  const {
    isShowModalConnectMetamask,
    isShowModalSignup,
    isShowModalSuccess,
    isShowPreviewMaterial,
    isShowModalConnectMatic,
    isSwitchNetwork,
    isShowModalCryptoOptions,
    isPurchaseSuccess
  } = modals

  return (
    <>
      {isShowModalConnectMetamask && <ModalConnectWallet />}
      {isShowModalSignup && <ModalSignup />}
      {isShowModalSuccess && <ModalSuccess />}
      {isShowPreviewMaterial && <PreviewMaterial />}
      {isShowModalConnectMatic && <ModalConnectMatic />}
      {isSwitchNetwork && <SwitchNetworkModal />}
      {isShowModalCryptoOptions && <ModalCryptoOptions />}
      {isPurchaseSuccess && <PurchaseSuccess />}

    </>
  )
}

export default memo(Modals)
