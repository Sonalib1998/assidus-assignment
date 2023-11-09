import React from 'react';
import { select } from 'd3-selection';

class Bar extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
     this.legendRef = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    this.barTransition();
  }

  barTransition() {
    const node = this.ref.current;
    const { yScale, height, data, t } = this.props;


    // CashIn bars
    select(node)
      .selectAll('.bar-cashIn')
      .data(data)
      .attr('y', d => yScale(d.cashIn))
      .attr('height', d => height - yScale(d.cashIn))
      .attr('fill', '#14C503') 
      .attr('opacity', 0.8);

    // CashOut bars
    select(node)
      .selectAll('.bar-cashOut')
      .data(data)
      .attr('y', d => yScale(d.cashIn + d.cashOut))
      .attr('height', d => height - yScale(d.cashOut))
      .attr('fill', 'lightgreen') 
      .attr('opacity', 0.8);
  }

  init() {
    const {
      xScale, yScale, data, height,
    } = this.props;
    const node = this.ref.current;

    const initialData = data.map(obj => ({
      name: obj.name,
      cashIn: 0,
      cashOut: 0,
    }));


    // CashIn bars
    select(node)
      .selectAll('.bar-cashIn')
      .data(initialData)
      .enter()
      .append('rect')
      .attr('class', 'bar-cashIn')
      .attr('x', d => xScale(d.name))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('fill', 'lightgreen') 
      .attr('opacity', 0.8);

    // CashOut bars
    select(node)
      .selectAll('.bar-cashOut')
      .data(initialData)
      .enter()
      .append('rect')
      .attr('class', 'bar-cashOut')
      .attr('x', d => xScale(d.name))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('fill', '#14C503') 
      .attr('opacity', 0.8);

    this.barTransition();
  }

  render() {
    return (
      <g
        className="bar-group"
        ref={this.ref}
      />
    );
  }
}

export default Bar;
