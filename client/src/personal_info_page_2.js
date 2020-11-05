import React, {Component} from 'react';
import './personal_info_page.css'
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {PersonalInfo3} from "./personal_info_page_3";
import {PersonalInfo} from "./personal_info_page";
import logo2 from './logo2.png';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class PersonalInfo2 extends Component{

    constructor(props) {
        super(props);

        this.state = {
            idDocumentType: '',
            idDocumentNumber: '',
            idDocumentPicture: '',

            occupation: '',
            corporatePhone: '',
            employer: '',
            corporateAddress: '',

            maritalStatus: '',
            partnerName: ''
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
            if (this.state.idDocumentType !== '' && this.state.idDocumentNumber !== '' && this.state.idDocumentPicture !== '' && this.state.occupation !== ''
                && this.state.corporatePhone !== '' && this.state.employer !== '' && this.state.corporateAddress !== '' && this.state.maritalStatus !== ''
                && this.state.partnerName !== '') {
            fetch("http://localhost:9000/updateProfile2?iddocumenttype="
                + this.state.idDocumentType
                + "&iddocumentnumber="
                + this.state.idDocumentNumber
                + "&occupation="
                + this.state.occupation
                + "&corporatephone="
                + this.state.corporatePhone
                + "&employer="
                + this.state.employer
                + "&corporateaddress="
                + this.state.corporateAddress
                + "&maritalstatus="
                + this.state.maritalStatus
                + "&partnername="
                + this.state.partnerName, {
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
        alert("the form was submitted: " + this.state.idDocumentType);
        this.setState({ redirect: "/personal_info_3" })
    }

    state = { redirect: null };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/personal_info_2">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                                <hr/>
                                <div className="identity_document">
                                    <h1>Identity Document</h1>
                                        <div className="grid-container">
                                            <label>
                                                Identity Document Type:
                                            </label>
                                            <FormControl variant="filled" className="idDocumentType dropdown">
                                                <InputLabel id="simple-select-filled-label">Identity Document Type</InputLabel>
                                                <Select
                                                    labelId="simple-select-filled-label"
                                                    id="simple-select-filled"
                                                    name="idDocumentType"
                                                    value={this.state.idDocumentType}
                                                    onChange={this.handleChange}
                                                >
                                                    <MenuItem value="passport">Passport</MenuItem>
                                                    <MenuItem value="driversLicense">Drivers License</MenuItem>
                                                    <MenuItem value="governmentID">Citizenship Card</MenuItem>
                                                    <MenuItem value="militaryId">Military ID</MenuItem>
                                                    <MenuItem value="birthCertificate">Birth Certificate</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <label/>
                                            <label>
                                                Identity Document Number:
                                            </label>
                                            <TextField id="filled-basic" placeholder="Identity Document Number" variant="filled" size="small" name="idDocumentNumber" value={this.state.idDocumentNumber} onChange={this.handleChange}/>
                                            <label>
                                                Identity Document Picture:
                                            </label>
                                            <input type="file" name="idDocumentPicture" value={this.state.idDocumentPicture} onChange={this.handleChange}/>
                                        </div>
                                </div>
                                <br/>
                                <hr/>
                                <div className="occupation">
                                    <h1>Occupation</h1>
                                        <div className="grid-container">
                                            <label>
                                            Occupation:
                                            </label>
                                        <TextField id="filled-basic" placeholder="Occupation" variant="filled" size="small" name="occupation" value={this.state.occupation} onChange={this.handleChange} />
                                            <label/>
                                            <label>
                                            Corporate Phone:
                                            </label>
                                        <TextField id="filled-basic" placeholder="Corporate Phone" variant="filled" size="small" name="corporatePhone" value={this.state.corporatePhone} onChange={this.handleChange}/>
                                            <label>
                                            Employer:
                                            </label>
                                        <TextField id="filled-basic" placeholder="Employer" variant="filled" size="small" name="employer" value={this.state.employer} onChange={this.handleChange}/>
                                            <label/>
                                            <label>
                                            Corporate Address:
                                            </label>
                                        <TextField id="filled-basic" placeholder="Corporate Address" variant="filled" size="small" name="corporateAddress" value={this.state.corporateAddress} onChange={this.handleChange}/>
                                        </div>
                                </div>
                                <br/>
                                <hr/>
                                <div className="marital_status">
                                    <h1>Marital Status</h1>
                                        <div className="grid-container">
                                            <label>
                                            Marital Status:
                                            </label>
                                            <FormControl variant="filled" className="maritalStatus dropdown">
                                                <InputLabel id="simple-select-filled-label">Marital Status</InputLabel>
                                                <Select
                                                    labelId="simple-select-filled-label"
                                                    id="simple-select-filled"
                                                    name="maritalStatus"
                                                    value={this.state.maritalStatus}
                                                    onChange={this.handleChange}
                                                >
                                                    <MenuItem value="Divorced">Divorced</MenuItem>
                                                    <MenuItem value="Engaged">Engaged</MenuItem>
                                                    <MenuItem value="Married">Married</MenuItem>
                                                    <MenuItem value="Partnership">Partnership</MenuItem>
                                                    <MenuItem value="Polygamous">Polygamous</MenuItem>
                                                    <MenuItem value="Seperated">Seperated</MenuItem>
                                                    <MenuItem value="Single">Single</MenuItem>
                                                    <MenuItem value="Widowed">Widowed</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <label/>
                                            <label>
                                            Spouse/Fiance/Partner Full Name:
                                            </label>
                                        <TextField id="filled-basic" placeholder="Partner Name" variant="filled" size="small" name="partnerName" value={this.state.partnerName} onChange={this.handleChange}/>
                                        </div>
                                </div>
                                <hr/>
                                <br/>
                                <div className="Button">
                                    <Button variant="contained" href="/personal_info" >
                                        Previous Page
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        Next Page
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <br/>
                    </Route>
                    <Route exact path="/personal_info">
                        <PersonalInfo />
                    </Route>
                    <Route exact path="/personal_info_3">
                        <PersonalInfo3 />
                    </Route>
                    <Route exact path="/personal_info_3">
                        <PersonalInfo3 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}