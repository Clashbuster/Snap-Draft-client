import React from 'react';
import Fetcher from '../HOC/Fetcher.js'



export default class DeleteNovel extends React.Component {
constructor(){
    super()
    this.state = {
        areYouSure: false,
        sprintIncrement: "",
        error : ""
    }
}


handleClick(e){
    e.preventDefault()
    if(this.state.areYouSure === false){
        this.setState({areYouSure: true})
    } else {
        this.setState({
            areYouSure: false
        })
        this.props.deleteNovel()
    }
}

handleChange(e){
e.preventDefault()
this.setState({
    [e.target.name]: e.target.value
})
}

componentDidUpdate(){
    console.log(this.state)
}

changeIncrement(e){
    e.preventDefault()
    if(!isNaN(this.state.sprintIncrement) === true){
        let sprintObj = {
            novel: this.props.novelInfo.title,
            newSprint : Math.abs(this.state.sprintIncrement)
        }
        Fetcher.updateNovel(localStorage.getItem('user'), sprintObj, this.props.updateNovelToSend)
        this.setState({
            sprintIncrement: "",
            error : ""
        })
    } else {
        this.setState({
            error: "sprint increment must be a valid number"
        })
    }
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
                {this.state.error}
                </div>
    )
}




    render(){
        return (
            <div className="mx-5">
            <div className="pagehead">
                <h1>{this.props.novelInfo.title}</h1>
            </div>
            <div className="Box text-left border-top-0 border-bottom-0 border-left-0 border-right-0">
                    <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <strong>Delete Novel</strong>
                        </div>
                        <button onClick={e => this.handleClick(e)} className="btn btn-danger mr-2" type="button">{this.state.areYouSure? "I'm Positive" : "Delete"}</button>

                </div>
                <div className="Box-row d-flex flex-items-center">
                        <div className="flex-auto">
                        <input onChange={e=>this.handleChange(e)} className="form-control" type="text"  placeholder={this.props.novelInfo.sprint_increment} name="sprintIncrement" value={this.state.sprintIncrement} />
                        </div>
                        <button onClick={e => this.changeIncrement(e)} className="btn mr-2" type="button">Change Increment</button>

                    </div>

            </div>
            {this.state.error !== "" ? this.renderError() : null}
        </div>
        )
    }
}