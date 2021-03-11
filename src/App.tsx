import React, { useEffect, useState } from 'react';
import './App.scss';
import AlphaVantageService from './axios/AlphaVantage-Service';
import Input from './components/Input/Input';
import StockView from './views/StockView/StockView';
import { SymbolOverview, TimeSeriesData } from './models/AlphaVantage.model';
import { Col, Container, Row } from 'react-bootstrap';

let service = new AlphaVantageService(process.env.REACT_APP_ALPHA_VANTAGE_KEY);

function App() {
  const [stockSymbol, setStockSymbol] = useState('');

  const [stockOverview, setStockOverview] = useState<SymbolOverview>();
  const [stockData, setStockData] = useState<TimeSeriesData>();
  // const [error, setError] = useState(false);

  useEffect(() => {
    if (!stockSymbol.length) {
      return;
    }

    const getData = async () => {
      const overview = await service.fetchOverview(stockSymbol);
      setStockOverview(overview);
      const data = await service.fetchTimeSeries(stockSymbol);
      setStockData(data);
    }

    getData();

  }, [stockSymbol]);

  let view = null;
  if (stockOverview && stockData) {
    view = (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} xl={6}>
            <StockView overview={stockOverview} timeSeriesData={stockData} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <header className="App-header">
        <h1>React Street Bets</h1>
        <p>A simple application to demonstrate working with React, an API, and D3.js</p>
        <Input value={stockSymbol} valueUpdated={setStockSymbol} isValid={true} />
      </header>
      {view}
    </div>
  );
}

export default App;
