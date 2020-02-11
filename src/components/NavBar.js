import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  
  import { Link as Slink, animateScroll as scroll } from "react-scroll";



export default class NavBar extends React.Component {

    displayLogoutNav(linkText){
        return (
            <div className="Header-item">
                <Link onClick={e => this.handlelogout()} to='/login'>{linkText}</Link>
            </div>
        )
    }

    displayTopScroll(){
        return (
        <div className="Header-item">
            <a href="lame" onClick={e => this.handleScrollClick(e)} >Top</a>
        </div>
        )
    }

    handleScrollClick(e){
        e.preventDefault()
        scroll.scrollToTop()
    }

    checkLogoutAbout(){
        let output = false
        let checker = 0
        if(this.props.loggedin === false){
            checker += 1
        }
        if (this.props.currentPage === "About"){
            checker += 1
        }
        if(checker === 2){
            output = true
        }
        return output
    }

   
    

    handlelogout(){
        localStorage.clear()
        this.props.changePageState('login')
    }

    render(){
        return (
            <div className="Header position-sticky top-0">
                <div className="Header-item">
                    <img height="30" width="30"className="logo" src={require('../snapdraft-logo.png')} alt="Smiley face" ></img>
                </div>
                <div className="Header-item flex-1">
                    Snap Draft
                </div>
               
                        <div className="Header-item">
                            <Link onClick={e => this.props.changePageState("About")} to='/mission-statement'>About</Link>
                        </div>
                       {this.props.loggedin ? this.displayLogoutNav("Log out") : null}
                       {this.props.currentPage === "Doc" ? this.displayTopScroll() : null}
                       {this.checkLogoutAbout() ? this.displayLogoutNav("Log in") : null }
            </div>
        )
    }
}