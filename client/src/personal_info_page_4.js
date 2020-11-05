import React, {Component} from 'react';
import './personal_info_page.css'
import { PersonalInfo6 } from "./personal_info_page_6";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo2 from './logo2.png'
import Button from "@material-ui/core/Button";
import {Final} from "./final_page";


export class PersonalInfo4 extends Component{

    handleSubmit() {
        console.log(this.state);
        alert("the form was submitted: " + this.state.firstName);
    }

    render() {
        return (
            <Router>
            <Switch>
            <div className="basicpage">
                <ul className="navbar">
                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                    <li><a href="/log_in_page">Log In</a></li>
                    <li><a href="/register_page">Sign Up</a></li>
                </ul>
                <hr/>
                <div style={{height: "800px"}}>
                    <iframe
                        src="https://calendly.com/krazz/fgi"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    />
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="Button">
                    <Button variant="contained" href="/personal_info_6" >
                        Previous Page
                    </Button>
                    <Button variant="contained" href="/final">
                        Submit
                    </Button>
                </div>
                <br/>
            </div>
                <Route exact path="/personal_info_6">
                    <PersonalInfo6 />
                </Route>
                <Route exact path="/final">
                    <Final />
                </Route>
            </Switch>
            </Router>
        )
    }
}