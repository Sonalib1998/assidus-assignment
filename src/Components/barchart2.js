import React, { useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from '../utils/xy-axis.js';
import Bar2 from '../utils/bar2.js';
import { transition } from 'd3-transition';

const Barchart2 = (bardata) => {
  const data=bardata.bardata.bardata

  const parentWidth = 500;
  const margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 40,
  };
  const ticks = 6;
  const t = transition().duration(1000);

  const width = parentWidth - margin.left - margin.right;
  const height = parentWidth * 0.5 - margin.top - margin.bottom;

  const xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.26);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => Math.max(d.cashIn, d.cashOut)))])
    .range([height, 0])
    .nice();

  return (
    <div>
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <XYAxis {...{ xScale, yScale, height, ticks, t }} />
          <Bar2
            {...{
              xScale,
              yScale,
              data,
              height,
              t,
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default Barchart2;
