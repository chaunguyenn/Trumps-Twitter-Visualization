//landing page
//source: https://codepen.io/Jonnaaay/pen/gpyqWv
document.addEventListener("DOMContentLoaded", function() {
  wait();
});

function wait(){
  console.log("Function Called");
  var e = document.getElementById('flex-container');
  e.preventDefault;
  e.className = e.className + " waited";
};

//graph 1
//source: https://plotly.com/javascript/filled-area-plots/

var plotDiv = document.getElementById('plot');
var traces = [
	{x: [2016,2017,2018,2019,2020,2021], y: [20,20,14,1,0,0], stackgroup: 'one', groupnorm:'percent', name:'iPad'},
	{x: [2016,2017,2018,2019,2020,2021], y: [1835,281,0,0,0], stackgroup: 'one', name:'Android'},
	{x: [2016,2017,2018,2019,2020,2021], y: [1817,1796,3034,4808,6194,104], stackgroup: 'one', name:'iPhone'}
];

Plotly.newPlot('myDiv1', traces, {title: 'Devices used by @realDonaldTrump to post tweets'});

//Graph 2
//source: https://plotly.com/javascript/filled-area-animation/
//data filtering: "Iphone/Androud only" filtering; remove retweets
//remove "https" to get rid of 0 sentiment; select "favorites" > 30
//year: 2017 and above 

d3.csv("https://raw.githubusercontent.com/chaunguyenn/deco3100/main/frequency%20data%20updated.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  var x = unpack(rows, 'Total Date')
  var y = unpack(rows, 'iPhone Frequency')
  var x2 = unpack(rows, 'Total Date')
  var y2 = unpack(rows, 'Android Frequency')

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'iPhone',
    x: unpack(rows, "Total Date"),
    y: unpack(rows, "iPhone Frequency"),
    line: {color: 'blue'}
  }

  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'Android',
    x: unpack(rows, "Total Date"),
    y: unpack(rows, "Android Frequency"),
    line: {color: 'orange'}
  }

  var data = [trace1,trace2];

  var layout = {
    title: 'Android vs iPhone Tweets Frequency',
    xaxis: {
      //range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
      showgrid: false,
      autorange: true,
      rangeselector: {
        buttons: [{
          count: 1,
          label: '1m',
          step: 'month',
          stepmode: 'backward'
        }, 
        {
          count: 6,
          label: '6m',
          step: 'month',
          stepmode: 'backward'
        }, 
        {
          count: 12,
          label: '12m',
          step: 'month',
          stepmode: 'backward'
        }, 
        {
          count: 24,
          label: '24m',
          step: 'month',
          stepmode: 'backward'
        },
        {
          step: 'all'
        }
      ]
    },
    type: 'date',
    rangeslider: {range: ['2016-01-01', '2021-03-08']}
  },
    yaxis: {
      autorange:true,
      showgrid: false
    }
  }
  Plotly.newPlot('myDiv', data, layout)
})

//graph 3
//Filter: Iphone sentiment only 

d3.csv("https://raw.githubusercontent.com/chaunguyenn/deco3100/main/iphone%20sentiment%20updated.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
  var x = unpack(rows,"Sentiment")
  var y = unpack(rows,"date")

  var trace3 = {
    y: unpack(rows,"Sentiment"),
    x: unpack(rows,"date"),
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 5,
      color: unpack(rows,"Sentiment").map(value=> value < 0 ? 'rgb(231, 76, 60)' : value == 0 ? 'rgb(213, 219, 219)' : 'rgb(46, 134, 193)')
    },
  }

  var data2 = [trace3];

  var layout2 = {
    xaxis: { autorange: true,},
    yaxis: { autorange: true,},
    title: 'Iphone Sentiment',
  };

  Plotly.newPlot("myDiv2", data2, layout2)
})

//graph 4
//Filter: Android sentiment only 
d3.csv("https://raw.githubusercontent.com/chaunguyenn/deco3100/main/android%20sentiment%20updated.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
    var x = unpack(rows,"Android Sentiment")
    var y = unpack(rows,"date")

  var trace4 = {
    y: unpack(rows,"Android Sentiment"),
    x: unpack(rows,"date"),
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 5,
      color: unpack(rows,"Android Sentiment").map(value=> value < 0 ? 'rgb(231, 76, 60)' : value == 0 ? 'rgb(213, 219, 219)' : 'rgb(46, 134, 193)')
    },
  };
  
  var data3 = [trace4];

  var layout3 = {
    xaxis: { autorange: true,},
    yaxis: {autorange: true,},
    title:'Android Sentiment'
  };
 Plotly.newPlot("myDiv3", data3, layout3)
})