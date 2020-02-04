import React from 'react';
import Fetcher from '../HOC/Fetcher';
import ChapterCard from './ChapterCard.js'
import Blank from '../HOC/Blank.js'

import { Link as Slink, animateScroll as scroll } from "react-scroll";



export default class DocShow extends React.Component {


    setChapters = (data) => {
        return data
    }

    displayChapters(){
        if (this.props.chapters[0]){
            return this.props.chapters.map((item, index) => {
                return <ChapterCard scrollLink={`chapter${index}`} chapterDetails={item} key={index}></ChapterCard>
            })
        } else {
            return ""
        }
    }

    componentDidUpdate(){
        console.log(this.props.chapters)
                // Fetcher.getChapters(localStorage.getItem('user'), this.props.novelInfo.title, this.setChapters)

    }

    displayIndex(){
        if (this.props.chapters[0]){
            return this.props.chapters.map((item, index) => {
                return <Slink offset={-60}  duration= {500} smooth={true} to={`chapter${index}`}  key={index} className="menu-item text-left" href="#url">{item.title}</Slink>
            })
        } else {
            return <Blank></Blank>
        }
    }

    render(){
        return (
            <div className="mx-5">
                <div className="pagehead">
                    <h1>{this.props.novelInfo.title}</h1>
                </div>

                <div className="Subhead">
                    <div className="Subhead-heading border-bottom-0 d-flex">Index</div>
                </div>
                <nav className="menu border-0" aria-label="Person settings">
                    {this.displayIndex()}
                </nav>
               

              
                {this.displayChapters()}
            </div>
        )
    }
}