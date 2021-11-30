export default {
  rpc: {
    treeLeaves: {
      description: 'Query for the tree leaves',
      params: [
        {
          name: 'tree_id',
          type: 'u32',
          isOptional: false
        },
        {
          name: 'from',
          type: 'u32',
          isOptional: false
        },
        {
          name: 'to',
          type: 'u32',
          isOptional: false
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<[u8; 32]>'
    }
  },
  types: {
    HashFunction: {
      _enum: ['PoseidonDefault', 'PoseidonExp3', 'PoseidonExp5', 'PoseidonExp17', 'MiMC', 'Blake2', 'Sha256']
    },
    TreeId: 'u32',
    KeyId: 'u32',
    Manager: {
      accountId: 'AccountId',
      required: 'bool'
    },
    MerkleTree: {
      leaf_count: 'u32',
      max_leaves: 'u32',
      depth: 'u8',
      root_hash: 'ScalarData',
      edge_nodes: 'Vec<ScalarData>',
      hasher: 'HashFunction',
      should_store_leaves: 'bool'
    }
  },
  typesAlias: {}
};
