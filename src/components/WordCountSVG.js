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
                },
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0 
            }
        });
    }

    determineHeight(){
        let height = this.props.data.words.length * 5
        if(height > 30000){
            height = 10000
        }
        return height
    }

    render() {
        return (
            <div className={"Box"}>
                <canvas
                    height={this.determineHeight()}
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }



    }