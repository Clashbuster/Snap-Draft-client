import React from 'react';



export default class DeleteNovel extends React.Component {
constructor(){
    super()
    this.state = {
        areYouSure: false
    }
}


handleClick(){
    if(this.state.areYouSure === false){
        this.setState({areYouSure: true})
    } else {
        this.setState({
            areYouSure: false
        })
        this.props.deleteNovel()
    }
}




    render(){
        return (
            <div className=" d-flex flex-column mx-5" >
                <div className="Subhead">
                    <div className="Subhead-heading">Delete Selected Novel?</div>
                </div>
                <button onClick={e => this.handleClick(e)} className="btn btn-large btn-danger mr-2" type="button">{this.state.areYouSure? "I'm Positive" : "Delete"}</button>
                </div>
        )
    }
}