class Renderer {
  constructor(data) {
    // store data
    this.data = data;
    this.people = {};

    // store default filter values
    this.defaultFilterVals = {
      domain: ['JavaScript', 'Python'],
      subtopic: {
        'JavaScript': ['Visualization Frameworks', 'Model-View-Controller (MVC) Frameworks'],
        'Python': ['Data Analysis and Modeling', 'Backend Frameworks']
      },
      frameworks: {
        'Visualization Frameworks': ['D3.js', 'Vega Lite', 'ThreeJS', 'React Vis'],
        'Model-View-Controller (MVC) Frameworks': ['jQuery', 'AngularJS', 'EmberJS', 'MeteorJS', 'ReactJS'],
        'Data Analysis and Modeling': ['Pandas', 'Numpy', 'Tensorflow', 'Scipy'],
        'Backend Frameworks': ['Flask', 'Django', 'Tornado ']
      }
    };

    // store filters
    this.filterVals = {
      domain: '',
      subtopic: '',
      frameworks: new Set(),
      deadline: undefined
    };

    // initialize filters
    this.initFilters();

    // parse data and setup click handlers
    this.parsePeople();
    this.setupClickHandlers();
  }

  parsePeople() {
    this.data.forEach(person => {
      this.people[person.name] = {
        image: person.imageFile,
        title: person.title,
        availability: new Set(person.availability),
        expertise: person.expertise,
        plot: undefined
      }
    });
  }

  renderVis() {
    // clear curr helpers
    let $helperDiv = $('#helpers');
    $helperDiv.empty();

    // get filtered data to use for plotting
    let filteredData = this.getFilteredData(this.data);

    // append data from each helper
    let index = 0;
    Object.keys(this.people).forEach(key => {
      // curr div id
      let divId = `${ key.replace(/\s/g, '') }-div`;

      // curr plot key
      let plotId = key.replace(/\s/g, '');

      // create tile
      let helperTile = `<div class="row standard-padding" id="${ divId }">
                    <div class="col-2 cn">
                        <div class="profile">
                            <img src="${ this.people[key].image }" alt="avatar" class="circle-avatar">
                            <h4>${ key }</h4>
                            <h5>${ this.people[key].title }</h5>
                        </div>
                    </div>
                    <div class="col-10">
                        <div style="text-align:center; height: 20vh" id="${ plotId }"></div>
                    </div>
                </div>`;

      // add tile to DOM
      $helperDiv.append(helperTile);

      // initialize plot
      this.people[key].plot = new BarPlot(`#${ plotId }`, filteredData[key], this);
      this.people[key].plot.setupPlot();
      this.people[key].plot.draw(filteredData[key]);

      index++;
    });

    $helperDiv.show();
  }

  updateVis() {
    // get filtered data to use for plotting
    let filteredData = this.getFilteredData(this.data);

    // append data from each helper
    Object.keys(this.people).forEach(key => {
      let currFilteredData = filteredData[key];

      // update plot with filtered data
      this.people[key].plot.draw(currFilteredData);

      // if unavailable, fade out whole div
      if (currFilteredData.isAvailable) {
        $(`#${ key.replace(/\s/g, '') }-div`).animate({opacity: 1}, 800);
      } else {
        $(`#${ key.replace(/\s/g, '') }-div`).animate({opacity: 0.25}, 800);
      }
    });
  }

  initFilters() {
    // hide filters that can't be used yet
    $('#subtopic-div').hide();
    $('#specific-filters').hide();

    // set values for domain filter
    let optionsAsString = '';
    optionsAsString += '<option disabled selected value> -- select an option -- </option>';

    this.defaultFilterVals.domain.forEach(filterVal => {
      optionsAsString += `<option value='${ filterVal }'> ${ filterVal }</option>`;
    });

    $('select[id="domain"]').append(optionsAsString);

    // setup datepicker, but immediately hide
    $('.datepicker').datepicker({
      startDate: '-0d'
    }).hide();
  }

  setupClickHandlers() {
    let self = this;

    $('#domain').on('change', e => {
      // set domain
      this.filterVals.domain = e.target.value;

      // set subtopic filter values
      let currSubtopicValues = this.defaultFilterVals.subtopic[e.target.value];

      let optionsAsString = '';
      optionsAsString += '<option disabled selected value> -- select an option -- </option>';

      currSubtopicValues.forEach(filterVal => {
        optionsAsString += `<option value='${ filterVal }'> ${ filterVal }</option>`;
      });

      let $subtopicSelect = $('select[id="subtopic"]');
      $subtopicSelect.empty();
      $subtopicSelect.append(optionsAsString);

      // reset subtopic, frameworks, and deadline
      this.filterVals.subtopic = '';
      this.filterVals.frameworks = new Set();
      this.filterVals.deadline = undefined;

      // show subtopic div, but hide frameworks
      $('#subtopic-div').show();
      $('#specific-filters').hide();
      $('#helpers').empty();
    });

    $('#subtopic').on('change', e => {
      // set subtopic
      this.filterVals.subtopic = e.target.value;

      // populate checkbox values for frameworks
      function makeCheckBox(value, colorFn) {
        let currColor = colorFn(value);

        return `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${ value }" id="${ value }">
          <label class="form-check-label" for="${ value }" style="color: ${ currColor };"> ${ value } </label>
        </div>`
      }

      $('#filter-frameworks').empty();
      let currFrameworkVals = this.defaultFilterVals.frameworks[e.target.value];
      let frameworkColorFn = d3.scaleOrdinal()
        .domain(currFrameworkVals)
        .range(d3.schemeCategory10);

      currFrameworkVals.forEach(framework => {
        $('#filter-frameworks').append(makeCheckBox(framework, frameworkColorFn));
      });

      // set framework filters
      this.filterVals.frameworks = new Set();

      // show filters and date picker
      $('#specific-filters').show();
      $('.datepicker').show();

      // setup handlers for form check
      $('.form-check-input').on('click', e => {
        let filterValue = e.currentTarget.id;
        let isChecked = e.currentTarget.checked;

        // update based on if checked or not
        if (isChecked) {
          self.filterVals.frameworks.add(filterValue);
        } else {
          self.filterVals.frameworks.delete(filterValue);
        }

        self.updateVis();
      });

      // render
      this.renderVis();
    });

    // TODO: restrict this for demo purposes so that it doesn't break with pre-specified data
    $('.datepicker').on('changeDate', e => {
      this.filterVals.deadline = e.date.toISOString().split('T')[0];
      this.updateVis();
    });
  }

  getFilteredData() {
    let filteredPlotData = {};
    Object.keys(this.people).forEach(key => {
      // get relevant expertise
      let relevantExpertise = this.people[key].expertise[this.filterVals.domain][this.filterVals.subtopic];
      let skillList = [];

      Object.keys(relevantExpertise).forEach(expertiseKey => {
        skillList.push({
          name: expertiseKey,
          value: relevantExpertise[expertiseKey]
        })
      });

      // determine availability by deadline
      let isAvailable = true;
      if ((this.filterVals.deadline !== undefined) &&
          !(this.people[key].availability.has(this.filterVals.deadline))) {
        isAvailable = false;
      }

      filteredPlotData[key] = {
        skills: skillList,
        isAvailable: isAvailable
      }
    });

    return filteredPlotData;
  }
}