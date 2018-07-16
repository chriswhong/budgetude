import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import numeral from 'numeral';


class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: null,
      y: null,
      g: null,
      height: null,
    };
  }


  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    const { width: DOMWidth, height: DOMheight } = el.getBoundingClientRect();

    const svg = d3.select(el);
    const margin = {
      top: 20,
      right: 80,
      bottom: 120,
      left: 80,
    };

    const width = DOMWidth - margin.left - margin.right;
    const height = DOMheight - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`);

    g.append('g')
      .attr('class', 'axis axis--y');

    this.setState({
      x,
      y,
      g,
      height,
    });
  }


  render() {
    const {
      x,
      y,
      g,
      height,
    } = this.state;
    const { data } = this.props;

    if (x) {
      x.domain(data.map(d => d.name));
      y.domain([0, d3.max(data, d => d.total)]);

      // transition axes
      g.selectAll('.axis--x')
        .transition().duration(300)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('y', 10)
        .attr('x', 10)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');

      g.selectAll('.axis--y')
        .call(d3.axisLeft(y)
          .ticks(3, '$')
          .tickFormat(d => numeral(d).format('$0.0a').toUpperCase()))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');


      const bars = g.selectAll('.bar').data(data);

      bars.exit()
        .remove();

      bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.total))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.total))
        .on('click', (d) => {
          const { history, linkPrefix } = this.props;
          history.push(`${linkPrefix}/${d.id}`);
        });

      bars.transition().duration(300)
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.total))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.total));
    }

    return (<svg height={350} width="100%" />);
  }
}

export default BarChart;
