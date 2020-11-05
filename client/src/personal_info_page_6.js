import React, {Component} from 'react';
import './personal_info_page.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { PersonalInfo5 } from "./personal_info_page_5";
import logo2 from './logo2.png';
import Button from "@material-ui/core/Button";
import {PersonalInfo4} from "./personal_info_page_4";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export class PersonalInfo6 extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };
        this.state.displayFeatures = ""
    }

    callFeaturesList(){
        fetch("http://localhost:9000/getFeaturesList?section="
            + "all", {
            credentials: "include", method: "put", headers: { "Access-Control-Allow-Origin": "http://localhost:9000" }, mode: 'cors'
        })
            .then(res => res.text())
            .then(res => {
                this.setState({ features: JSON.parse(res) });
                if (this.state.features) {
                    this.setState({ displayFeatures: this.state.features.features })
                    console.log(this.state.displayFeatures)
                } else {
                    this.setState({ displayFeatures: "No features to display"} )
                }
            });

            // .then(res => {
            //     this.setState({ loginResponse: JSON.parse(res) });
            //     if (this.state.loginResponse.found === true) {
            //         this.setState(() => ({
            //             redirect: "/personal_info"
            //         }));
            //     } else {
            //         alert("The password was incorrect")
            //     }
            // });
    }


    componentWillMount() {
        this.callFeaturesList();
    };

    render() {
        const tabledata = Array.from(this.state.displayFeatures);

        return (
            <Router>
                <Switch>
                    <Route exact path="/personal_info_6">
                        <div className="basicpage">
                            <ul className="navbar">
                                <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                <li><a href="/log_in_page">Log In</a></li>
                                <li><a href="/register_page">Sign Up</a></li>
                            </ul>
                            <hr/>
                            <div className="HeightForm">
                                <h1>Add Features</h1>
                                <div className="grid-container_3">
                                    <div>
                                        <br/>
                                        <br/>
                                            <div className="button">
                                                <Button variant="contained" color="primary" type="submit" href="/personal_info_12">
                                                    Front Head
                                                </Button>
                                            </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_13" >
                                                Back Head
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_8">
                                                Chest
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_14">
                                                Abdomen
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_7">
                                                Right Arm
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_10">
                                                Left Arm
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_11">
                                                Right Leg
                                            </Button>
                                        </div>
                                        <br/>
                                        <div className="button">
                                            <Button variant="contained" color="primary" type="submit" href="/personal_info_9">
                                                Left Leg
                                            </Button>
                                        </div>
                                        
                                    </div>
                                    <div class="center">
                                        <img style={{width: 300, height: 600}} src={require("../src/man_front.png")} alt="Front of a Man"/>
                                    </div>
                                    <div>
                                    <p class="padding-left2">Added Features</p>
                                        
                                            <TableContainer class="padding-left2" component={Paper}>
                                                <Table className="featureTable" size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Item Number</TableCell>
                                                            <TableCell align="left">Type</TableCell>
                                                            <TableCell align="left">Location</TableCell>
                                                            <TableCell align="left">Description</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tabledata.map((features) => (
                                                            <TableRow key={features.seq}>
                                                                <TableCell align="left">{features.seq}</TableCell> 
                                                                <TableCell component="th" scope="row">
                                                                    {features.type}
                                                                </TableCell>    
                                                                <TableCell align="left">{features.place}</TableCell>
                                                                <TableCell align="left">{features.description}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <br/>
                            <div className="Button">
                                <Button variant="contained" href="/personal_info_5" >
                                    Previous Page
                                </Button>
                                <Button variant="contained" href="/personal_info_4">
                                    Next Page
                                </Button>
                            </div>
                        </div>
                    </Route>
                    <Route exact path="/personal_info_5">
                        <PersonalInfo5 />
                    </Route>
                    <Route exact path="/personal_info_4">
                        <PersonalInfo4 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}