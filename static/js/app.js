
//1. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Assign the value of the dropdown menu option to a variable

function init() {

    d3.json('/data/samples.json').then(data => {
        var name = data.names;
        var dropdownMenu = d3.select("#selDataset");
        var selectedName = dropdownMenu.node().value.toString() == "940";

        // Creates the dropdown list to choose from
        name.forEach((id) => {
            dropdownMenu.append("option")
                .data(id)
                .text(id)
                .property("value", id)
                .enter()

        })

        showCharts("940");
    });
};

// This function is called when a dropdown menu item is selected

function showCharts(selectedName) {
    // Use D3 to select the dropdown menu
    d3.json('/data/samples.json').then(data => {
        //Fill in the metadata

        var name = data.names;
        var metadata = data.metadata;
        var filteredMeta = metadata.filter(info => info.id == selectedName)[0];

        console.log(filteredMeta)
        var tableInfo = d3.select("tbody");
        tableInfo.html("");


        Object.entries(filteredMeta).forEach(([k, v]) => {
            var newrow = tableInfo.append('tr');
            newrow.append('td').text(k.concat(": ", v));
        });

        //Create bar chart

        // Use sample_values as the values for the bar chart.
        // Use otu_ids as the labels for the bar chart.
        // Use otu_labels as the hovertext for the chart.

        var samples = data.samples;
        var filteredSamples = samples.filter(info => info.id == selectedName)[0];
        var sample_values = filteredSamples.sample_values;

        var otu_id_prefix = "OTU ";
        var otu_ids = filteredSamples.otu_ids;
        var otu_id_label = otu_ids.map(otu_label => otu_id_prefix.concat(" ", otu_label))
        var otu_labels = filteredSamples.otu_labels;

        var trace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_id_label.slice(0, 10),
            text: otu_labels.slice(0, 10),
            orientation: 'h',
            type: 'bar'
        };
        var data = [trace];

        var layout = {
            title: "Top 10 OTUs Found",

        };

        Plotly.newPlot("bar", data, layout);

        //Create bubble chart
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.

        var trace1 = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
        }]

        var layout_bubble = {
            xaxis: {
                title: 'OTU ID',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'orange'
                }
            }
        }
        Plotly.newPlot('bubble', trace1, layout_bubble)
    });
};


//4. Display the sample metadata, i.e., an individual's demographic information.

// function showMetaData() {
//     var tableInfo = d3.select("tbody");
//     tableInfo.html("");

//     d3.json('/data/samples.json').then(data => {
//         var rawData = data;
//         var name = data.names;

//         var metadata = data.metadata;
//         var metaID = data.metadata.id;
//         var ethnicity = data.metadata.ethnicity;
//         var gender = data.metadata.gender;
//         var age = data.metadata.age;
//         var location = data.metadata.location;
//         var bbtype = data.metadata.bbtype;
//         var wfreq = data.metadata.wfreq;



//         var dropdownMenu = d3.select("#selDataset");
//         var dropdownMenuID = dropdownMenu.id;
//         var selectedOption = dropdownMenu.value;
//         console.log(selectedOption);

//         var selectedName = dropdownMenu.property("value");
//         var filteredData = metadata.filter(demographics => demographics.id == selectedName);


//         filteredData.forEach((one_row) => {
//             var newrow = tableInfo.append('tr');
//             Object.entries(filteredData[0]).forEach(([k, v]) => {
//                 newrow.append('td').text(k, v);
//             });
//         });

//     });
// };

// // showMetaData();


// // 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// // 6. Update all of the plots any time that a new sample is selected

init();