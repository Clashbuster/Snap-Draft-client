import React from 'react';
import { render } from '@testing-library/react';



export default class NovelButton extends React.Component {
   

    checkSelection(){
        if(this.props.selectedNovel === this.props.novel.title){
            return  (<a href="#url" onClick={(e) => this.props.handleClick(e, this.props.novel.title)} className="tabnav-tab"  aria-current="page" >{this.props.novel.title}</a>)
        } else {
            return (<a href="#url" onClick={(e) => this.props.handleClick(e, this.props.novel.title)}  className="tabnav-tab" >{this.props.novel.title}</a>)
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

