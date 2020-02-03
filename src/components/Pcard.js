import React from 'react';



export default class PCard extends React.Component {


   

    render(){
        // Fetcher.getChapters(localStorage.getItem('user'), this.props.novelInfo.title, this.setChapters)
        return (
            <div className="Box border-0">
                <span>{this.props.paragraph}</span><br></br>
            </div>
        )
    }
}