import React, { useEffect, useRef } from 'react';
import { TimeSeries } from '../../../models/AlphaVantage.model';
import * as d3 from 'd3';
import './ChartView.scss';

type ChartViewProps = {
  data: TimeSeries
}

type FlattenedData = {
  '1. open': number;
  '2. high': number;
  '3. low': number;
  '4. close': number;
  '5. volume': number;
  date: number;
}

const ChartView = (props: ChartViewProps) => {
  const height = 300;
  const MARGIN = 15;

  const flattenedData: FlattenedData[] = Object.entries(props.data).map(val => ({ date: Date.parse(val[0]), ...val[1] }));
  const timeExtent = d3.extent(flattenedData, val => val.date) as [number, number];
  const valueExtent = d3.extent(flattenedData, val => val['4. close']) as [number, number];

  const xAxis = d3.scaleTime()
    .domain(timeExtent);

  const yAxis = d3.scaleLinear()
    .domain(valueExtent)
    .range([MARGIN, height - 2 * MARGIN]);

  const line = d3.line<FlattenedData>()
    .x(d => xAxis(d.date))
    .y(d => yAxis(d['4. close']));

  const parentContainer = useRef(null);

  useEffect(() => {
    if (parentContainer.current) {
      const width = (parentContainer.current as any as HTMLDivElement).clientWidth;
      xAxis.range([0, width]);

      const parent = d3.select(parentContainer.current);
      parent.selectAll('*').remove();

      const svg = parent.append('svg')
        .attr('height', `${height}px`)
        .attr('width', `${width}px`);

      svg.append('path')
        .datum(flattenedData)
        .attr('fill', 'none')
        .attr('stroke', 'rgb(0, 200, 5)')
        .attr('stroke-width', '2px')
        .attr('d', line);
    }

  }, [flattenedData, xAxis, line]);

  return (
    <div className="ChartContainer" ref={parentContainer}>
    </div>
  );
}

export default ChartView;