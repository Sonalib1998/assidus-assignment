import React, { useEffect, useRef } from 'react';
import { select, axisBottom, axisLeft, scaleBand, scaleLinear, max } from 'd3';

const BarChart = (bar) => {
  const data = bar.bar.bar;
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = scaleBand().range([0, width]).padding(0.1);
    const yScale = scaleLinear().range([height, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`) 
      .attr('class', 'x-axis');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('class', 'y-axis');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle');

    svg
      .append('text')
      .attr('transform', `translate(${width / 2 + margin.left},${height + margin.top + 20})`)
      .style('text-anchor', 'middle');

    const bars = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    xScale.domain(data.map((d) => d.name));
    yScale.domain([0, max(data, (d) => d.value)]);

    svg.select('.x-axis').call(xAxis);
    svg.select('.y-axis').call(yAxis);

    bars
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', '#14C503')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value))
      .on('mouseover', (event, d) => handleMouseOver(event, d))
      .on('mouseout', handleMouseOut);
  }, [data]);

  const handleMouseOver = (event, d) => {
    const tooltip = select('.tooltip');
    tooltip
      .style('opacity', 1)
      .html(`${d.name}: ${d.value}`)
      .style('position', 'absolute')
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY - 28}px`);
  };

  const handleMouseOut = () => {
    select('.tooltip').style('opacity', 0);
  };

  return (
    <div>
      <svg ref={svgRef} width={500} height={300}></svg>
      <div className="tooltip"></div>
    </div>
  );
};

export default BarChart;
