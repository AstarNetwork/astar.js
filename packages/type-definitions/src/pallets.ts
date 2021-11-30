export default {
  rpc: {},
  types: {
    Element: 'Vec<u8>',
    NodeTemplateRuntimeElement: 'Vec<u8>',
    // Anchor
    PalletMixerMixerMetadata: {
      creator: 'AccountId',
      deposit_size: 'Balance',
      asset: 'AssetId'
    },
    PalletAnchorAnchorMetadata: {
      creator: 'AccountId',
      deposit_size: 'Balance'
    },
    PalletAnchorEdgeMetadata: {
      src_chain_id: 'ChainId',
      root: 'Element',
      height: 'BlockNumber'
    },
    // Anchor handler
    PalletAnchorHandlerUpdateRecord: {
      tree_id: 'TreeId',
      resource_id: 'ResourceId',
      edge_metadata: 'PalletAnchorEdgeMetadata'
    },
    // AssetRegistry
    PalletAssetRegistryAssetType: {
      _enum: ['Token', 'PoolShare']
    },
    PalletAssetRegistryAssetMetadata: {
      symbol: 'Vec<u8>',
      decimals: 'u8'
    },
    ResourceId: '[u8; 32]',
    PalletAssetRegistryAssetDetails: {
      name: 'Vec<u8>',
      asset_type: 'PalletAssetRegistryAssetType',
      existential_deposit: 'Balance',
      locked: 'bool'
    },
    // primitives
    DarkwebbPrimitivesDepositDetails: {
      depositor: 'AccountId',
      deposit: 'Balance'
    }
  },
  typesAlias: {}
};
