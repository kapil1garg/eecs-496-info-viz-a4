class BarPlot {
  constructor(targetDiv, data) {
    // setup data needed from caller
    this.targetEle = targetDiv;
    this.data = data;

    // setup internal variables needed across functions
    this.svg = null;
    this.tooltip = null;
    this.xScale = null;
    this.yScale = null;
    this.bgColor = null;
    this.txtColor = null;
  }

  setupPlot() {
    // store DOM elements to modify
    const $plotDiv = $(this.targetEle);
    const destElement = d3.select(this.targetEle);

    // setup plotting area
    const margin = { top: 30, right: 50, bottom: 50, left: 50 };
    const h = $plotDiv.innerHeight() - margin.top - margin.bottom;
    const w = $plotDiv.innerWidth() - margin.left - margin.right;

    // scales (x = number points, y = price)
    this.xScale = d3.scaleLinear()
        .domain([0, 5])
        .range([0, w]);

    this.yScale = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([margin.top, h])
      .padding(0.1);

    // x-axis
    const xAxis = d3.axisBottom(this.xScale);

    // y-axis
    const yAxis = d3.axisLeft(this.yScale);

    // tooltip (needs to be attached to body element, NOT destElement)
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // setup svg
    this.svg = destElement.append('svg')
      .attr('height', h + margin.top + margin.bottom)
      .attr('width', w + margin.left + margin.right)
      .append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

    // add x-axis
    this.svg.append('g')
      .attr('transform', `translate(0, ${ h })`)
      .attr('class', 'axis')
      .call(xAxis);

    this.svg.append('text') // x-axis label
      .attr('class','label')
      .attr('x', w + 10)
      .attr('y', h + margin.top)
      .style('text-anchor','end')
      .text('Knowledge (0: none; 5: expert)');

    // add y-axis
    this.svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

    // this.svg.append('text') // y-axis Label
    //   .attr('class','label')
    //   .attr('x', 175)
    //   .attr('y', -10)
    //   .style('text-anchor','end')
    //   .text('Price per Bottle (in $USD)');
  }

  draw(data) {
    let self = this;
    let bars = this.svg.selectAll(".bar")
      .data(data);

    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => self.yScale(d.name) )
      .attr('height', self.yScale.bandwidth())
      .attr('x', 0)
      .attr('width', function (d) {
        return self.xScale(d.value);
      });

    bars.append('text')
      .attr('class', 'label')
      // y position of the label is halfway down the bar
      .attr('y', function (d) {
        return self.yScale(d.name) + self.yScale.bandwidth() / 2 + 4;
      })
      // x position is 3 pixels to the right of the bar
      .attr('x', function (d) {
        return self.xScale(d.value) + 3;
      })
      .text(function (d) {
        return d.value;
      });

    bars.exit().remove();
  }
}