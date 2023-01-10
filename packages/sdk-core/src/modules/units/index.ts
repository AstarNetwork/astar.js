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

/**
 * Formats number and adds weight prefix e.g. 10000 formats to 10k
 * @param value Value to format
 * @param digits Number of decimal places
 * @returns Formated number
 */
export const formatNumber = (value: number, digits: number): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return value >= item.value;
    });

  return item ? (value / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
