import axios from 'axios';
import { BN } from '@polkadot/util';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { TransactionCall } from 'web3-types';
import { ApiGasNow, GasPrice, GAS_API_URL } from '../index';
import { astarChain } from '../../config';

export const getEvmGas = async (web3: Web3, selectedGasPrice: string): Promise<string> => {
  const gasPriceFallback = await web3.eth.getGasPrice();
  const gasPrice = selectedGasPrice !== '0' ? selectedGasPrice : gasPriceFallback.toString();
  return gasPrice;
};

export const getEvmGasCost = async ({ isNativeToken,
  evmGasPrice,
  fromAddress,
  toAddress,
  web3,
  value,
  encodedData }: {
  isNativeToken: boolean;
  evmGasPrice: GasPrice;
  fromAddress: string;
  web3: Web3;
  toAddress: string;
  value: string;
  encodedData?: string;
}): Promise<GasPrice> => {
  const tx: TransactionCall = isNativeToken
    ? {
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther(value).toString()
    }
    : {
      nonce: await web3.eth.getTransactionCount(fromAddress),
      from: fromAddress,
      to: toAddress,
      value,
      data: encodedData
    };

  const numEstimatedGas = await web3.eth.estimateGas(tx);
  const estimatedGas = new BN(numEstimatedGas.toString());
  const data = {
    ...evmGasPrice,
    slow: ethers.utils.formatEther(estimatedGas.mul(new BN(evmGasPrice.slow)).toString()),
    average: ethers.utils.formatEther(estimatedGas.mul(new BN(evmGasPrice.average)).toString()),
    fast: ethers.utils.formatEther(estimatedGas.mul(new BN(evmGasPrice.fast)).toString())
  };

  return data;
};

export const formatTip = (fee: string): string => {
  const price = ethers.utils.formatEther(fee);
  // Memo: throw an error whenever provided price is too way expensive
  if (Number(price) > 1) {
    throw Error('Calculated tip amount is more than 1 ASTR/SDN');
  }
  return price;
};

export const fetchTipPrice = async ({ network }: { network: string }): Promise<{ nativeTipPrice: GasPrice }> => {
  try {
    const url = `${GAS_API_URL}/gasnow?network=${network}`;
    const { data } = await axios.get<ApiGasNow>(url);
    if (!data || data.code !== 200) {
      throw Error('something went wrong');
    }
    const { tip } = data.data;
    const nativeTipPrice = {
      slow: formatTip(tip.slow),
      average: formatTip(tip.average),
      fast: formatTip(tip.fast)
    };

    return {
      nativeTipPrice
    };
  } catch (error) {
    if (network.toLowerCase() !== astarChain.DEVELOPMENT.toLowerCase()) {
      console.error(error);
    }

    const nativeTipPrice = {
      slow: formatTip('10000000000000'),
      average: formatTip('50000000000000'),
      fast: formatTip('5000000000000000')
    };
    return { nativeTipPrice };
  }
};
