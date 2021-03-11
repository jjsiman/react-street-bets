export interface SymbolOverview extends AlphaVantageResponse {
  Symbol: string;
  AssetType: string;
  Name: string;
  FullTimeEmployees: number;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: number;
  DividendYield: number;
  PERatio: number;
  EPS: number;
  FiscalYearEnd: string;
  EBITDA: number;
  '52WeekHigh': number;
  '52WeekLow': number;
}

export interface TimeSeriesData {
  [key: string]: TimeSeries | TimeSeriesMetadata
}

export interface TimeSeriesMetadata {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
}

export interface TimeSeries {
  [key: string]: IntervalData;
}

export interface IntervalData {
  '1. open': number,
  '2. high': number,
  '3. low': number,
  '4. close': number,
  '5. volume': number,
}

export interface AlphaVantageResponse {
  Note?: string;
  'Error Message'?: string;
}

export enum TIME_SERIES_INTERVAL {
  One = '1min',
  Five = '5min',
  Fifteen = '15min',
  Thirty = '30min',
  Sixty = '60min'
}

export type API_ERROR<T> = {
  error: string;
  data: T;
}
