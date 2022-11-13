export interface ICurrency {
  symbol: string,
	name: string,
	symbol_native: string,
	decimal_digits: number,
	rounding: number,
	code: string,
	name_plural: string
}

export interface IDetailData {
  from: string,
  to: string,
  amount: number,
  fullName: string,
  exchangeRate: number
}

export interface IFollow {
  followCount: number,
  id: string
}
