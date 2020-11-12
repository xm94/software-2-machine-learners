const { CanvasRenderService } = require('chartjs-node-canvas');
fs = require('fs');

const width = 800;
const height = 800;
const chartCallback = (ChartJS) => {

    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
        // plugin implementation
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
    });
};
const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

exports.generate = async function generate(vals){
    console.log('in generate');
    const configuration = {
        type: 'bar',
        data: {
            labels: ['INFO', 'VERY LOW', 'LOW', 'MED', 'HIGH', 'VERY HIGH'],
            datasets: [{
                label: 'Finding Risk',
                data: vals,
                backgroundColor: [
                    'rgb(218, 165, 32)',
                    'rgb(10, 10, 10)',
                    'rgb(10, 10, 10)',
                    'rgb(10, 10, 10)',
                    'rgb(10, 10, 10)',
                    'rgb(10, 10, 10)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false ,
                labels: {
                    fontColor: "black",
                }
            },
            labels: {
                fontColor: "black",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontStyle: "bold",
                        fontSize: 18,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontFamily: "Arial",
                        fontStyle: "bold",
                        fontSize: 18,
                        beginAtZero: true
                    }
                }]
            }
        }
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    console.log("before output");
    fs.writeFile("chart.jpg", image,function (err) {
        if (err) return console.log(err);
        return console.log('Created Chart');
      })

}

