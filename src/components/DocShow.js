import React from 'react';




export default class DocShow extends React.Component {


    componentDidMount(){
        console.log(this.props.novel)
        
    }

    render(){
        return (
            <div>DocShow</div>
        )
    }
}