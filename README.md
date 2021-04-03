# Plotly: Belly Button Biodiversity

In this project, an interactive dashboard was built to explore the [Belly Button Biodiversity](http://robdunnlab.com/projects/belly-button-biodiversity/) dataset, which catalogs the microbes that colonize human navels.

The dataset reflects OTUs (operational taxonomic units) that were present in people in the study.

1. The D3 library was used to read in `samples.json`.

2. A drop-down menu was established for the page.  Data on the page is for the individual selected in the drop-down menu.

3. A horizontal bar chart was created that reflected the top 10 OTUs found in that individual.

    * Used `sample_values` as the values for the bar chart.

    * Used `otu_ids` as the labels for the bar chart.

    * Used `otu_labels` as the hovertext for the chart.
  
4. A bubble chart was created that displays each sample.

    * Used `otu_ids` for the x values.

    * Used `sample_values` for the y values.

    * Used `sample_values` for the marker size.

    * Used `otu_ids` for the marker colors.

    * Used `otu_labels` for the text values.

5. The sample metadata (an individual's demographic information) is displayed in a box off to the left, with the key-value pairs of the metadata.

6. The plots/information update any time that a new sample is selected.

7. A gauge was created to reflect the weekly washing frequency of the selected individual.
