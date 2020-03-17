export const enum MarketName {
  // eslint-disable-next-line no-unused-vars
  coupang = 'coupang'
}

export function notifyBankAccountChangeByMarketName(marketName: keyof typeof MarketName) {

  marketName
}
