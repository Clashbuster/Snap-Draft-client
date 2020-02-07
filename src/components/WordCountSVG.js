import React from 'react';
import Chart from "chart.js";
import Blank from '../HOC/Blank.js'


export default class WordCountSVG extends React.Component {

    constructor(){
        super()
        this.state = {
            chart : {}
        }
    }

    chartRef = React.createRef();

    
    

    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        let chart = new Chart(myChartRef, {
            type: 'bar',
            data: {
                //Bring in data
                labels: this.props.data.words,
                datasets: this.props.data.chapters
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

        this.setState({
            chart : chart
        })
    }

    componentDidUpdate(){
        // const myChartRef = this.chartRef.current.getContext("2d");
        this.removeData(this.state.chart)
        this.addData(this.state.chart, this.props.data.words, this.props.data.chapters)
    }

    
        addData(chart, label, data) {
            chart.data.labels = label;
            chart.data.datasets = data;
            chart.update();
        }
        
        removeData(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        }
    

   

    noStatsCheck(){
        if(this.props.data.words[0]){
            // sthis.defineChart()
            return (
                <canvas
                    height={500}
                    id="myChart"
                    ref={this.chartRef}
                />
            )
        } else {
            return <Blank></Blank>
        }
    }

    determineHeight(){

        let height = this.props.data.words.length * 5
        if(height > 30000){
            height = 8000
        }
        return height
    }

    render() {
        return (
            <div className={"Box border-0"}>
                 <canvas
                    height={90}
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )

    }
}