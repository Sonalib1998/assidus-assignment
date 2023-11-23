// import React from 'react';
// import { select, event } from 'd3-selection';

// class Bar extends React.Component {
  
//   constructor() {
//     super();
//     this.ref = React.createRef();
//   }

  
//   componentDidMount() {
//     this.init();
//   }
//   componentDidUpdate() {
//     this.barTransition();
//   }
//   barTransition() {
//     const node = this.ref.current;
//     const { yScale, height, data, t } = this.props;
 

//     select(node)
//       .selectAll('.bar')
//       .data(data)
//       .attr('y', d => yScale(d.value))
//       .attr('height', d => height - yScale(d.value));
//   }
  
//   init() {
//     const {
//       xScale, yScale, data, height,
//     } = this.props;
//     const node = this.ref.current;

//     const initialData = data.map(obj => ({
//       name: obj.name,
//       value: 0
//     }));

//     const bar = select(node)
//       .selectAll('.bar')
//       .data(initialData);
     
//     bar
//       .enter()
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', d => xScale(d.name))
//       .attr('y', height)
//       .attr('width', xScale.bandwidth())
//       .attr('fill', '#14C503');

//     this.barTransition();
//   }
//   render() {
//     return (
//       <g
//         className="bar-group"
//         ref={this.ref}
//       />
//     );
//   }
// }

// export default Bar;
import React from 'react';
import { select, event } from 'd3-selection';

class Bar extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    this.barTransition();
  }

  handleMouseOver = (event, d) => {
    const { xScale, yScale } = this.props;
    const tooltip = select('.tooltip');
    console.log(d.name,d.value);
    tooltip
    .style('opacity', 1)
    .html(`${d.name}: ${d.value}`)
    .style('left', `${xScale(d.name) + xScale.bandwidth() / 2}px`)
    .style('top', `${yScale(d.value) - 10}px`);
    console.log(tooltip)
  };
  

  handleMouseOut = () => {
    select('.tooltip').style('opacity', 0);
  };

  barTransition() {
    const node = this.ref.current;
    const { yScale, height, data } = this.props;
  
    select(node)
      .selectAll('.bar')
      .data(data)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - yScale(d.value))
      .on('mouseover', (event, d) => this.handleMouseOver(event, d))
      .on('mouseout', this.handleMouseOut);
  }

  init() {
    const {
      xScale, yScale, data, height,
    } = this.props;
    const node = this.ref.current;

    console.log(data);

    const initialData = data.map(obj => ({
      name: obj.name,
      value: 0,
    }));

    const bar = select(node)
      .selectAll('.bar')
      .data(initialData);

    bar
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('fill', '#14C503');

    this.barTransition();
  }

  render() {
    return (
      <>
        <g className="bar-group" ref={this.ref} />
        <div className="tooltip" />
      </>
    );
  }
}

export default Bar;
