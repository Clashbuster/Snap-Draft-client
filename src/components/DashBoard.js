import React from 'react';
import Fetcher from '../HOC/Fetcher.js'
import NovelButton from './NovelButton.js'
import PageButton from './PageButton.js'




export default class DashBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            novels : [],
            selectedNovel : "",
            pageSelection : ""
        }
        Fetcher.getNovels(localStorage.getItem('user'), this.populateState)
    }

    populateState = (data) => {
        this.setState({novels: data})
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    handleNovelClick = (title) => {
        this.setState({selectedNovel: title})
    }

    handlePageSelection = (selection) => {
        this.setState({pageSelection: selection})
    }

    generateNovelTags(){
        return this.state.novels.map((item) => {
        return <NovelButton handleClick={this.handleNovelClick} novel={item} key={item.id} selectedNovel={this.state.selectedNovel} ></NovelButton>
        })
    }

    generatePageTags(){
        return [
            <PageButton handleClick={this.handlePageSelection} key={1} pageSelection={this.state.pageSelection} name={'Doc'}></PageButton>,
            <PageButton handleClick={this.handlePageSelection} key={2} pageSelection={this.state.pageSelection} name={'Stats'}></PageButton>,
            <PageButton handleClick={this.handlePageSelection} key={3} pageSelection={this.state.pageSelection} name={'Sprint'}></PageButton>
        ]
    }

    addNewNovel(e){
        this.setState({selectedNovel: "+"})
        console.log('hello')
    }

    generateAddNovelTag(){
        if(this.state.selectedNovel === "+") {
            return <a onClick={e => this.addNewNovel(e)} href="#url" aria-current="page"  className="tabnav-tab">+</a>
        } else {
            return <a onClick={e => this.addNewNovel(e)} href="#url"  className="tabnav-tab">+</a>
        }
    }




    render(){
        return (
            <div className="border d-flex flex-column">
               <div className="tabnav">
                <nav className="tabnav-tabs" aria-label="Foo bar">
                    {this.generateNovelTags()}
                    {this.generateAddNovelTag()}
                </nav>
                </div>
                <div className="tabnav">
                <nav className="tabnav-tabs" aria-label="Foo bar">
                    {this.generatePageTags()}
                </nav>
                </div>
                <div className="p-5">View</div>
            </div>
        )
    }
}