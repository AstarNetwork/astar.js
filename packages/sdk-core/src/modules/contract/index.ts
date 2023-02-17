import { ContractPromise } from '@polkadot/api-contract';
import { ApiPromise } from '@polkadot/api';
import type { WeightV2 } from '@polkadot/types/interfaces';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { BN } from '@polkadot/util';

const BN_TWO = new BN(2);

const estimateGas = (api: ApiPromise, gasRequired: WeightV2) => {
  const estimatedGas = api.registry.createType(
    'WeightV2',
    {
      refTime: gasRequired.refTime.toBn().mul(BN_TWO),
      proofSize: gasRequired.proofSize.toBn().mul(BN_TWO)
    }
  ) as WeightV2;

  return estimatedGas;
};

export const sendTransaction = async (api: ApiPromise, contract: ContractPromise, method: string, address: string, value: string | number | bigint | BN | undefined, ...args: any[]): Promise<SubmittableExtrinsic<'promise'>> => {
  const result = await contract.query[method](
    address,
    {
      gasLimit: api.registry.createType(
        'WeightV2',
        {
          refTime: '500000000000',
          proofSize: '5242880'
        }
      ) as WeightV2,
      storageDepositLimit: null,
      value
    }
  );

  if (result.result.isErr) {
    throw result;
  }

  if (result.result.isOk) {
    const flags = result.result.asOk.flags.toHuman();
    if (flags.includes('Revert')) {
      throw result;
    }
  }

  const estimatedGas = estimateGas(api, result.gasRequired);

  return contract.tx[method]({
    gasLimit: estimatedGas,
    storageDepositLimit: result.storageDeposit.isCharge ? result.storageDeposit.asCharge : null,
    value
  }, ...args);
};
