import React from "react";
import d3 from "d3";

import style from "./donutChart.css";

class DonutChart extends React.Component {
  drawChart = () => {
    var data = [
      { name: "A", val: 11975 },
      { name: "B", val: 5871 },
      { name: "C", val: 8916 }
    ];

    var w = 200,
      h = 400,
      r = Math.min(w, h) / 2,
      labelr = r + 10, // radius for label anchor
      color = d3.scale.category20(),
      donut = d3.layout.pie(),
      arc = d3.svg
        .arc()
        .innerRadius(r * 0.6)
        .outerRadius(r);

    var vis = d3
      .select("#donutChart")
      .append("svg:svg")
      .data([data])
      .attr("width", w + 150)
      .attr("height", h);

    var arcs = vis
      .selectAll("g.arc")
      .data(
        donut.value(function(d) {
          return d.val;
        })
      )
      .enter()
      .append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + (r + 30) + "," + r + ")");

    arcs
      .append("svg:path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    var legends = vis
      .append("g")
      .attr("transform", "translate(" + (r + r + 90) + "," + r + ")");

    legends
      .append("text")
      .attr("y", 0) //magic number here
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .attr("class", "legendItems") //easy to style with CSS
      .text("I'm a label");
  };
  componentDidMount() {
    this.drawChart();
  }
  render() {
    return <div id="donutChart" />;
  }
}

export default DonutChart;
