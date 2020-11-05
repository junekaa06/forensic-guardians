import React, {Component} from 'react';
import './personal_info_page.css'
import logo2 from './logo2.png'
import logo3 from './logo3.png'
import TextField from '@material-ui/core/TextField'
import { PersonalInfo } from "./personal_info_page";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { RegisterPage } from "./register";

export class LogInPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loginResponse: "",
            username: "",
            password: "",
            redirect: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callLogin = this.callLogin.bind(this);

    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(() => ({
            [name]: value
        }));

        if (name === "username") {
            this.setState(() => ({
                username: value
            }));
        }

        if (name === "password") {
            this.setState(() => ({
                password: value
            }));
        }
    }

    callLogin(e) {
        e.preventDefault();
        if (this.state.username !== "" && this.state.password !== "") {
            fetch("http://localhost:9000/userLogin?username=" + this.state.username + "&password=" + this.state.password, {
                credentials: "include", method: "GET", headers: {"Access-Control-Allow-Origin": "http://localhost:9000"}, mode: 'cors'
            })
                .then(res => res.text())
                .then(res => {
                    this.setState({ loginResponse: JSON.parse(res) });
                    if (this.state.loginResponse.found === true ) {
                        this.setState( () => ({
                            redirect: "/personal_info"
                        }));
                    } else {
                        alert("The password was incorrect")
                    }
                });
        } else {
            alert("Please fill in all of the listed fields.")
        }
    }

    handleSubmit(e){
        this.callLogin(e);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/log_in_page">
                        <div className="basicpage">
                            <ul className="navbar">
                                <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                <li><a href="/log_in_page">Log In</a></li>
                                <li><a href="/register_page">Sign Up</a></li>
                            </ul>
                            <hr></hr>
                            <div className="logo3">
                                <img className="bannerImage" src={logo3} alt="Your Identity Assured"/>
                            </div>
                            <br/>
                            <div className="names">
                                <form className="grid-container" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <label/>
                                    <label>Email:</label>
                                    <TextField id="filled-basic" placeholder="Email" variant="filled" size="small" name="username" value={this.state.username} onChange={this.handleChange}/>
                                    <label/>
                                    <label/>
                                    <label/>
                                    <label>Password:</label>
                                    <TextField id="filled-basic" placeholder="Password" variant="filled" size="small" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                    <label/>
                                    <label/>
                                    <label/>
                                    <label/>
                                    <Button type="submit" variant="contained" value="Log In">Submit</Button>
                                    <label/>
                                    <label/>
                                    <label/>
                                    <label/>
                                    <a href="default.asp"><p className="center2">Forgot Your Password?</p></a>
                                </form>
                            </div>
                            <br/>
                            <hr/>
                        </div>
                    </Route>
                    <Route exact path="/personal_info">
                        <PersonalInfo />
                    </Route>
                    <Route exact path="/log_in_page">
                        <LogInPage/>
                    </Route>
                    <Route exact path="/register_page">
                        <RegisterPage/>
                    </Route>
                </Switch>
        </Router>
        )
    }
}