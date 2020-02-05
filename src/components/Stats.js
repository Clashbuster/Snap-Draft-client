import React from 'react';
import WordCountSVG from "./WordCountSVG.js";



export default class Stats extends React.Component {

    constructor(){
        super()
        this.myRef = React.createRef()
        this.state = {
            data : [1,5,3,7,9,2,5,6,8,3,6,5,4,99],
            data1 : [1,5,8,3,5,9,3,5,8,67,34,78,23],
            data2 : [56,78,23,4,5,7,3],
            data3 : [34,2,5,7,3,4,56,23,12]
        }
    }


    // {
    //     wordCount : null,
    //     longestWord : "",
    //     AVGWordLength : "",
    //     numberOfUniqueWords : null,
    //     mostUsed: "",
    //     wordList: [{
    //         name: "the",
    //         full: 73,
    //         chapter1: 23,
    //         chapter2: 12,
    //         chapter3: 7
    //     }, {
    //         name: "hello",
    //         full: 45,
    //         chapter1: 21,
    //         chapter2: 9,
    //         chapter3: 7
    //     }]
    // }


    displayChart(){
       
    }

    

    render(){
        return (
            <div className="mx-5">
                    <div className="pagehead">
                        <h1>{this.props.novelInfo.title}</h1>
                    </div>
                    <div className="Box text-left border-top-0 border-bottom-0 border-left-0 border-right-0">
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Word Count</strong>
                        </div>
                        <strong>{this.props.data.wordCount}</strong>
                    </div>
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Longest Word</strong>
                        </div>
                        <strong>{this.props.data.longestWord}</strong>
                    </div>
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Average Word Length</strong>
                        </div>
                        <strong>{this.props.data.AVGWordLength}</strong>
                    </div>
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Unique Words</strong>
                        </div>
                        <strong>{this.props.data.numberOfUniqueWords}</strong>
                    </div>
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Most Used Word</strong>
                        </div>
                        <strong>{this.props.data.mostUsed}</strong>
                    </div>  
                </div>
                <WordCountSVG data={this.props.data.wordList}></WordCountSVG>
            </div>
        )
    }
}