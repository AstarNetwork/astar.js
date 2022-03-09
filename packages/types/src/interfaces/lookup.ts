// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup11: pallet_System::pallet::Call
   **/
  PalletSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_changes_trie_config: {
        changesTrieConfig: 'Option<ChangesTrieConfiguration>',
      },
      set_storage: {
        items: 'Vec<KeyValue>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Key>',
      },
      kill_prefix: {
        prefix: 'Key',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup17: pallet_System::pallet::Error
   **/
  PalletSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount']
  },
  /**
   * Lookup22: pallet_System::pallet::Event
   **/
  PalletSystemEvent: {
    _enum: {
      ExtrinsicSuccess: 'DispatchInfo',
      ExtrinsicFailed: '(DispatchError,DispatchInfo)',
      CodeUpdated: 'Null',
      NewAccount: 'AccountId',
      KilledAccount: 'AccountId',
      Remarked: '(AccountId,Hash)'
    }
  },
  /**
   * Lookup34: pallet_Utility::pallet::Call
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup35: pallet_Utility::pallet::Error
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup36: pallet_Utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: '(u32,DispatchError)',
      BatchCompleted: 'Null',
      ItemCompleted: 'Null'
    }
  },
  /**
   * Lookup46: pallet_Identity::pallet::Call
   **/
  PalletIdentityCall: {
    _enum: {
      add_registrar: {
        account: 'AccountId',
      },
      set_identity: {
        info: 'IdentityInfo',
      },
      set_subs: {
        subs: 'Vec<(AccountId,Data)>',
      },
      clear_identity: 'Null',
      request_judgement: {
        regIndex: 'Compact<RegistrarIndex>',
        maxFee: 'Compact<BalanceOf>',
      },
      cancel_request: {
        regIndex: 'RegistrarIndex',
      },
      set_fee: {
        index: 'Compact<RegistrarIndex>',
        fee: 'Compact<BalanceOf>',
      },
      set_account_id: {
        _alias: {
          new_: 'new',
        },
        index: 'Compact<RegistrarIndex>',
        new_: 'AccountId',
      },
      set_fields: {
        index: 'Compact<RegistrarIndex>',
        fields: 'IdentityFields',
      },
      provide_judgement: {
        regIndex: 'Compact<RegistrarIndex>',
        target: 'LookupSource',
        judgement: 'IdentityJudgement',
      },
      kill_identity: {
        target: 'LookupSource',
      },
      add_sub: {
        sub: 'LookupSource',
        data: 'Data',
      },
      rename_sub: {
        sub: 'LookupSource',
        data: 'Data',
      },
      remove_sub: {
        sub: 'LookupSource',
      },
      quit_sub: 'Null'
    }
  },
  /**
   * Lookup48: pallet_Identity::pallet::Error
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned']
  },
  /**
   * Lookup50: pallet_Identity::pallet::Event
   **/
  PalletIdentityEvent: {
    _enum: {
      IdentitySet: 'AccountId',
      IdentityCleared: '(AccountId,Balance)',
      IdentityKilled: '(AccountId,Balance)',
      JudgementRequested: '(AccountId,RegistrarIndex)',
      JudgementUnrequested: '(AccountId,RegistrarIndex)',
      JudgementGiven: '(AccountId,RegistrarIndex)',
      RegistrarAdded: 'RegistrarIndex',
      SubIdentityAdded: '(AccountId,AccountId,Balance)',
      SubIdentityRemoved: '(AccountId,AccountId,Balance)',
      SubIdentityRevoked: '(AccountId,AccountId,Balance)'
    }
  },
  /**
   * Lookup56: pallet_Timestamp::pallet::Call
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<Moment>'
      }
    }
  },
  /**
   * Lookup64: pallet_Multisig::pallet::Call
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId>',
        maybeTimepoint: 'Option<Timepoint>',
        call: 'OpaqueCall',
        storeCall: 'bool',
        maxWeight: 'Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId>',
        maybeTimepoint: 'Option<Timepoint>',
        callHash: '[u8;32]',
        maxWeight: 'Weight',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId>',
        timepoint: 'Timepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup65: pallet_Multisig::pallet::Error
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup68: pallet_Multisig::pallet::Event
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: '(AccountId,AccountId,CallHash)',
      MultisigApproval: '(AccountId,Timepoint,AccountId,CallHash)',
      MultisigExecuted: '(AccountId,Timepoint,AccountId,CallHash,DispatchResult)',
      MultisigCancelled: '(AccountId,Timepoint,AccountId,CallHash)'
    }
  },
  /**
   * Lookup72: pallet_EthCall::pallet::Call
   **/
  PalletEthCallCall: {
    _enum: {
      call: {
        call: 'Call',
        account: 'AccountId',
        signature: 'Bytes'
      }
    }
  },
  /**
   * Lookup73: pallet_EthCall::pallet::Error
   **/
  PalletEthCallError: {
    _enum: ['DecodeFailure', 'InvalidSignature']
  },
  /**
   * Lookup74: pallet_EthCall::pallet::Event
   **/
  PalletEthCallEvent: {
    _enum: {
      Executed: '(AccountId,DispatchResult)'
    }
  },
  /**
   * Lookup78: pallet_ParachainSystem::pallet::Call
   **/
  PalletParachainSystemCall: {
    _enum: {
      set_upgrade_block: {
        relayChainBlock: 'RelayChainBlockNumber',
      },
      set_validation_data: {
        data: 'ParachainInherentData',
      },
      sudo_send_upward_message: {
        message: 'UpwardMessage',
      },
      authorize_upgrade: {
        codeHash: 'Hash',
      },
      enact_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup79: pallet_ParachainSystem::pallet::Error
   **/
  PalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup80: pallet_ParachainSystem::pallet::Event
   **/
  PalletParachainSystemEvent: {
    _enum: {
      ValidationFunctionStored: 'RelayChainBlockNumber',
      ValidationFunctionApplied: 'RelayChainBlockNumber',
      UpgradeAuthorized: 'Hash',
      DownwardMessagesReceived: 'u32',
      DownwardMessagesProcessed: '(Weight,Hash)'
    }
  },
  /**
   * Lookup93: pallet_Balances::pallet::Call
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'LookupSource',
        value: 'Compact<Balance>',
      },
      set_balance: {
        who: 'LookupSource',
        newFree: 'Compact<Balance>',
        newReserved: 'Compact<Balance>',
      },
      force_transfer: {
        source: 'LookupSource',
        dest: 'LookupSource',
        value: 'Compact<Balance>',
      },
      transfer_keep_alive: {
        dest: 'LookupSource',
        value: 'Compact<Balance>',
      },
      transfer_all: {
        dest: 'LookupSource',
        keepAlive: 'bool'
      }
    }
  },
  /**
   * Lookup94: pallet_Balances::pallet::Error
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup96: pallet_Balances::pallet::Event
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: '(AccountId,Balance)',
      DustLost: '(AccountId,Balance)',
      Transfer: '(AccountId,AccountId,Balance)',
      BalanceSet: '(AccountId,Balance,Balance)',
      Deposit: '(AccountId,Balance)',
      Reserved: '(AccountId,Balance)',
      Unreserved: '(AccountId,Balance)',
      ReserveRepatriated: '(AccountId,AccountId,Balance,BalanceStatus)'
    }
  },
  /**
   * Lookup101: pallet_Vesting::pallet::Call
   **/
  PalletVestingCall: {
    _enum: {
      vest: 'Null',
      vest_other: {
        target: 'LookupSource',
      },
      vested_transfer: {
        target: 'LookupSource',
        schedule: 'VestingInfo',
      },
      force_vested_transfer: {
        source: 'LookupSource',
        target: 'LookupSource',
        schedule: 'VestingInfo'
      }
    }
  },
  /**
   * Lookup102: pallet_Vesting::pallet::Error
   **/
  PalletVestingError: {
    _enum: ['NotVesting', 'ExistingVestingSchedule', 'AmountLow']
  },
  /**
   * Lookup103: pallet_Vesting::pallet::Event
   **/
  PalletVestingEvent: {
    _enum: {
      VestingUpdated: '(AccountId,Balance)',
      VestingCompleted: 'AccountId'
    }
  },
  /**
   * Lookup105: pallet_Authorship::pallet::Call
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<Header>'
      }
    }
  },
  /**
   * Lookup106: pallet_Authorship::pallet::Error
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup108: pallet_CollatorSelection::pallet::Call
   **/
  PalletCollatorSelectionCall: {
    _enum: {
      set_invulnerables: {
        _alias: {
          new_: 'new',
        },
        new_: 'Vec<AccountId>',
      },
      set_desired_candidates: {
        max: 'u32',
      },
      set_candidacy_bond: {
        bond: 'BalanceOf',
      },
      register_as_candidate: 'Null',
      leave_intent: 'Null'
    }
  },
  /**
   * Lookup109: pallet_CollatorSelection::pallet::Error
   **/
  PalletCollatorSelectionError: {
    _enum: ['TooManyCandidates', 'TooFewCandidates', 'Unknown', 'Permission', 'AlreadyCandidate', 'NotCandidate', 'AlreadyInvulnerable', 'NoAssociatedValidatorId', 'ValidatorNotRegistered']
  },
  /**
   * Lookup110: pallet_CollatorSelection::pallet::Event
   **/
  PalletCollatorSelectionEvent: {
    _enum: {
      NewInvulnerables: 'Vec<AccountId>',
      NewDesiredCandidates: 'u32',
      NewCandidacyBond: 'Balance',
      CandidateAdded: '(AccountId,Balance)',
      CandidateRemoved: 'AccountId'
    }
  },
  /**
   * Lookup113: pallet_Session::pallet::Call
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Keys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup114: pallet_Session::pallet::Error
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup116: pallet_Session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: 'SessionIndex'
    }
  },
  /**
   * Lookup124: pallet_CumulusXcm::pallet::Call
   **/
  PalletCumulusXcmCall: 'Null',
  /**
   * Lookup127: pallet_CumulusXcm::pallet::Event
   **/
  PalletCumulusXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;8]',
      UnsupportedVersion: '[u8;8]',
      ExecutedDownward: '([u8;8],Outcome)'
    }
  },
  /**
   * Lookup128: pallet_Sudo::pallet::Call
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'Weight',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'LookupSource',
      },
      sudo_as: {
        who: 'LookupSource',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup129: pallet_Sudo::pallet::Error
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup130: pallet_Sudo::pallet::Event
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: 'DispatchResult',
      KeyChanged: 'AccountId',
      SudoAsDone: 'DispatchResult'
    }
  }
};
