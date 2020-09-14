import * as React from 'react';
import * as d3 from 'd3';
// import webconfig from '@Main/ts/constants/webconfig';
// import { Project } from '@Main/ts/constants/crossProjectInfo'

export type KernelVisualProps = {
  // id?: string;
}

class KernelVisual extends React.Component<KernelVisualProps> {
  static idCount: number = 0;

  private readonly width: number = 500;
  private readonly height: number = 500;
  private readonly margin = { top: 10, right: 30, bottom: 30, left: 60 };

  private svgId: string;

  private data = [[1, 1], [2, 2], [3, 3]];

  constructor(props) {
    super(props);
    this.svgId = "kernel-visual-" + (KernelVisual.idCount++).toString();
    console.log(this.svgId)
  }

  componentDidMount() {
    let svg = d3.select("#" + this.svgId)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    // d3.csv(webconfig.asset_link(Project.SVM, "kernel_data.csv"))

    let x = d3.scaleLinear().domain([3, 9]).range([0, this.width]);
    let y = d3.scaleLinear().domain([0, 9]).range([this.height, 0]);

    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.Sepal_Length); })
      .attr("cy", function (d) { return y(d.Petal_Length); })
      .attr("r", 5)
      .style("fill", "#69b3a2")


    // A function that update the plot for a given xlim value
    function updatePlot() {

      // Get the value of the button
      xlim = this.value

      // Update X axis
      x.domain([3, xlim])
      xAxis.transition().duration(1000).call(d3.axisBottom(x))

      // Update chart
      svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(1000)
        .attr("cx", function (d) { return x(d.Sepal_Length); })
        .attr("cy", function (d) { return y(d.Petal_Length); })
    }

    // Add an event listener to the button created in the html part
    d3.select("#buttonXlim").on("input", updatePlot)
  }

  render() {
    d3.select("#" + this.svgId)
      .append("circle")
      .attr("r", 5)
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .attr("fill", "red");

    return (
      <svg id={this.svgId} className="container" width={this.width} height={this.height}>
      </svg>
    );

  }



}





export default KernelVisual;