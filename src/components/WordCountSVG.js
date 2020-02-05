import React from 'react';
import Chart from "chart.js";


export default class WordCountSVG extends React.Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: 'horizontalBar',
            data: {
                //Bring in data
                labels: ["The", "Hello", "As", "run", "wave", "ouch", "bang", "ding", "whale"],
                datasets: [
                    {
                        label: "Chapter 1",
                        data: [87, 67, 91, 23, 0, 24, 0, 0],
                        backgroundColor: '#cd6684',
                        barThickness: 20
                    },
                    {
                        label: "Chapter 2",
                        data: [23, 12, 14, 15, 0, 0, 56],
                        backgroundColor: '#72b5b7',
                        barThickness: 20
                    },
                    {
                        label: "Chapter 3",
                        data: [5, 45, 12, 70, 0, 0, 32, 0, 10],
                        backgroundColor: '#eef9bf',
                        barThickness: 20
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div className={"Box"}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }



    }