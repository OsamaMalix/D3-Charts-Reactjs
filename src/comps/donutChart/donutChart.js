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
      spaceBetweenLegends = 30,
      legendsVerticalPosition =
        ((data.length - 1) * spaceBetweenLegends) / 2 + 30,
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

    var legends = vis
      .append("g")
      .attr("class", "customD3LegendGroup")
      .attr("transform", "translate(" + (r + r + 70) + "," + r + ")");

    var arcs = vis
      .selectAll("g.arc")
      .data(
        donut.value(function(d, i) {
          var legend = legends
            .append("g")
            .attr(
              "transform",
              "translate(" + 0 + "," + spaceBetweenLegends * i + ")"
            )
            .on("click", datum => {
              // console.log(d3.select(d3.event.path[0]).text());
              console.log(d3.event.explicitOriginalTarget.data);
            });
          legend
            .append("circle") // attach a circle
            .attr("cx", -10) // position the x-centre
            .attr("cy", -6) // position the y-centre
            .attr("r", 6) // set the radius
            .style("fill", color(i));
          legend
            .append("text")
            // .attr("y", legendVerticalSpace) //magic number here
            .attr("x", 0)
            // .attr("text-anchor", "middle")
            .text(d["name"]);
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
    //Animation
    // .transition()
    // .duration(750)
    // .ease(d3.easeLinear)
    // .attrTween("d", function(d) {
    //   var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
    //   return function(t) {
    //     d.endAngle = i(t);
    //     return arc(d);
    //   };
    // });
  };
  componentDidMount() {
    this.drawChart();
  }
  render() {
    return <div id="donutChart" />;
  }
}

export default DonutChart;
