import React from 'react';
import Fetcher from '../HOC/Fetcher';



export default class Sprint extends React.Component {

    constructor(){
        super()
        this.state = {
            chapterTitle : "",
            sprintIncrement : "",
            sprintContent : "",
            submitText: "Submit",  
        }
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    countWords(s){
        return s.split(' ').filter(function(str){return str!=="";}).length;
    }

    displayRemainingWords(){
        let limit = this.props.novelInfo.sprint_increment
        let count = this.countWords(this.state.sprintContent)
        return limit - count
    }

    handleSubmit(e){
        if(this.state.submitText === "Submit"){
            this.setState({submitText: "Confirm"})
        } else if(this.state.submitText === "Confirm"){
            Fetcher.submitSprint(localStorage.getItem('user'), this.props.novelInfo.title, this.state.sprintContent, this.state.chapterTitle, this.props.sprintSubmitHandler)
            this.setState({
                
                    chapterTitle : "",
                    sprintIncrement : this.props.novelInfo.sprint_increment,
                    sprintContent : "",
                    submitText: "Submit"   
                
            })
        }
    }

    buttonColor(){
        if(this.state.submitText === "Submit"){
            return "btn"
        } else if (this.state.submitText === "Confirm"){
            return "btn btn-primary"
        }
    }

    showChapters(){
        return this.props.chapters.map((item, index) => {
            return <option key={index}>{item.title}</option>
        })
    }

    render(){
        return (
            <div className=" d-flex flex-column mx-5" >
                <div className="Box">
                    <div className="Box-header">
                        <h1 className="Box-title">
                        {this.displayRemainingWords()}
                        </h1>
                    </div>
                    <div className="Box-body">

                    <select onChange={e => this.handleChange(e)} className="form-select" name="chapterTitle" aria-label="Preference">
                        <option>Select Recipient</option>
                        {this.showChapters()}
                    </select>

                    <form>
                        <dl className="form-group">
                            <dt><label htmlFor="example-text">Start New Chapter (Optional)</label></dt>
                            <dd><input className="form-control" type="text" onChange={e => this.handleChange(e)} placeholder="Chapter Title" name="chapterTitle" value={this.state.chapterTitle} id="example-text" /></dd>
                        </dl>

                        <dl className="form-group">
                            <dt><label htmlFor="example-textarea">Sprint</label></dt>
                            <dd>
                            <textarea className="form-control" placeholder="Begin Sprint" id="example-textarea" name="sprintContent" onChange={e => this.handleChange(e)} value={this.state.sprintContent}></textarea>
                            </dd>
                        </dl>
                        </form>
                    </div>
                    <div className="Box-footer">
                        <button onClick={e => this.handleSubmit(e)} className={this.buttonColor()} type="button">{this.state.submitText}</button>
                    </div>
                    </div>
                </div>
        )
    }
}