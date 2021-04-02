


// chartData=data 
//1. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Assign the value of the dropdown menu option to a variable
var dropdownMenu = d3.select("#selDataset");
var dropdownMenuID = dropdownMenu.id;
var selectedOption = dropdownMenu.value;
console.log(dropdownMenu);

var selectedName= dropdownMenu.property("value");
var filteredData=dropdownMenu.filter(name===selectedName);

// function init() {
//     selectedName="940"
//     trace0 = [{
//         x: filteredData.sample_values,
//         y: filteredData.otu_ids,
//         name: filteredData.otu_labels,
//     }];
//     Plotly.newPlot("plot", data);
//   };
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

d3.selectAll("#selDataset").on("change", showCharts);

// This function is called when a dropdown menu item is selected
function showCharts() {
  // Use D3 to select the dropdown menu

  d3.event.preventDefault();
    
    var trace = {
        x: data.sample_values,
        y: data.otu_ids,
        name: data.otu_labels,
        type: 'bar'};
    var data=[trace];

    var layout = {
        title: "Top 10 OTUs Found"
    };

    Plotly.newPlot("bar", data, layout);
};


//2. Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.



//4. Display the sample metadata, i.e., an individual's demographic information.

function showMetaData() {
    var tableInfo = d3.select("tbody");
    tableInfo.html("");
        
    d3.json('/data/samples.json').then(data => {
        var rawData = data;
        var name = data.names;

        var metadata = data.metadata;
        var metaID = data.metadata.id;
        var ethnicity = data.metadata.ethnicity;
        var gender = data.metadata.gender;
        var age = data.metadata.age;
        var location = data.metadata.location;
        var bbtype = data.metadata.bbtype;
        var wfreq = data.metadata.wfreq;

        var samples = data.samples;
        var otu_ids = data.samples.otu_ids;
        var sample_values = data.samples.sample_values;
        var otu_labels = data.samples.otu_labels;

        var dropdownMenu = d3.select("#selDataset");
        var dropdownMenuID = dropdownMenu.id;
        var selectedOption = dropdownMenu.value;
        console.log(selectedOption);

        var selectedName = dropdownMenu.property("value");
        var filteredData = metadata.filter(info => info.id === selectedName);


        filteredData.forEach((one_row) => {
            var newrow = tableInfo.append('tr');
            Object.entries(filteredData[0]).forEach(([k, v]) => {
                newrow.append('td').text(k, v);
            });
        });

        console.log(name);
        console.log(metadata);
        console.log(samples);
        console.log(data)
    });




};

showMetaData();


// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected

// Initializes the page with a default plot

// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     var CHART = d3.selectAll("#plot").node();
  
//     Plotly.newPlot(CHART, data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("body").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.node().value;
  
//     var CHART = d3.selectAll("#plot").node();
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     switch(dataset) {
//       case "dataset1":
//         x = [1, 2, 3, 4, 5];
//         y = [1, 2, 4, 8, 16];
//         break;
  
//       case "dataset2":
//         x = [10, 20, 30, 40, 50];
//         y = [1, 10, 100, 1000, 10000];
//         break;
  
//       case "dataset3":
//         x = [100, 200, 300, 400, 500];
//         y = [10, 100, 50, 10, 0];
//         break;
  
//       default:
//         x = [1, 2, 3, 4, 5];
//         y = [1, 2, 3, 4, 5];
//         break;
//     }
  
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle(CHART, "x", [x]);
//     Plotly.restyle(CHART, "y", [y]);
//   }
  
//   init();

//       getMonthlyData();
  
//       var trace1 = {
//         type: "scatter",
//         mode: "lines",
//         name: name,
//         x: dates,
//         y: closingPrices,
//         line: {
//           color: "#17BECF"
//         }
//       };
  
//       // Candlestick Trace
//       var trace2 = {
//         type: "candlestick",
//         x: dates,
//         high: highPrices,
//         low: lowPrices,
//         open: openingPrices,
//         close: closingPrices
//       };
  
//       var data = [trace1, trace2];
  
//       var layout = {
//         title: `${stock} closing prices`,
//         xaxis: {
//           range: [startDate, endDate],
//           type: "date"
//         },
//         yaxis: {
//           autorange: true,
//           type: "linear"
//         },
//         showlegend: false
//       };
  
//       Plotly.newPlot("plot", data, layout);
  
//     });
//   }
  
//   buildPlot();

// function filterCities(city) {
//     return parseInt(city.Increase_from_2016) > 15000;
//   }
  
//   // 2. Use filter() to pass the function as its argument
//   var filteredCities = top15Cities.filter(filterCities);
  
//   //  Check to make sure your filtered your cities.
//   console.log(filteredCities);
  
//   // 3. Use the map method with the arrow function to return all the filtered cities.
//   var cities = filteredCities.map(city => city.City);
  
//   //  Check your filtered cities
//   console.log(cities);
  
//   // 4. Use the map method with the arrow function to return all the filtered cities population.
//   var population = filteredCities.map(city => city.population);
  
//   //  Check the populations of your filtered cities
//   console.log(population);
  
  
//   // 5. Create your trace.
//   var trace = {
//     x: cities,
//     y: population,
//     type: "bar"
//   };
  
//   // 6. Create the data array for our plot
//   var data = [trace];
  
//   // 7. Define our plot layout
//   var layout = {
//     title: "Cities that added more than 15,000 people in 2017",
//     xaxis: { title: "City" },
//     yaxis: { title: "2017 Population"}
//   };
  
//   // 8. Plot the chart to a div tag with id "bar-plot"
//   Plotly.newPlot("bar-plot", data, layout);
//

// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     else if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   init();
  
//

// function showFilter() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();

//     //Identify the date being selected.
//     var dateFilter = d3.select("#datetime").property("value");
//     var cityFilter = d3.select("#city").property("value");
//     var stateFilter = d3.select("#state").property("value");
//     var countryFilter = d3.select("#country").property("value");
//     var shapeFilter = d3.select("#shape").property("value");

//     // Filter the data down to just the selected date
//     // Adding in "if" statements to ensure not filtering by blank data (no blanks in dataset)
//     if (dateFilter != "") {
//         var filteredData = tableData.filter(sighting => sighting.datetime === dateFilter);
//     }

//     else if (dateFilter == "") {
//         var filteredData = tableData;
//     }
//     // Filter the data down by the City
//     if (cityFilter != "") {
//         var filteredData = filteredData.filter(sighting => sighting.city === cityFilter.toLowerCase());
//     }
//     else if (cityFilter == ""){
//         filteredData = filteredData;
//     }
//     // Filter the data down by the State
//     if (stateFilter != "") {
//         var filteredData = filteredData.filter(sighting => sighting.state === stateFilter.toLowerCase());
//     }
//     else if (stateFilter == "") {
//         filteredData = filteredData;
//     }
    
//     // Filter the data down by the Country
//     if (countryFilter != "") {
//         var filteredData = filteredData.filter(sighting => sighting.country === countryFilter.toLowerCase());
//     }
//     else if (countryFilter == "") {
//         filteredData = filteredData;
//     }

//     // Filter the data down by the Shape
//     if (shapeFilter != "") {
//         var filteredData = filteredData.filter(sighting => sighting.shape === shapeFilter.toLowerCase());
//     }
//     else if (shapeFilter == "") { 
//         filteredData = filteredData;
//     }; 

//     //Set tableData=filteredData so table creates on filtered Data
//     tableData=filteredData;

//     createTable();

//     //reset so filters can be adjusted and filtered Data will reset
//     tableData=data;
    
// };
