import React, { useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { line, curveMonotoneX } from 'd3-shape';
import XYAxis from '../utils/xy-axis';
import Line from '../utils/line'; 

function LineChart(linedata) {
 const data=linedata.linedata.data
  const parentWidth = 500;

  const margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const width = parentWidth - margins.left - margins.right;
  const height = 200 - margins.top - margins.bottom;

  const ticks = 5;

  const xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.value))
    .range([height, 0])
    .nice();

  const lineGenerator = line()
    .x(d => xScale(d.name))
    .y(d => yScale(d.value))
    .curve(curveMonotoneX);

  return (
    <div>
      <svg
        className="lineChartSvg"
        width={width + margins.left + margins.right}
        height={height + margins.top + margins.bottom}
      >
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis xScale={xScale} yScale={yScale} height={height} ticks={ticks} />
          <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
        </g>
      </svg>
    </div>
  );
}

export default LineChart;