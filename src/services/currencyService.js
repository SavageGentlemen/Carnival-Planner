/**
 * Caribbean & Global Multi-Currency Conversion Engine
 * Supports standard carnival economies: Trinidad (TTD), Jamaica (JMD), Barbados (BBD),
 * Eastern Caribbean (XCD), Canada (CAD), UK (GBP), Europe (EUR), and US (USD).
 */

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸', locale: 'en-US' },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad & Tobago Dollar', rate: 6.80, flag: '🇹🇹', locale: 'en-TT' },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', rate: 156.50, flag: '🇯🇲', locale: 'en-JM' },
  { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar', rate: 2.00, flag: '🇧🇧', locale: 'en-BB' },
  { code: 'XCD', symbol: 'EC$', name: 'East Caribbean Dollar', rate: 2.70, flag: '🇦🇬', locale: 'en-AG' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦', locale: 'en-CA' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧', locale: 'en-GB' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺', locale: 'de-DE' }
];

export const CURRENCY_MAP = SUPPORTED_CURRENCIES.reduce((acc, curr) => {
  acc[curr.code] = curr;
  return acc;
}, {});

export const currencyService = {
  /**
   * Convert an amount from USD base to a target currency
   */
  convertFromUSD(amountUSD, targetCurrencyCode = 'USD') {
    const num = parseFloat(amountUSD) || 0;
    const currency = CURRENCY_MAP[targetCurrencyCode] || CURRENCY_MAP.USD;
    return Number((num * currency.rate).toFixed(2));
  },

  /**
   * Format currency with symbol and localization
   */
  format(amount, currencyCode = 'USD', includeCode = false) {
    const currency = CURRENCY_MAP[currencyCode] || CURRENCY_MAP.USD;
    const num = parseFloat(amount) || 0;
    
    const formattedNum = num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (includeCode && currencyCode !== 'USD') {
      return `${currency.symbol}${formattedNum} ${currency.code}`;
    }
    return `${currency.symbol}${formattedNum}`;
  },

  /**
   * Convert and format in a single call
   */
  convertAndFormat(amountUSD, targetCurrencyCode = 'USD', includeCode = false) {
    const converted = this.convertFromUSD(amountUSD, targetCurrencyCode);
    return this.format(converted, targetCurrencyCode, includeCode);
  },

  /**
   * Get currency symbol
   */
  getSymbol(currencyCode = 'USD') {
    return CURRENCY_MAP[currencyCode]?.symbol || '$';
  },

  /**
   * Get all supported currency objects
   */
  getCurrencies() {
    return SUPPORTED_CURRENCIES;
  }
};
