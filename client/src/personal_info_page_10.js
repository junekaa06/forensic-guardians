import React, {Component} from 'react';
import './personal_info_page.css'
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PersonalInfo6 } from "./personal_info_page_6";
import { PersonalInfo11 } from "./personal_info_page_11";
import logo2 from './logo2.png';
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


export class PersonalInfo10 extends Component{

    constructor(props) {
        super(props);

        this.state = {
            feature: "",
            description: "",
            side: "",
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
        if (this.state.feature !== '' && this.state.side !== '' && this.state.description !== '') {
            fetch("http://localhost:9000/addBodyFeature?medicaltype="
                + "medical"
                + "&description="
                + this.state.description
                + "&type="
                + this.state.feature
                + "&place="
                + this.state.side + " side of Left Arm", {
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
        alert("the form was submitted: " + this.state.feature);
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
                    <Route exact path="/personal_info_10">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <ul className="navbar">
                                <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                <li><a href="/log_in_page">Log In</a></li>
                                <li><a href="/register_page">Sign Up</a></li>
                            </ul>
                            <hr/>
                            <div className="LeftArmFeatures">
                                <h1>Type of Features</h1>
                                <h4>Left Arm</h4>
                                <div className="grid-container_3">
                                    <div>
                                    <div class="padding-left3">
                                    <div class="inline-block">
                                    <label>
                                        Type of Feature:
                                    </label>
                                    </div>
                                        <FormControl variant="filled" className="feature dropdown" fullWidth="5%">
                                            <InputLabel id="simple-select-filled-label">Type of Feature</InputLabel>
                                            <Select
                                                labelId="simple-select-filled-label"
                                                id="simple-select-filled"
                                                name="feature"
                                                value={this.state.feature}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="Tattoo">Tattoo</MenuItem>
                                                <MenuItem value="Scar">Scar</MenuItem>
                                                <MenuItem value="Birth Mark">Birth Mark</MenuItem>
                                                <MenuItem value="Fracture">Fracture</MenuItem>
                                                <MenuItem value="Amputation">Amputation</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                        <br/>
                                        <div>
                                            <div>
                                                <div className="padding-left3">
                                                    <label>Description</label>
                                                    <TextField id="filled-basic" placeholder="Description" variant="filled"
                                                               multiline fullWidth="5%" name="description"
                                                               value={this.state.description} onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div>
                                            <div className="padding-left3">
                                                <label>Side (The way you are facing)</label>
                                                <FormControl variant="filled" className="side dropdown" fullWidth="5%">
                                                    <InputLabel id="simple-select-filled-label">Side</InputLabel>
                                                    <Select
                                                        labelId="simple-select-filled-label"
                                                        id="simple-select-filled"
                                                        name="side"
                                                        value={this.state.side}
                                                        onChange={this.handleChange}
                                                    >
                                                        <MenuItem value="Front">Front</MenuItem>
                                                        <MenuItem value="Left">Left</MenuItem>
                                                        <MenuItem value="Right">Right</MenuItem>
                                                        <MenuItem value="Back">Back</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="padding-left2">
                                            <div className="inline-block">
                                                <br/>
                                                <label>
                                                    Add Photo
                                                </label>
                                                <div className="inline-block2">
                                                    <input type="file" name="arm_feature"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="center">
                                        <img style={{width: 300, height: 600}} src={require("../src/right_arm_full.jpg")} alt="Arm"/>
                                    </div>
                                    <div className="padding-left">
                                        <label>Features Added</label>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <br/>
                            <div className="Button">
                                <Button variant="contained" type="submit">
                                    Back to Add Features
                                </Button>
                            </div>
                            <br/>
                        </form>
                        </div>
                    </Route>
                    <Route exact path="/personal_info_6">
                        <PersonalInfo6 />
                    </Route>
                    <Route exact path="/personal_info_11">
                        <PersonalInfo11 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}