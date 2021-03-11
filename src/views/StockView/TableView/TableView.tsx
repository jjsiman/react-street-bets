import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SymbolOverview } from '../../../models/AlphaVantage.model';
import numeral from 'numeral';

import './TableView.scss';

type TableViewProps = {
  showMore: boolean,
  data: SymbolOverview
}

type TableItem = {
  label: string;
  value: string | number;
}

const TableView = (props: TableViewProps) => {

  let tableItems: TableItem[] = [
    {
      label: 'Employees',
      value: numeral(props.data.FullTimeEmployees).format('0,0')
    },
    {
      label: 'Exchange',
      value: props.data.Exchange
    },
    {
      label: 'Industry',
      value: props.data.Industry
    },
    {
      label: 'Sector',
      value: props.data.Sector
    },
    {
      label: 'Market Cap',
      value: numeral(props.data.MarketCapitalization).format('0.0a').toLocaleUpperCase()
    },
    {
      label: 'EBITDA',
      value: numeral(props.data.EBITDA).format('0.0a').toLocaleUpperCase()
    },
    {
      label: 'Price-Earnings Ratio',
      value: numeral(props.data.PERatio).format('0.00')
    },
    {
      label: 'EPS',
      value: props.data.EPS
    },
    {
      label: 'Dividend Yield',
      value: props.data.DividendYield * 100
    },
    {
      label: '52 Week High',
      value: `$${props.data['52WeekHigh']}`
    },
    {
      label: '52 Week Low',
      value: `$${props.data['52WeekLow']}`
    },
    {
      label: 'Fiscal Year End',
      value: props.data.FiscalYearEnd
    }
  ];

  if (!props.showMore) {
    tableItems = tableItems.slice(0, 8);
  }

  const tableItemsElements = tableItems.map(item => (
    <Col key={item.label} className="TableItem">
      <div className="TableItemLabel">{item.label}</div>
      <div>{item.value}</div>
    </Col>
  ));

  return (
    <div className="TableContainer">
      <Row xs={2} md={4}>
        {tableItemsElements}
      </Row>
    </div>
  )
}

TableView.defaultProps = {
  showMore: false
}

export default TableView;