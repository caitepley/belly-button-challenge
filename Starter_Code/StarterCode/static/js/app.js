// URL that the data is getting pulled from
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function to create the plots that will be displayed on the dashboard
function Plots(sample_id){
    d3.json(url).then(data => {
        // all of the sample data
        let samples = data.samples;
        // data for a specific sample in the form of an array
        let ind_sample_array = samples.filter(x => x.id == sample_id);
        // get the element that was filtered out
        // this is all of the data available for the specified sample_id
        ind_sample = ind_sample_array[0];
        // pull out otu_ids, otu_labels, and sample values
        otu_ids = ind_sample.otu_ids;
        otu_labels = ind_sample.otu_labels;
        sample_values = ind_sample.sample_values;

        // we only need the top 10
        otu_ids_sliced = otu_ids.slice(0,10);
        otu_labels_sliced = otu_labels.slice(0,10);
        sample_values_sliced = sample_values.slice(0,10);
        // reverse them to get the top 10 (a.k.a descending order)
        otu_ids_sliced = otu_ids_sliced.reverse();
        otu_labels_sliced = otu_labels_sliced.reverse();
        sample_values_sliced = sample_values_sliced.reverse();

        // add "OTU" to the out_ids
        otu_ids_sliced = otu_ids_sliced.map(x => `OTU ${x}`);

        //make the bar graph
        let bar_trace = {
            x: sample_values_sliced,
            y: otu_ids_sliced,
            text: otu_labels_sliced,
            type: 'bar',
            orientation: 'h'
        };

        let bar_layout = {
            title: "Top Ten Bacteria Found",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
          };

        // data array
        let bar_data = [bar_trace];

        // make the bubble chart
        let bubble_trace ={
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Blackbody'
            },
            text: otu_labels

        }

        // data array
        let bubble_data = [bubble_trace]

        let bubble_layout = {
            title: "Top Ten Bacteria Found",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
          };

        // Plot the data
        Plotly.newPlot("bar", bar_data, bar_layout);
        Plotly.newPlot("bubble", bubble_data, bubble_layout);

    });

}

// function to display the sample's metadata
function show_metadata(id){
    // get the metadata from the data file
    metadata = data.metadata;
    
    // filter out the metadata for the specific id

}

// make the default plot (id = 940) as well as populate the dropdown menu
function init() {
    // get sample ids from the dataset
    let dropdown_options = d3.select('#selDataset');

    d3.json(url).then(data => {

        let samples = data.names;

        // Populate the dropdown
        for (let i = 0; i < samples.length; i++) {
            let sample_id = samples[i];
            dropdown_options.append('option').text(sample_id).property('value', sample_id);
        };

        // set id to the first value to make the default graph
        let id = dropdown_options.property('value');

        // make the graphs for the sample
        Plots(id);

    });
}

// if a new option from the menu is selected, make the new graphs
function optionChanged(id) {
    Plots(id);
}

init();