import React from 'react';
import Fetcher from '../HOC/Fetcher';
import ChapterCard from './ChapterCard.js'
import Blank from '../HOC/Blank.js'
import {Paragraph, TextRun, Document, Packer} from "docx";
import { AlignmentType, Footer, Header, PageBreak, PageNumber, PageNumberFormat } from "docx";
import {saveAs} from "file-saver";

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



    handleDownloadClick(e){
        const doc = new Document();

        let alltext = this.props.chapters.map((item, index) => {
            return new Paragraph({
                children: [new TextRun("\n\n"+ item.title + "\n\n" ) , new TextRun(item.content)],
            })
        })

        let index = this.props.chapters.map((item, index) => {
            return new Paragraph({
                children: [new TextRun("\n\n"+ item.title + "\n")],
            })
        })

        let title = new Paragraph({
            children: [new TextRun({
                text: this.props.novelInfo.title + "\n\n"
            }), new TextRun(`By: ${localStorage.getItem('user')}`)],
        })

        // doc.addSection({
        //     headers: {
        //         default: new Header({
        //             children: [
        //                 new Paragraph(PageNumber.CURRENT + " of " + PageNumber.TOTAL_PAGES),
        //             ],
        //         }),
        //     }
        // });


        doc.addSection({
            headers: {
                default : new Header({
                    children : [
                        new Paragraph ({
                            children: [
                                new TextRun({
                                    children: ["Page ", PageNumber.CURRENT],
                                }),
                                new TextRun({
                                    children: [" of ", PageNumber.TOTAL_PAGES],
                                })
                            ]
                        })
                    ]
                })
            },
            children: [title]
        })
        doc.addSection({
            children: index
        })

        alltext.forEach(item => {
            doc.addSection({
                children: [item]
            })
        })

        Packer.toBlob(doc).then((blob) => {
            // saveAs from FileSaver will download the file
            saveAs(blob, `${this.props.novelInfo.title}.docx`);
        });
    }

    render(){
        return (
            <div className="mx-5">
                <div className="pagehead">
                    <h1>{this.props.novelInfo.title}</h1>
                </div>

                <div className="Subhead">
                    <div className="Subhead-heading border-bottom-0 d-flex">Index</div>
                    <div className="Subhead-actions"><button onClick={e => this.handleDownloadClick(e)} className="btn btn-sm">Download</button> </div>
                </div>
                <nav className="menu border-0" aria-label="Person settings">
                    {this.displayIndex()}
                </nav>
               

              
                {this.displayChapters()}
            </div>
        )
    }
}