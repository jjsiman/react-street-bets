import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import ReadMoreText from '../../components/ReadMoreText/ReadMoreText';

import { SymbolOverview, TimeSeries, TimeSeriesData } from "../../models/AlphaVantage.model"
import ChartView from './ChartView/ChartView';
import TableView from './TableView/TableView';

type StockViewProps = {
  overview: SymbolOverview,
  timeSeriesData: TimeSeriesData
}


const StockView = (props: StockViewProps) => {

  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <header>
        <h1>{props.overview.Name}</h1>
      </header>
      <section>
        <ChartView data={props.timeSeriesData['Time Series (5min)'] as TimeSeries}/>
      </section>
      <section>
        <div className="d-flex justify-content-between mb-4">
          <h2>About</h2>
          <Button onClick={() => setShowMore(!showMore)}>Show {showMore ? 'Less' : 'More'}</Button>
        </div>
        <div className="mb-5">
          <ReadMoreText text={props.overview.Description} />
        </div>
        <TableView data={props.overview} showMore={showMore} />
      </section>
    </div>
  )
}

export default StockView