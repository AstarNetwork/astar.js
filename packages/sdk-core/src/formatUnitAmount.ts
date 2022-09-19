/**
 * Remove the unnecessary decimals such as '.000' that comes from `<Balance>.toHuman()`
 * @param amountWithUnit eg: '100.0000 SDN'
 * @returns '100 SDN'
 */
export const formatUnitAmount = (amountWithUnit: string): string => {
  const words = amountWithUnit.split(' ');
  if (words.length === 0) {
    return '';
  }
  const value = Number(words[0]);
  const unit = words[1] || '';
  const formattedAmount = `${value} ${unit}`;
  return formattedAmount;
};
