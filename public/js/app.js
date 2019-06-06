$(function() {
  const data1 = [{
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

  const data2 = [{
    "name": "Apples",
    "value": 1,
  },
    {
      "name": "Bananas",
      "value": 1,
    },
    {
      "name": "Grapes",
      "value": 2,
    },
    {
      "name": "Lemons",
      "value": 5,
    },
    {
      "name": "Limes",
      "value": 2,
    },
    {
      "name": "Oranges",
      "value": 4,
    },
    {
      "name": "Pears",
      "value": 2,
    }];

  const data3 = [{
    "name": "Apples",
    "value": 1,
  },
    {
      "name": "Bananas",
      "value": 2,
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
      "value": 5,
    },
    {
      "name": "Oranges",
      "value": 1,
    },
    {
      "name": "Pears",
      "value": 1,
    }];

  const data4 = [{
    "name": "Apples",
    "value": 1,
  },
    {
      "name": "Bananas",
      "value": 2,
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
      "value": 5,
    },
    {
      "name": "Oranges",
      "value": 1,
    },
    {
      "name": "Pears",
      "value": 1,
    }];

  const bar1 = new BarPlot('#bar1', data1);
  bar1.setupPlot();
  bar1.draw(data1);

  const bar2 = new BarPlot('#bar2', data2);
  bar2.setupPlot();
  bar2.draw(data2);

  const bar3 = new BarPlot('#bar3', data3);
  bar3.setupPlot();
  bar3.draw(data3);

  const bar4 = new BarPlot('#bar4', data3);
  bar4.setupPlot();
  bar4.draw(data4);
});