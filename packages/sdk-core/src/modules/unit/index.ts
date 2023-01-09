import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { isString } from '@polkadot/util';
import BN from 'bn.js';

export const ASTAR_SS58_FORMAT = 5;
export const ASTAR_DECIMALS = 18;

const strToBig = (str: string): BigNumber => BigNumber.from(str.toString());

/**
 * Convert the given value into the given token decimal point WITHOUT losing decimals.
 * @param value eg: value.toString() -> '12999999999999000000'
 * @param decimal eg: 18
 * @returns '12.999999999999'
 */
export const defaultAmountWithDecimals = (value: BN | BigNumber | string, decimal: number): string => {
  if (isString(value)) {
    const hexValue = strToBig(value);
    return formatFixed(hexValue, decimal);
  }

  const bigValue = strToBig(value.toString());
  return formatFixed(bigValue, decimal);
};

// it's varient based on decimal from network metadata
export const defaultUnitIndex = 5;
const arrUnitPrefixes = [-15, -12, -9, -6, -3, 0, 3, 6, 9, 12];
const arrUnitNames = ['femto', 'pico', 'nano', 'micro', 'milli', 'default', 'Kilo', 'Mill', 'Bill', 'Tril'];

export const setDefaultUnitName = (defaultName: string) => {
  arrUnitNames[defaultUnitIndex] = defaultName;
};

export const getUnitNames = () => {
  return arrUnitNames;
};

export const getUnit = (unitType: string) => {
  const index = arrUnitNames.findIndex((elem) => elem === unitType);
  if (index === -1) {
    return 0;
  }
  return arrUnitPrefixes[index];
};

/**
 * Convert number to K M G
 * @param num -> '1903'
 * @returns '1.903K'
 */
export const nFormatter = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};
