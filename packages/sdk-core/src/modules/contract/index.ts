import { ContractPromise } from '@polkadot/api-contract'
import { ApiPromise, Keyring } from '@polkadot/api'
import type { WeightV2,  } from '@polkadot/types/interfaces'
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { BN } from '@polkadot/util'

const BN_TWO = new BN(2)


const estimateGas = (api: ApiPromise, gasRequired: WeightV2) => {
  const estimatedGas = api.registry.createType(
    'WeightV2',
    {
      refTime: gasRequired.refTime.toBn().mul(BN_TWO),
      proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
    }
  ) as WeightV2

  return estimatedGas
}

const getGasLimit = (api: ApiPromise): WeightV2 =>
  api.registry.createType(
    'WeightV2',
    api.consts.system.blockWeights['maxBlock']
  )

export const doTransaction = async (api: ApiPromise, contract: ContractPromise, method: string, address: string, value: string, ...args): Promise<SubmittableExtrinsic<"promise">> => {
  const gasLimit = getGasLimit(api)

  // { gasRequired, storageDeposit, result }
  const result = await contract.query[method](
    address,
    {
      gasLimit: gasLimit,
      storageDepositLimit: null,
      value
    }
  )


  if (result.result.isErr) {
    return result
  }

  if (result.result.isOk) {
    const flags = result.result.asOk.flags.toHuman()
    if (flags.includes('Revert')) {
      return result
    }
  }

  const estimatedGas = estimateGas(api, result.gasRequired)

  return contract.tx[method]({
    gasLimit: estimatedGas,
    storageDepositLimit: result.storageDeposit.isCharge ? result.storageDeposit.asCharge : null,
    value: value
  }, ...args)
}