import { getAPIUrlByChainId } from '@services/network.service'
import { request } from 'graphql-request'
import {
  DIGITALAX_GARMENT_NFT_V2_GLOBAL_STATS,
  DIGITALAX_GARMENT_V2S,
  DIGITALAX_MARKETPLACE_V2_OFFER,
  PAYABLE_TOKEN_REQUEST,

  // For Profile Page
  DIGITALAX_GARMENTS_BY_OWNER,
  DIGITALAX_GARMENTS,
  DIGITALAX_GARMENT_V2S_BY_OWNER,
  DIGITALAX_SUBSCRIPTIONS_BY_OWNER,
  DIGITALAX_SUBSCRIPTION_COLLECTORS_BY_OWNER,
  DIGITALAX_NFT_STAKERS_BY_ADDRESS,
  DIGITALAX_GARMENT_STAKED_TOKENS_BY_ADDRESS,
  DIGITALAX_GENESIS_NFTS_BY_ADDRESS,
  DIGITALAX_GENESIS_NFTS,
  DIGITALAX_GENESIS_STAKED_TOKENS_BY_ADDRESS,
  DIGITALAX_GARMENT_V2_COLLECTION_BY_GARMENT_ID,
  PODE_NFT_V2S_BY_ADDRESS,
  PODE_NFT_V2_STAKERS_BY_ADDRESS,
  DIGITALAX_COLLETOR_V2_BY_OWNER,
  GDN_MEMBERSHIP_NFTS_BY_OWNER,
  DIGITALAX_LOOK_NFTS_BY_OWNER,
  DIGITALAX_GARMENT_V2_COLLECTIONS_BY_GARMENT_IDS,
  DIGITALAX_LOOK_GOLDEN_TICKETS_BY_OWNER,
  DIGITALAX_NFT_STAKERS_BY_GARMENTS,
  GUILD_WHITELISTED_NFT_STAKERS_BY_GARMENTS,
  GUILD_WHITELISTED_NFT_STAKERS_BY_STAKER
} from './gql.apiService'

const apiRequest = (chainId, gql, params) => request(getAPIUrlByChainId(chainId), gql, params)

export const getPayableTokenReport = async (chainId, id) => {
  return apiRequest(chainId, PAYABLE_TOKEN_REQUEST, { id })
}

export const getDigitalaxMarketplaceV2Offer = async (chainId, garmentCollection) =>
  apiRequest(chainId, DIGITALAX_MARKETPLACE_V2_OFFER, { garmentCollection })

export const getDigitalaxGarmentNftV2GlobalStats = async (chainId) =>
  apiRequest(chainId, DIGITALAX_GARMENT_NFT_V2_GLOBAL_STATS)

export  const getDigitalaxGarmentV2s = async (chainId, ids) =>
  apiRequest(chainId, DIGITALAX_GARMENT_V2S, { ids })

// For Profile Page
export  const getDigitalaxGarmentsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GARMENTS_BY_OWNER, { owner, first, lastID  })

export  const getDigitalaxGarments = async (chainId, ids, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GARMENTS, { ids, first, lastID  })

export  const getDigitalaxGarmentV2sByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GARMENT_V2S_BY_OWNER, { owner, first, lastID })
  
export  const getDigitalaxSubscriptionsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_SUBSCRIPTIONS_BY_OWNER, { owner, first, lastID })

export  const getDigitalaxSubscriptionCollectorsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_SUBSCRIPTION_COLLECTORS_BY_OWNER, { owner, first, lastID })

export  const getDigitalaxNFTStakersByOwner = async (chainId, staker, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_NFT_STAKERS_BY_ADDRESS, { staker, first, lastID  })

export  const getDigitalaxGarmentStakedTokensByOwner = async (chainId, staker, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GARMENT_STAKED_TOKENS_BY_ADDRESS, { staker, first, lastID })

export  const getDigitalaxGenesisNFTsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GENESIS_NFTS_BY_ADDRESS, { owner, first, lastID })

export  const getDigitalaxGenesisNFTs = async (chainId, ids, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GENESIS_NFTS, { ids, first, lastID })

export  const getDigitalaxGenesisStakedTokensByOwner = async (chainId, staker, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GENESIS_STAKED_TOKENS_BY_ADDRESS, { staker, first, lastID  })

export const getCollectionV2ByGarmentId = async (chainId, garmentID) =>
  apiRequest(chainId, DIGITALAX_GARMENT_V2_COLLECTION_BY_GARMENT_ID, { garmentIDs: [garmentID] })

export const getPodeNFTV2sByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, PODE_NFT_V2S_BY_ADDRESS, { owner, first, lastID })

export const getPodeNFTV2StakersByStaker = async (chainId, staker, first=1000, lastID='') =>
  apiRequest(chainId, PODE_NFT_V2_STAKERS_BY_ADDRESS, { staker, first, lastID })

export const getDigitalaxCollectorV2ByOwner = async (chainId, owner) =>
  apiRequest(chainId, DIGITALAX_COLLETOR_V2_BY_OWNER, { owner })

export const getGDNMembershipNFTsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, GDN_MEMBERSHIP_NFTS_BY_OWNER, { owner, first, lastID  })

export const getDigitalaxLookNFTsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_LOOK_NFTS_BY_OWNER, { owner, first, lastID })

export const getDigitalaxGarmentV2CollectionsByGarmentIDs = async (chainId, garmentIDs, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_GARMENT_V2_COLLECTIONS_BY_GARMENT_IDS, { garmentIDs, first, lastID })

export const getDigitalaxLookGoldenTicketsByOwner = async (chainId, owner, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_LOOK_GOLDEN_TICKETS_BY_OWNER, { owner, first, lastID })

export const getDigitalaxNFTStakersByGarments = async (chainId, garmentIDs, first=1000, lastID='') =>
  apiRequest(chainId, DIGITALAX_NFT_STAKERS_BY_GARMENTS, { garmentIDs, first, lastID })

export const getGuildWhitelistedNFTStakersByGarments = async (chainId, garmentIDs, first=1000, lastID='') =>
  apiRequest(chainId, GUILD_WHITELISTED_NFT_STAKERS_BY_GARMENTS, { garmentIDs, first, lastID })

  export const getGuildWhitelistedNFTStakersByStaker = async (chainId, staker, first=1000, lastID='') =>
  apiRequest(chainId, GUILD_WHITELISTED_NFT_STAKERS_BY_STAKER, { staker, first, lastID })


