import { AVAILABLE_NETWORKS } from '@constants/networks.constants';
import config from '@utils/config';

export const getEnabledNetworks = () =>
  AVAILABLE_NETWORKS.filter((network) => config.NETWORKS.includes(network.alias));

export const getEnabledNetworkByChainId = (chainId) => 
  getEnabledNetworks().find((network) => Number(network.hex) === Number(chainId));

export const requestSwitchNetwork = () => {
  window.ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x89',
          chainName: 'Matic Main Network',
          rpcUrls: ['https://matic-mainnet.chainstacklabs.com'],
          blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com']
        }
      ]
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

}

export const getDefaultNetworkChainId = () => {
  const network = AVAILABLE_NETWORKS.find((net) => net.alias === config.DEFAULT_NETWORK);

  if (!network) {
    throw new Error('Invalid DEFAULT_NETWORK: getDefaultNetworkChainId');
  }

  return network.hex;
};

const ERC20TokenAddresses = {
  mona: config.MONA_TOKEN_ADDRESSES,
  usdt: config.USDT_ADDRESS,
  weth: config.WETH_ADDRESS,
  matic: config.MATIC_ADDRESS
}

export const getERC20ContractAddressByChainId = (tokenId, chainId) => {
  const network = getEnabledNetworkByChainId(chainId)

  if (!Object.keys(ERC20TokenAddresses).find(key => key == tokenId)) return null
  return ERC20TokenAddresses[tokenId][network?.alias].toLowerCase()
}

export const getMarketplaceContractAddress = () => {
  return config.MARKETPLACE_ADDRESSES['matic']
}