$(function() {
  const data = [{
    "name": "Apples",
    "value": 1,
  },
    {
      "name": "Bananas",
      "value": 3,
    },
    {
      "name": "Grapes",
      "value": 0,
    },
    {
      "name": "Lemons",
      "value": 5,
    },
    {
      "name": "Limes",
      "value": 4,
    },
    {
      "name": "Oranges",
      "value": 4,
    },
    {
      "name": "Pears",
      "value": 2,
    }];

  const bar1 = new BarPlot('#bar1', data);
  bar1.setupPlot();
  bar1.draw(data);

  const bar2 = new BarPlot('#bar2', data);
  bar2.setupPlot();
  bar2.draw(data);

  const bar3 = new BarPlot('#bar3', data);
  bar3.setupPlot();
  bar3.draw(data);
});