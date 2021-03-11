import axios, { AxiosResponse } from 'axios';
import MOCK_OVERVIEW from '../mocks/overview_mock.json';
import MOCK_TIME_SERIES from '../mocks/time_series_mock.json';
import { AlphaVantageResponse, SymbolOverview, TimeSeriesData, TIME_SERIES_INTERVAL } from '../models/AlphaVantage.model';

export const instance = axios.create({
  baseURL: 'https://www.alphavantage.co',
});

class StockDataService {
  readonly MOCK_SYMBOL = 'IBM';
  
  readonly API_KEY: string;
  
  constructor(apiKey: string | undefined) {
    this.API_KEY = apiKey || '';
  }
  
  /**
   * Fetch general company information.
   * @param stockSymbol 
   */
  async fetchOverview(stockSymbol: string): Promise<SymbolOverview> {
    let result: AxiosResponse<AlphaVantageResponse>;
    try {
      result = await instance.get<AlphaVantageResponse>('/query', {
        params: {
          function: 'OVERVIEW',
          symbol: stockSymbol,
          apikey: this.API_KEY
        }
      });
      
    } catch (err) {
      result = err;
    }

    return await this.handleResponse<SymbolOverview>(result, MOCK_OVERVIEW);
  }
  
  /**
   * Fetch time series data for a given stock symbol.
   * @param stockSymbol 
   * @param interval 
   */
  async fetchTimeSeries(stockSymbol: string, interval: string = TIME_SERIES_INTERVAL.Five): Promise<TimeSeriesData> {
    let result: AxiosResponse<AlphaVantageResponse>;
    
    try {
      result = await instance.get<AlphaVantageResponse>('/query', {
        params: {
          symbol: stockSymbol,
          function: 'TIME_SERIES_INTRADAY',
          interval: interval,
          apikey: this.API_KEY
        }
      });
    }
    catch (err) {
      result = err;
    }
      
    return await this.handleResponse<TimeSeriesData>(result, MOCK_TIME_SERIES);
  }
  
  /**
   * Handle the API call response. 
   * 
   * Once the rate limit has been reached, the response will contain a Note.
   * Respond with the sample data instead to ensure a data response for the demo.
   * 
   * @param response 
   * @param mock 
   */
  private async handleResponse<T>(response: AxiosResponse<AlphaVantageResponse>, mock: any): Promise <T> {
    if (response.data.Note) {
      return mock;
    }
    
    if (response.data['Error Message']) {
      throw new Error(response.data['Error Message']);
    }
    return await Promise.resolve(response.data as T);
  }
}

export default StockDataService;