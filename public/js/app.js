$(function() {
  const data1 = [
    {
    "name": "d3.js",
    "value": 1,
    },
    {
      "name": "Vega-Lite",
      "value": 3,
    },
    {
      "name": "React",
      "value": 0,
    },
    {
      "name": "Angular",
      "value": 5,
    },
    {
      "name": "Vue",
      "value": 4,
    },
    {
      "name": "Blaze",
      "value": 4,
    },
    {
      "name": "Node.js",
      "value": 2,
    }];

  const data2 = [
    {
    "name": "d3.js",
    "value": 1,
    },
    {
      "name": "Vega-Lite",
      "value": 1,
    },
    {
      "name": "React",
      "value": 2,
    },
    {
      "name": "Angular",
      "value": 5,
    },
    {
      "name": "Vue",
      "value": 2,
    },
    {
      "name": "Blaze",
      "value": 4,
    },
    {
      "name": "Node.js",
      "value": 2,
    }];

  const data3 = [
    {
    "name": "d3.js",
    "value": 1,
    },
    {
      "name": "Vega-Lite",
      "value": 2,
    },
    {
      "name": "React",
      "value": 0,
    },
    {
      "name": "Angular",
      "value": 5,
    },
    {
      "name": "Vue",
      "value": 5,
    },
    {
      "name": "Blaze",
      "value": 1,
    },
    {
      "name": "Node.js",
      "value": 1,
    }];

  const data4 = [{
    "name": "d3.js",
    "value": 1,
  },
    {
      "name": "Vega-Lite",
      "value": 2,
    },
    {
      "name": "React",
      "value": 0,
    },
    {
      "name": "Angular",
      "value": 5,
    },
    {
      "name": "Vue",
      "value": 5,
    },
    {
      "name": "Blaze",
      "value": 1,
    },
    {
      "name": "Node.js",
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


  // testing data updates
  setTimeout(() => {
    const randomData = [{
      "name": "d3.js",
      "value": Math.floor(Math.random() * 6),
    },
      {
        "name": "Vega-Lite",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "React",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Angular",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Vue",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Blaze",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Node.js",
        "value": Math.floor(Math.random() * 6),
      }];

    bar1.draw(randomData)
  }, 5000)

  setTimeout(() => {
    const randomData = [{
      "name": "d3.js",
      "value": Math.floor(Math.random() * 6),
    },
      {
        "name": "Vega-Lite",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "React",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Angular",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Vue",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Blaze",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Node.js",
        "value": Math.floor(Math.random() * 6),
      }];

    bar2.draw(randomData)
  }, 5000)

  setTimeout(() => {
    const randomData = [{
      "name": "d3.js",
      "value": Math.floor(Math.random() * 6),
    },
      {
        "name": "Vega-Lite",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "React",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Angular",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Vue",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Blaze",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Node.js",
        "value": Math.floor(Math.random() * 6),
      }];

    bar4.draw(randomData)
  }, 5000)

  setTimeout(() => {
    const randomData = [{
      "name": "d3.js",
      "value": Math.floor(Math.random() * 6),
    },
      {
        "name": "Vega-Lite",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "React",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Angular",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Vue",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Blaze",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Node.js",
        "value": Math.floor(Math.random() * 6),
      }];

    bar3.draw(randomData)
  }, 5000)

  setTimeout(() => {
    const randomData = [{
      "name": "d3.js",
      "value": Math.floor(Math.random() * 6),
    },
      {
        "name": "Vega-Lite",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "React",
        "value": Math.floor(Math.random() * 6),
      },
      {
        "name": "Node.js",
        "value": Math.floor(Math.random() * 6),
      }];

    bar2.resetPlot(randomData)
    bar2.setupPlot()
    bar2.draw(randomData)
  }, 7000)
});