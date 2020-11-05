import React, {Component} from 'react';
import './personal_info_page.css'
import TextField from "@material-ui/core/TextField";
import logo2 from './logo2.png';
import { Register2Page } from "./register_2";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

export class RegisterPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            telephone: '',
            email: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    callRegister(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            if (this.state.email !== '' && this.state.password !== '' && this.state.confirmPassword !== '' && this.state.telephone !== ''){
                fetch("http://localhost:9000/addUser?email=" + this.state.email + "&password=" + this.state.password, {
                    credentials: "include", method: "GET", headers: { "Access-Control-Allow-Origin": "http://localhost:9000" }, mode: 'cors'
                })
                    .then(res => res.text())
                    .then(res => {
                        this.setState({ registerResponse: JSON.parse(res) });
                        if (this.state.registerResponse.valid === true) {

                            this.setState(() => ({
                                redirect: "/confirmation"
                            }));
                        } else {
                            alert("This email is already in use. Please use a different email.")
                        }
                    });
                alert("the form was submitted: " + this.state.firstName);
            } else {
                alert("Please fill in all of the listed fields.")
            }
        } else {
            alert("Please make sure both the passwords match")
        }

    }

    handleSubmit(e) {
        this.callRegister(e);
    }

    state = { redirect: null };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/register_page">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                                <hr/>
                                <div className="next_of_kin">
                                    <h4>Basic Information</h4>
                                    <h1>Account Registration</h1>
                                    <div className="grid-container">
                                        <label>
                                            Email:
                                        </label>
                                            <TextField required id="filled-basic" placeholder="Email Address" variant="filled" size="small" name="email" value={this.state.email} onChange={this.handleChange}/>
                                        <label />
                                        <label>
                                            Password:
                                        </label>
                                            <TextField required id="filled-basic" type="password" placeholder="Password" variant="filled" size="small" name="password" value={this.state.password} onChange={this.handleChange}/>
                                        <label>
                                            Telephone:
                                        </label>
                                        <TextField required id="filled-basic" placeholder="Telephone" variant="filled" size="small" name="telephone" value={this.state.telephone} onChange={this.handleChange} />
                                        <label />
                                        <label>
                                            Confirm Password:
                                        </label>
                                            <TextField required id="filled-basic" type="password" placeholder="Confirm Password" variant="filled" size="small" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="Button">
                                    <Button variant="contained" type="submit">
                                        Sign Up
                                    </Button>
                                </div>
                            </form>
                            <br/>
                            <hr/>
                        </div>
                    </Route>
                    <Route exact path="/confirmation">
                        <Register2Page />
                    </Route>
                </Switch>
            </Router>
        )
    }
}