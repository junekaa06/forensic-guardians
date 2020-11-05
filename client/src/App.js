import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { PersonalInfo } from "./personal_info_page";
import { PersonalInfo2 } from "./personal_info_page_2";
import { PersonalInfo3 } from "./personal_info_page_3";
import { PersonalInfo4 } from "./personal_info_page_4";
import { PersonalInfo5 } from "./personal_info_page_5";
import { PersonalInfo6 } from "./personal_info_page_6";
import { PersonalInfo7 } from "./personal_info_page_7";
import { PersonalInfo8 } from "./personal_info_page_8";
import { LogInPage } from "./log_in_page";
import { TestLogin } from "./testLogin";
import { RegisterPage } from "./register";
import { Register2Page } from "./register_2";
import { PersonalInfo9 } from "./personal_info_page_9";
import { PersonalInfo10 } from "./personal_info_page_10";
import { PersonalInfo11 } from "./personal_info_page_11";
import { PersonalInfo12 } from "./personal_info_page_12";
import { PersonalInfo13 } from "./personal_info_page_13";
import { PersonalInfo14 } from "./personal_info_page_14";
import { Final } from "./final_page";
import { PageNotFound } from "./404"

class App extends Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.state = { databaseResponse: "" };
  }

  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/">
                  <Redirect to="/log_in_page" />
              </Route>
              <Route exact path="/personal_info">
                  <PersonalInfo />
              </Route>
              <Route exact path="/personal_info_2">
                <PersonalInfo2 />
              </Route>
              <Route exact path="/personal_info_3">
                <PersonalInfo3 />
              </Route>
              <Route exact path="/personal_info_4">
                <PersonalInfo4 />
              </Route>
              <Route exact path="/personal_info_5">
                <PersonalInfo5 />
              </Route>
              <Route exact path="/personal_info_6">
                <PersonalInfo6 />
              </Route>
              <Route exact path="/personal_info_7">
                <PersonalInfo7 />
              </Route>
              <Route exact path="/personal_info_8">
                <PersonalInfo8 />
              </Route>
              <Route exact path="/personal_info_9">
                <PersonalInfo9 />
              </Route>
              <Route exact path="/personal_info_10">
                <PersonalInfo10 />
              </Route>
              <Route exact path="/personal_info_11">
                <PersonalInfo11 />
              </Route>
              <Route exact path="/personal_info_12">
                <PersonalInfo12 />
              </Route>
              <Route exact path="/personal_info_13">
                <PersonalInfo13 />
              </Route>
              <Route exact path="/personal_info_14">
                <PersonalInfo14 />
              </Route>
              <Route exact path="/log_in_page">
                <LogInPage/>
              </Route>
              <Route exact path="/register_page">
                <RegisterPage/>
              </Route>
              <Route exact path="/confirmation">
                <Register2Page/>
              </Route>
              <Route exact path="/test_login">
                <TestLogin/>
              </Route>
              <Route exact path="/final">
                <Final/>
              </Route>
              <Route> 
                <PageNotFound/>
              </Route>
              <App />
            </Switch>
        </Router>
    );
  }
}
export default App;
