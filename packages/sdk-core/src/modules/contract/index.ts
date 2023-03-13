import { ContractPromise } from '@polkadot/api-contract';
import { ApiPromise } from '@polkadot/api';
import type { WeightV2 } from '@polkadot/types/interfaces';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { BN } from '@polkadot/util';

const BN_TWO = new BN(2);
const MAX_REF_TIME = '500000000000';
const MAX_PROOF_SIZE = '5242880';

const estimateGas = (api: ApiPromise, gasRequired: WeightV2) => {
  const estimatedGas = api.registry.createType(
    'WeightV2',
    {
      refTime: gasRequired.refTime.toBn().mul(BN_TWO),
      proofSize: gasRequired.proofSize.toBn().mul(BN_TWO)
    }
  );

  return estimatedGas;
};

export const sendTransaction = async (api: ApiPromise, contract: ContractPromise, method: string, address: string, value: string | number | bigint | BN | undefined, ...args: any[]): Promise<SubmittableExtrinsic<'promise'>> => {
  const result = await contract.query[method](
    address,
    {
      gasLimit: api.registry.createType(
        'WeightV2',
        {
          refTime: MAX_REF_TIME,
          proofSize: MAX_PROOF_SIZE
        }
      ),
      storageDepositLimit: null,
      value
    },
    ...args
  );

  if (result.result.isErr) {
    let display = '';
    if (result.result.asErr.isModule) {
      const dispatchError = api.registry.findMetaError(result.result.asErr.asModule);
      display = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name;
    } else {
      display = result.result.asErr.toString();
    }

    throw new Error(display);
  }

  if (result.result.isOk) {
    const flags = result.result.asOk.flags.toHuman();
    if (flags.includes('Revert')) {
      throw new Error('Contract will be Reverted');
    }
  }

  const estimatedGas = estimateGas(api, result.gasRequired);

  return contract.tx[method]({
    gasLimit: estimatedGas,
    storageDepositLimit: result.storageDeposit.isCharge ? result.storageDeposit.asCharge : null,
    value
  }, ...args);
};
