import React, { useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from '../utils/xy-axis.js';
import Bar from '../utils/bar.js';
import { transition } from 'd3-transition';

const Barchart = () => {
  const [data, setData] = useState([
    { name: 'Older', value: 60 },
    { name: 'Jan 01-08', value: 50 },
    { name: 'Jan 09-16', value: 80 },
    { name: 'Jan 17-24', value: 55 },
    { name: 'Jan 25-31', value: 40 },
    { name: 'Future', value: 20 },
  ]);

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
    .domain([0, Math.max(...data.map(d => d.value))])
    .range([height, 0])
    .nice();

  return (
    <div>
  
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <XYAxis {...{ xScale, yScale, height, ticks, t }} />
          <Bar
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

export default Barchart;

