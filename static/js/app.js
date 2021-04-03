//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Assign the value of the dropdown menu option to a variable

function init() {

    d3.json('data/samples.json').then(data => {
        var name = data.names;
        var dropdownMenu = d3.select("#selDataset");
        // var selectedName = dropdownMenu.node().value.toString() == "940";

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
    d3.json('data/samples.json').then(data => {
        //Fill in the metadata
        var name = data.names;
        var metadata = data.metadata;
        var filteredMeta = metadata.filter(info => info.id == selectedName)[0];

        var tableInfo = d3.select("tbody");
        tableInfo.html("");


        Object.entries(filteredMeta).forEach(([k, v]) => {
            var newrow = tableInfo.append('tr');
            newrow.append('td').text(k.concat(": ", v));
        });

        //Create bar chart

        var samples = data.samples;
        var filteredSamples = samples.filter(info => info.id == selectedName)[0];
        var sample_values = filteredSamples.sample_values;

        var otu_id_prefix = "OTU ";
        var otu_ids = filteredSamples.otu_ids;
        var otu_id_label = otu_ids.map(otu_label => otu_id_prefix.concat(" ", otu_label))
        var otu_labels = filteredSamples.otu_labels;

        var trace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_id_label.slice(0, 10).reverse(),
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
        Plotly.newPlot('bubble', trace1, layout_bubble);

        //Create gauge
        var washFrequency = filteredMeta.wfreq;

        var gauge_data = [
            {
                type: "indicator",
                mode: "gauge+number",
                domain: { 'x': [0, 1], 'y': [0, 1] },
                value: washFrequency,
                text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
                textInfo: "text",
                textposition: "inside",
                hoverinfo: "text",
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "deeppink"},
                    borderwidth: 1,
                    bordercolor: "white",
                    steps: [
                        { range: [0, 1], color: "oldlace" },
                        { range: [1, 2], color: "papayawhip" },
                        { range: [2, 3], color: "moccasin" },
                        { range: [3, 4], color: "peachpuff" },
                        { range: [4, 5], color: "mistyrose" },
                        { range: [5, 6], color: "pink" },
                        { range: [6, 7], color: "lightpink" },
                        { range: [7, 8], color: "palevioletred" },
                        { range: [8, 9], color: "mediumvioletred" },
                    ],

                }
            }
        ];

        var gauge_layout = {
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week', font: { size: 12 },
            width: 500,
            height: 400,
            margin: { t: 30, r: 0, l: 0, b: 0 },
        };
    
    Plotly.newPlot('gauge', gauge_data, gauge_layout);
    });
};


init();