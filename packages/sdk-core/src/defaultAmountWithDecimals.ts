import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { isString } from '@polkadot/util';
import BN from 'bn.js';

const strToBig = (str: string): BigNumber => BigNumber.from(str.toString());

/**
 * Convert the given value into the given token decimal point WITHOUT losing decimals.
 * @param value eg: value.toString() -> '12999999999999000000'
 * @param decimal eg: 18
 * @returns '12.999999999999'
 */
export const defaultAmountWithDecimals = (
  value: BN | BigNumber | string,
  decimal: number
): string => {
  if (isString(value)) {
    const hexValue = strToBig(value);
    return formatFixed(hexValue, decimal);
  }

  try {
    const hexValue = value.toJSON();
    return formatFixed(hexValue, decimal);
  } catch (error) {
    const bigValue = strToBig(value.toString());
    const hexValue = bigValue.toJSON();
    return formatFixed(hexValue, decimal);
  }
};
