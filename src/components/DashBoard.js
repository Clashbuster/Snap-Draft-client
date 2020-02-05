import React from 'react';
import Fetcher from '../HOC/Fetcher.js'
import NovelButton from './NovelButton.js'
import PageButton from './PageButton.js'
import Sprint from "./Sprint.js"
import DocShow from "./DocShow.js"
import Stats from "./Stats.js"
import MissionStatement from "./MissionStatement.js"
import DeleteNovel from "./DeleteNovel.js"
import NewNovelForm from "./NewNovelForm.js"
import Blank from '../HOC/Blank.js'





export default class DashBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            novels : [],
            selectedNovel : "",
            pageSelection : "",
            novelToSend: {},
            chaptersToSend: [],
            statsData : {
                wordCount : "",
                longestWord : "",
                avgWordLength : "",
                numberOfUniqueWords : "",
                wordList: {
                    words : [],
                    chapters : [] 
                }
            }
        }
        this.getNovels()
    }

    deleteNovel = () => {
        // console.log("deleting", this.state.selectedNovel)
        Fetcher.deleteNovel(localStorage.getItem('user'), this.state.selectedNovel, this.finalizeDeletion)
        
    }

    finalizeDeletion = () => {
        this.setState({selectedNovel: ""})
        this.getNovels()
    }


    sprintSubmitHandler = (data) => {
        console.log(data, 'sprint submitted')
        this.setState({chaptersToSend: data})
    }

    getNovels(){
        Fetcher.getNovels(localStorage.getItem('user'), this.populateState)
    }

    submitNewNovel = (novelObj) => {
        console.log(novelObj, 'novel submitted from dashboard')
        Fetcher.postNewNovel(localStorage.getItem('user'), novelObj, this.addNewNovelToState)
    }

    addNewNovelToState = (data) => {
        this.setState(prev => {
            return {novels: [...prev.novels, data]} 
        })
    }

    populateState = (data) => {
        this.setState({novels: data})
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    updateChapters = (data)=>{
        this.setState({chaptersToSend : data })
    }

    updateStats = (data)=> {
        this.setState({statsData : data})
    }

    handleNovelClick = (e, title) => {
        e.preventDefault()
        Fetcher.getChapters(localStorage.getItem('user'), title, this.updateChapters)
        Fetcher.getStats(localStorage.getItem('user'), title, this.updateStats)

        this.setState({
            selectedNovel: title,
            novelToSend: this.findNovel(title)
        })

    }

    handlePageSelection = (e, selection) => {
        e.preventDefault()
        this.setState({pageSelection: selection}, () => {
            this.props.changePageState(selection)
        })
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
            <PageButton handleClick={this.handlePageSelection} key={3} pageSelection={this.state.pageSelection} name={'Sprint'}></PageButton>,
            <PageButton handleClick={this.handlePageSelection} key={4} pageSelection={this.state.pageSelection} name={'x'}></PageButton>
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

    findNovel(title){
        return this.state.novels.find(e => {
           return e.title === title
        })
    }

    generateView(){

            if(this.state.selectedNovel === "+"){
                return <NewNovelForm existingNovels={this.state.novels} submitNewNovel={this.submitNewNovel} ></NewNovelForm>
            }

        switch (this.state.pageSelection){
            case "Doc":
                return <DocShow chapters={this.state.chaptersToSend} novelInfo={this.state.novelToSend} selectedNovel={this.state.selectedNovel}></DocShow>
            case "Sprint":
                return <Sprint sprintSubmitHandler={this.sprintSubmitHandler} novelInfo={this.state.novelToSend} selectedNovel={this.state.selectedNovel}></Sprint>
            case "Stats" :
                return <Stats data={this.state.statsData} novelInfo={this.state.novelToSend} selectedNovel={this.state.selectedNovel}></Stats>
            case "x" :
                return <DeleteNovel deleteNovel={this.deleteNovel}></DeleteNovel>
            default :
            return <MissionStatement></MissionStatement>
        }
    }

    generateStatement(){
        return <a href="#url"  className="tabnav-tab">Select or Create a Novel</a>
        }

    checkState(){
        switch(this.state.selectedNovel){
            case "+":
                return false
            case "":
                return false
            default:
                return true
        }
    }


    render(){
        return (
            <div className="d-flex flex-column mx-5">
               <div className="tabnav d-flex mt-3">
                <nav key={190} className="tabnav-tabs" aria-label="novels">
                    {this.generateNovelTags()}
                    {this.generateAddNovelTag()}
                </nav>
                </div>
                <div className="tabnav d-flex">
                <nav key={192} className="tabnav-tabs" aria-label="pages">
                    {this.checkState()? this.generatePageTags() : this.generateStatement()}
                </nav>
                </div>
                <div className="">
                    {this.generateView()}
                    </div>
            </div>
        )
    }
}