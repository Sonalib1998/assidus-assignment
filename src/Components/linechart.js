
import React, { useEffect, useRef } from 'react';
import { select, line, curveMonotoneX, scaleLinear, scaleBand, axisBottom, axisLeft } from 'd3';

const LineChart = ({ data1, data2 }) => {
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
  
    svg.selectAll('*').remove();
  
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  
    const xScale = scaleBand()
      .domain(data1.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const yScale = scaleLinear()
      .domain([0, Math.max(...data1.map((d) => d.value), ...data2.map((d) => d.value))])
      .range([height - margin.bottom, margin.top]);
  
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(axisBottom(xScale));
  
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(yScale));
  
  
    const lineGenerator1 = line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(curveMonotoneX);
  
    svg
      .append('path')
      .datum(data1)
      .attr('fill', 'none')
      .attr('stroke', 'lightgreen')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator1);

    const lineGenerator2 = line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(curveMonotoneX);
  
    svg
      .append('path')
      .datum(data2)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator2);
  }, [data1, data2]);
  

  return <svg ref={svgRef} width={500} height={300} />;
};

export default LineChart;

