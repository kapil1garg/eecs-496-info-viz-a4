$(function() {
  // load data
  d3.json('expertise-data.json')
    .then(data => {
      const renderer = new Renderer(data);
    })
    .catch(err => {
      alert('Error in loading data. Please try refreshing the page.')
    });
});