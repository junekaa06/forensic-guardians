import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class TestLogin extends Component {

    constructor(props) {
        super(props);
        this.state = { loginResponse: " " };
    }

    callLogin() {
        fetch("http://localhost:9000/userLogin?username=megan@forensicguardians.com&password=$2a$10$lOEEOk4VwulQx8vkzex7JOdpHswjcXHVV.072fEzu/PJ7y/FFdtX6", {
            credentials: "include", method: "get", headers: {"Access-Control-Allow-Origin": "http://localhost:9000"}, mode: 'cors'
        })
            .then(res => res.text())
            .then(res => this.setState({ loginResponse: res }));
    }

    componentWillMount() {
        this.callLogin();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/test_login">
                        <p>Login Test</p>
                        <div className="basicpage">
                            <p className="App-intro">{this.state.loginResponse}</p>
                            <p>hi</p>
                        </div>
                    </Route>
                </Switch>
            </Router>
        )
    }

}


