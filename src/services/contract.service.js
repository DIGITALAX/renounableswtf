import Web3 from 'web3'
import {
  getERC20ContractAddressByChainId
} from './network.service'

import ERC20ABI from '@constants/erc20_abi.json'

export const getERC20TokenContract = async (tokenId, chainId) => {
  const web3 = new Web3(window.ethereum)
  const address = await getERC20ContractAddressByChainId(tokenId, chainId)
  const contract = await new web3.eth.Contract(ERC20ABI, address)

  return contract
}
