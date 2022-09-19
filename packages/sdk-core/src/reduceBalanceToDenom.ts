import BN from 'bn.js';

export const ASTAR_SS58_FORMAT = 5;
export const ASTAR_DECIMALS = 18;

/**
 * A helper function to convert the given node balance value into the given chain token decimal point as a string.
 * EX: `femto` -> `PLM`
 * @param bal the account balance in the minimum denominator
 * @param decimal the decimal point it should convert to
 * @returns the reduced value in string number
 */
export const reduceBalanceToDenom = (bal: BN, decimal: number): string => {
  const decPoint = new BN(10).pow(new BN(decimal));
  const formatted = bal.div(decPoint);
  return formatted.toString();
};
