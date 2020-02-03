import React from 'react';



export default class Stats extends React.Component {
    constructor(){
        super()
        this.state = {
            title: "",
            sprintIncrement: "",
            chapterTitle : "",
            showError: false
        }
    }

    handleNewNovelSubmit(){
        if( this.state.title !== ""){
            if (this.state.sprintIncrement !== ""){
                if (!isNaN(this.state.sprintIncrement) === true){
                    if (this.checkExistingNovels(this.state.title) === true){

                        let novelObj = {
                            title: this.state.title,
                            sprintIncrement: this.state.sprintIncrement,
                            chapterTitle : this.state.chapterTitle
                        }
                        this.props.submitNewNovel(novelObj)
                        this.setState({
                            title: "",
                            sprintIncrement: "",
                            chapterTitle : "",
                            showError: false
                        })


                    } else {
                        this.setState({showError : true}) 
                    }
                } else {
                    this.setState({showError : true})
                }
            } else {
                this.setState({showError : true})
            }
        } else {
            this.setState({showError : true})
        }
    }


    checkExistingNovels(title){
        let output = true
        this.props.existingNovels.forEach(item => {
            if(item.title === title){
                output = false
            }
        })
        return output
    }
   

    

    renderError(){
        return (
                    <div className="flash">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="octicon octicon-alert mr-2" aria-hidden="true">
                        <path
                        fillRule="evenodd"
                        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
                        />
                    </svg>
                    {"Your novel title must be unique and present. Your sprint must be a valid number"}
                    </div>
        )
    }


    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidUpdate(){
        console.log(this.state)
    }


    render(){
        return (
            <div className=" d-flex flex-column mx-5" >
            <div className="Box">
                <div className="Box-header">
                    <h1 className="Box-title">
                    Create a New Book
                    </h1>
                </div>
                <div className="Box-body">
                <form>
                    <dl className="form-group">
                        <dt><label htmlFor="example-text">Title</label></dt>
                        <dd><input onChange={e=>this.handleChange(e)} className="form-control" type="text"  placeholder="Novel Title" name="title" value={this.state.title} /></dd>
                    </dl>

                    <dl className="form-group">
                    <dt><label htmlFor="example-text">How many words would you like your sprints to be?</label></dt>
                        <dd><input onChange={e=>this.handleChange(e)} className="form-control" type="text"  placeholder="ex. 500" name="sprintIncrement" value={this.state.sprintIncrement} /></dd>
                    </dl>

                    <dl className="form-group">
                    <dt><label htmlFor="example-text">First Chapter Title</label></dt>
                        <dd><input onChange={e=>this.handleChange(e)} className="form-control" type="text"  placeholder="Chapter Title" name="chapterTitle" value={this.state.chapterTitle} /></dd>
                    </dl>
                    </form>
                </div>
                <div className="Box-footer">
                    <button onClick={e => this.handleNewNovelSubmit(e)} className="btn" type="button">Submit</button>
                </div>
                </div>
                {this.state.showError? this.renderError() : ""}
                
            </div>
        )
    }
}