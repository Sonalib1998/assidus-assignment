import React, { useRef, useEffect } from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

function Line({ xScale, yScale, data, lineGenerator }) {
  console.log(data)
  const ref = useRef();

  useEffect(() => {
    const node = ref.current;

    const initialData = data.map(d => ({
      name: d.name,
      value: 0
    }));

    select(node)
      .append('path')
      .datum(initialData)
      .attr('id', 'line')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    updateChart();
  }, []);

  useEffect(() => {
    updateChart();
  }, [xScale, yScale, data, lineGenerator]);

  const updateChart = () => {
    const t = transition().duration(1000);

    const line = select('#line');
    const dot = selectAll('.circle');

    line
      .datum(data)
      .attr('d', lineGenerator)
      .attr('stroke','#14C503');

   
  };

  return <g className="line-group" ref={ref} />;
}

export default Line;
