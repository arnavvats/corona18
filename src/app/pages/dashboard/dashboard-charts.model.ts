export function RegistrationCount(registrationCount: Map<string, number>) {
  const lineChart = {
    chartType: 'line',
    datasets : [ {
                label: 'Registrations',
                data : [],
                fill : 'start'

    }],
    labels   : [],
    colors   : [
        {
            borderColor              : '#42a5f5',
            backgroundColor          : '#4aa3fc36',
            pointBackgroundColor     : '#1e88e5',
            pointHoverBackgroundColor: '#1e88e5',
            pointBorderColor         : '#ffffff',
            pointHoverBorderColor    : '#ffffff'
        }
    ],
    options  : {
        spanGaps           : false,
        legend             : {
            display: true
        },
        maintainAspectRatio: false,
        layout             : {
            padding: {
                top  : 32,
                left : 32,
                right: 32
            }
        },
        elements           : {
            point: {
                radius          : 4,
                borderWidth     : 2,
                hoverRadius     : 4,
                hoverBorderWidth: 2
            },
            line : {
                tension: 0
            }
        },
        scales             : {
            xAxes: [
                {
                    gridLines: {
                        display       : false,
                        drawBorder    : false,
                        tickMarkLength: 18
                    },
                    ticks    : {
                        fontColor: '#ffffff'
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                   ticks: {
                       beginAtZero: true,
                       callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                   }
                }
            ]
        }
    }
  };
  registrationCount.forEach((value, key) => {
   lineChart.labels.push(key);
   lineChart.datasets[0].data.push(value);
  });
  return lineChart;
}
export function roundsCountGraph(roundsGraph:  Map<number | string, number> ) {
  const pieGraph = {
    chartType: 'doughnut',
    datasets : [ {
      label: 'Rounds Count',
      data : [],
      fill : 'start'

    }],
    labels   : []
  };
  roundsGraph.forEach((roundCount, roundNumber) => {
    pieGraph.datasets[0].data.push(roundCount);
    if (roundNumber !== 'winner') {
      pieGraph.labels.push('Round ' + (<number>roundNumber + 1));
    } else {
      pieGraph.labels.push('Winnings');
    }
  });
  return pieGraph;
}
