import React from 'react';
import Pcard from './Pcard.js'



export default class ChapterCard extends React.Component {


    renderContent(){
        return this.props.chapterDetails.content.split("\n").map((item, index) => {
            return <div key={index}><span>{item}</span><br></br></div>
            })
    }

    render(){
        // Fetcher.getChapters(localStorage.getItem('user'), this.props.novelInfo.title, this.setChapters)
        return (
            <div id={this.props.scrollLink} className="Box border-0">
                <div className="Box-header border-0 d-flex">
                    <h3 className="Box-title">
                    {this.props.chapterDetails.title}
                    </h3>
                </div>
                <div className="Box-body text-left">
                    {this.renderContent()}
                </div>
                
            </div>
        )
    }
}