import React, {Component} from 'react';
import './personal_info_page.css'
import logo2 from './logo2.png';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class Final extends Component{

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/final">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                                <hr/>
                                <div className="next_of_kin">
                                    <h4>Thank you for filling your information!</h4>
                                    <h1>We will review over this and send you an email soon</h1>
                                </div>
                            </form>
                            <br/>
                            <hr/>
                        </div>
                    </Route>
                </Switch>
            </Router>
        )
    }
}