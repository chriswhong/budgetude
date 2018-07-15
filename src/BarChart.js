import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Measure from 'react-measure';
import * as d3 from 'd3';
import numeral from 'numeral';


class BarChart extends Component {

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    let { width: DOMWidth, height:DOMheight } = el.getBoundingClientRect();


    const { data } = this.props;

    const svg = d3.select(el)
    const margin = {top: 20, right: 80, bottom: 200, left: 80};

    const width = DOMWidth - margin.left - margin.right;
    const height = DOMheight - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("y", 10)
        .attr("x", 10)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y)
          .ticks(3, "$")
          .tickFormat((d) => numeral(d).format('$0.0a').toUpperCase())
        )
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.total); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.total); })
        .on("click", (d) => {
          console.log(d)
          const { history, linkPrefix } = this.props;
          history.push(`${linkPrefix}/${d.id}`)
        });
  }

  render() {
    return (<svg height={400} width={"100%"}></svg>);
  }
}

export default BarChart
