import React from 'react';



export default class Stats extends React.Component {



    render(){
        return (
            <div className="mx-5">
                <div className="pagehead">
                    <h1>{this.props.novelInfo.title} statistics</h1>
                </div>
            </div>
        )
    }
}