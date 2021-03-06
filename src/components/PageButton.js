import React from 'react';
import { render } from '@testing-library/react';



export default class PageButton extends React.Component {
   

    checkSelection(){
        if(this.props.pageSelection === this.props.name){
            return  (<a href="#url" onClick={(e) => this.props.handleClick(e, this.props.name)} className="tabnav-tab"  aria-current="page" >{this.props.name === "x" ? this.props.octicon : this.props.name}</a>)
        } else {
        return (<a href="#url" onClick={(e) => this.props.handleClick(e, this.props.name)}  className="tabnav-tab" >{this.props.name === "x" ? this.props.octicon : this.props.name}</a>)
        }
    }

    render(){
         return (
         <>
            {this.checkSelection()}
        </>
         )
    }
}

