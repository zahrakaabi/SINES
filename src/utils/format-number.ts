/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages

/* -------------------------------------------------------------------------- */
/*                               GET LOCALE CODE                              */
/* -------------------------------------------------------------------------- */
type InputValue = string | number | null;
// GET LOCALE CODE FN
/*function getLocaleCode() {
  const {
    currentLang: {
      numberFormat: { code, currency },
    },
  } = getLocales();

  return {
    code: code ?? 'en-US',
    currency: currency ?? 'USD',
  };
};*/

/* -------------------------------------------------------------------------- */
/*                                  F NUMBER                                  */
/* -------------------------------------------------------------------------- */
export function fNumber(inputValue: InputValue) {
  //const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('fr-EU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
};

/* -------------------------------------------------------------------------- */
/*                                 F CURRENCY                                 */
/* -------------------------------------------------------------------------- */
export function fCurrency(inputValue: InputValue) {
  //const { code, currency } = getLocaleCode();
  const currency = 'EUR';
  
  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('fr-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
};

/* -------------------------------------------------------------------------- */
/*                                  F PERCENT                                 */
/* -------------------------------------------------------------------------- */
export function fPercent(inputValue: InputValue) {
  //const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat('fr-EU', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
};

/* -------------------------------------------------------------------------- */
/*                              F SHORTEN NUMBER                              */
/* -------------------------------------------------------------------------- */
export function fShortenNumber(inputValue: InputValue) {
  //const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('fr-EU', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
};

/* -------------------------------------------------------------------------- */
/*                                   F DATA                                   */
/* -------------------------------------------------------------------------- */
export function fData(inputValue: InputValue) {
  if (!inputValue) return '';

  if (inputValue === 0) return '0 Bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
};