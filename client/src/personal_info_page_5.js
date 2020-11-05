import React, { Component } from 'react';
import './personal_info_page.css'
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PersonalInfo6 } from "./personal_info_page_6";
import { PersonalInfo3 } from "./personal_info_page_3";
import logo2 from './logo2.png';
import Button from "@material-ui/core/Button";


export class PersonalInfo5 extends Component{

    constructor(props) {
        super(props);

        this.state = {
            heightcm: "",
            heightinch: "",
            weightkg: "",
            weightlbs: "",
            eyecolour: "",

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

    callSubmit() {
        if (this.state.heightcm !== "" && this.state.heightinch !== "" && this.state.weightkg !== "" && this.state.weightlbs !== ""
            && this.state.eyecolour !== "") {
            fetch("http://localhost:9000/updateProfile5?heightcentimeters="
                + this.state.heightcm
                + "&height2="
                + this.state.heightinch
                + "&weightkilos="
                + this.state.weightkg
                + "&weight1="
                + this.state.weightlbs
                + "&generaldescription="
                + this.state.eyecolour, {
                credentials: "include", method: "put", headers: { "Access-Control-Allow-Origin": "http://localhost:9000" }, mode: 'cors'
            })
                .then(res => res.text())
                .then(res => this.setState({ loginResponse: res }));
        } else {
            alert("Please fill in all of the listed fields.")
        }
    }

    handleSubmit() {
        console.log(this.state);
        this.callSubmit();
        alert("the form was submitted");
        this.setState({ redirect: "/personal_info_6" })
    }

    state = { redirect: null };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/personal_info_5">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                                <hr/>
                                <div className="HeightForm">
                                    <h1>Height/Weight/Eye colour</h1>
                                    <div className="grid-container_2">
                                        <div>
                                            <br/>
                                            <br/>
                                            <label>
                                                Height(cm):
                                            </label>
                                                <TextField id="filled-basic" placeholder="Height(cm)" value={this.state.heightcm} name="heightcm" variant="filled" size="small" onChange={this.handleChange}/>
                                            <label/>
                                            <label>
                                                Height(inch):
                                            </label>
                                                <TextField id="filled-basic" placeholder="Height(inch)" value={this.state.heightinch} name="heightinch" variant="filled" size="small" onChange={this.handleChange}/>
                                            <label/>
                                            <label>
                                                Weight(kg):
                                            </label>
                                                <TextField id="filled-basic" placeholder="Weight(kg)" value={this.state.weightkg} name="weightkg" variant="filled" size="small" onChange={this.handleChange}/>
                                            <label/>
                                            <label>
                                                Weight(lbs):
                                            </label>
                                                <TextField id="filled-basic" placeholder="Weight(lbs)" value={this.state.weightlbs} name="weightlbs" variant="filled" size="small" onChange={this.handleChange}/>
                                            <label/>
                                            <label>
                                                Eye Colour:
                                            </label>
                                                <TextField id="filled-basic" placeholder="Eye Colour" value={this.state.eyecolour} name="eyecolour" variant="filled" size="small" onChange={this.handleChange}/>
                                            <label/>
                                        </div>
                                        <div>
                                            <img style={{width: 250, height: 500}} src={require("../src/man_front.png")} alt="Front of a Man"/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <br/>
                                <div className="Button">
                                    <Button variant="contained" href="/personal_info_3" >
                                        Previous Page
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        Next Page
                                    </Button>
                                </div>
                                <br/>
                            </form>
                        </div>
                    </Route>
                    <Route exact path="/personal_info_3">
                        <PersonalInfo3 />
                    </Route>
                    <Route exact path="/personal_info_6">
                        <PersonalInfo6 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}