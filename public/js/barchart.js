class BarPlot {
  constructor(targetDiv, data, renderer) {
    // setup data needed from caller
    this.targetEle = targetDiv;
    this.data = data.skills;
    this.renderer = renderer;

    d3.select(this.targetEle).selectAll("*").remove();

    // setup internal variables needed across functions
    this.height = null;
    this.width = null;

    this.svg = null;
    this.tooltip = null;
    this.xScale = null;
    this.yScale = null;
    this.bgColor = null;
  }

  setupPlot() {
    // store DOM elements to modify
    const $plotDiv = $(this.targetEle);
    const destElement = d3.select(this.targetEle);

    // setup plotting area
    const margin = { top: 30, right: 75, bottom: 50, left: 75 };
    const h = $plotDiv.innerHeight() - margin.top - margin.bottom;
    const w = $plotDiv.innerWidth() - margin.left - margin.right;

    this.height = h;
    this.width = w;

    // scales (x = knowledge level, y = skill)
    this.xScale = d3.scaleLinear()
        .domain([0, 5])
        .range([0, w]);

    this.yScale = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([margin.top, h])
      .padding(0.1);

    // color
    this.bgColor = d3.scaleOrdinal()
      .domain(this.data.map(datum => datum.name))
      .range(d3.schemeCategory10);

    // x-axis
    const xAxis = d3.axisBottom(this.xScale)
      .tickValues([0, 1, 2, 3, 4, 5])
      .tickFormat(d => {
        switch (d) {
          case 1:
            return 'Novice';
          case 2:
            return 'Familiar';
          case 3:
            return 'Intermediate';
          case 4:
            return 'Experienced';
          case 5:
            return 'Expert';
          case 0:
          default:
            return '';
        }
      });

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

    // add y-axis
    this.svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);
  }

  draw(data) {
    let self = this;
    let bars = this.svg.selectAll(".bar")
      .data(data.skills);

    bars.enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('y', d => self.yScale(d.name) )
        .attr('height', self.yScale.bandwidth())
        .attr('width', 0)
        .style('fill', d => self.bgColor(d.name))
      .merge(bars)
      .on('mouseover', selectedBar => {
        d3.selectAll('.bar')
          .style('opacity', 0.25)
          .filter(d => d.name === selectedBar.name)
          .style('opacity', 1);
      }).on('mouseout', () => {
        d3.selectAll('.bar')
          .style('opacity', (d) => {
            if (self.renderer.filterVals.frameworks.size === 0) {
              return 1.0
            }

            return self.renderer.filterVals.frameworks.has(d.name) ? 1.0 : 0.25
          });
      })
      .transition()
        .duration(800)
        .attr('width', d => self.xScale(d.value))
        .delay((d, i) => i * 100)
      .style('opacity', (d) => {
        if (self.renderer.filterVals.frameworks.size === 0) {
          return 1.0
        }

        return self.renderer.filterVals.frameworks.has(d.name) ? 1.0 : 0.25
      });


    bars.exit().remove();
  }
}