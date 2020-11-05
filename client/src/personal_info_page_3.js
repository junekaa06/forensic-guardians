import React, {Component} from 'react';
import './personal_info_page.css'
import TextField from "@material-ui/core/TextField";
import logo2 from './logo2.png';
import {PersonalInfo2} from "./personal_info_page_2";
import {PersonalInfo5} from "./personal_info_page_5";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class PersonalInfo3 extends Component{

    constructor(props) {
        super(props);

        this.state = {
            kinFirstName: '',
            kinMiddleName: '',
            kinLastName: '',
            kinRelationship: '',

            kinFullAddress: '',
            kinPostalCode: '',
            kinCountry: '',

            kinMainPhone: '',
            kinEmail: '',
            kinOtherCommunication: ''
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

        if (name === "kinFirstName") {
            this.setState((state) => ({
                kinReportedFullName: value + " " + state.kinMiddleName + " " + state.kinLastName
            }));
        }
        else if (name === "kinMiddleName") {
            this.setState((state) => ({
                kinReportedFullName: state.kinFirstName + " " + value + " " + state.kinLastName
            }));
        }
        else if (name === "kinLastName") {
            this.setState((state) => ({
                kinReportedFullName: state.kinFirstName + " " + state.kinMiddleName + " " + value
            }));
        }
    }

    callSubmit() {
        if (this.state.kinFirstName !== ''&& this.state.kinMiddleName !== '' && this.state.kinLastName !== '' && this.state.kinRelationship !== ''
            && this.state.kinFullAddress !== '' && this.state.kinPostalCode !== '' && this.state.kinCountry !== '' && this.state.kinMainPhone !== ''
            && this.state.kinEmail !== '') {
            fetch("http://localhost:9000/updateKin?firstname="
                + this.state.kinFirstName
                + "&middlename="
                + this.state.kinMiddleName
                + "&lastname="
                + this.state.kinLastName
                + "&relationship="
                + this.state.kinRelationship
                + "&address="
                + this.state.kinFullAddress
                + "&country="
                + this.state.kinCountry
                + "&phone="
                + this.state.kinMainPhone
                + "&email="
                + this.state.kinEmail, {
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
        this.setState({ redirect: "/personal_info_5" })
    }

    state = { redirect: null };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/personal_info_3">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                            <hr/>
                            <div className="next_of_kin">
                                <h1>Next of Kin Details</h1>
                                <h1>Names</h1>
                                <div className="grid-container">
                                    <label>
                                        First Name:
                                    </label>
                                        <TextField id="filled-basic" placeholder="First Name" variant="filled" size="small" name="kinFirstName" value={this.state.kinFirstName} onChange={this.handleChange}/>
                                    <label/>
                                    <label>
                                        Middle Name:
                                    </label>
                                        <TextField id="filled-basic" placeholder="Middle Name" variant="filled" size="small" name="kinMiddleName" value={this.state.kinMiddleName} onChange={this.handleChange}/>
                                    <label>
                                        Last Name:
                                    </label>
                                        <TextField id="filled-basic" placeholder="Last Name" variant="filled" size="small" name="kinLastName" value={this.state.kinLastName} onChange={this.handleChange}/>
                                    <label/>
                                    
                                </div>
                            </div>
                            <br/>
                            <hr/>
                            <div className="administrative_details">
                                <h1>Administrative Details</h1>
                                    <div className="grid-container">
                                    <label>
                                        Relationship with You:
                                    </label>
                                        <FormControl variant="filled" className="kinRelationship dropdown">
                                            <InputLabel id="simple-select-filled-label">Relationship</InputLabel>
                                            <Select
                                                labelId="simple-select-filled-label"
                                                id="simple-select-filled"
                                                name="kinRelationship"
                                                value={this.state.kinRelationship}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="Mother">Mother</MenuItem>
                                                <MenuItem value="Father">Father</MenuItem>
                                                <MenuItem value="Sister">Sister</MenuItem>
                                                <MenuItem value="Brother">Brother</MenuItem>
                                                <MenuItem value="Wife">Wife</MenuItem>
                                                <MenuItem value="Husband">Husband</MenuItem>
                                                <MenuItem value="Partner">Partner</MenuItem>
                                                <MenuItem value="Daughter">Daughter</MenuItem>
                                                <MenuItem value="Son">Son</MenuItem>
                                                <MenuItem value="Family">Family</MenuItem>
                                                <MenuItem value="Guardian">Guardian</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                </div>
                            </div>
                            <br/>
                            <hr/>
                            <div className="usual_address">
                                <h1>Usual Address/Place of Residence</h1>
                                    <div className="grid-container">
                                        <label>
                                            Full Address:
                                        </label>
                                                <TextField id="filled-basic" placeholder="Address" variant="filled" size="small" name="kinFullAddress" value={this.state.kinFullAddress} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Country:
                                        </label>
                                        <FormControl variant="filled" className="kinCountry dropdown">
                                            <InputLabel id="simple-select-filled-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="kinCountry"
                                                value={this.state.kinCountry}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="AF">Afghanistan</MenuItem>
                                                <MenuItem value="AX">Aland Islands !Åland Islands</MenuItem>
                                                <MenuItem value="AL">Albania</MenuItem>
                                                <MenuItem value="DZ">Algeria</MenuItem>
                                                <MenuItem value="AS">American Samoa</MenuItem>
                                                <MenuItem value="AD">Andorra</MenuItem>
                                                <MenuItem value="AO">Angola</MenuItem>
                                                <MenuItem value="AI">Anguilla</MenuItem>
                                                <MenuItem value="AQ">Antarctica</MenuItem>
                                                <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                                                <MenuItem value="AR">Argentina</MenuItem>
                                                <MenuItem value="AM">Armenia</MenuItem>
                                                <MenuItem value="AW">Aruba</MenuItem>
                                                <MenuItem value="AU">Australia</MenuItem>
                                                <MenuItem value="AT">Austria</MenuItem>
                                                <MenuItem value="AZ">Azerbaijan</MenuItem>
                                                <MenuItem value="BS">Bahamas</MenuItem>
                                                <MenuItem value="BH">Bahrain</MenuItem>
                                                <MenuItem value="BD">Bangladesh</MenuItem>
                                                <MenuItem value="BB">Barbados</MenuItem>
                                                <MenuItem value="BY">Belarus</MenuItem>
                                                <MenuItem value="BE">Belgium</MenuItem>
                                                <MenuItem value="BZ">Belize</MenuItem>
                                                <MenuItem value="BJ">Benin</MenuItem>
                                                <MenuItem value="BM">Bermuda</MenuItem>
                                                <MenuItem value="BT">Bhutan</MenuItem>
                                                <MenuItem value="BO">Bolivia (Plurinational State of)</MenuItem>
                                                <MenuItem value="BQ">Bonaire, Sint Eustatius and Saba</MenuItem>
                                                <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                                                <MenuItem value="BW">Botswana</MenuItem>
                                                <MenuItem value="BV">Bouvet Island</MenuItem>
                                                <MenuItem value="BR">Brazil</MenuItem>
                                                <MenuItem value="IO">British Indian Ocean Territory</MenuItem>
                                                <MenuItem value="BN">Brunei Darussalam</MenuItem>
                                                <MenuItem value="BG">Bulgaria</MenuItem>
                                                <MenuItem value="BF">Burkina Faso</MenuItem>
                                                <MenuItem value="BI">Burundi</MenuItem>
                                                <MenuItem value="CV">Cabo Verde</MenuItem>
                                                <MenuItem value="KH">Cambodia</MenuItem>
                                                <MenuItem value="CM">Cameroon</MenuItem>
                                                <MenuItem value="CA">Canada</MenuItem>
                                                <MenuItem value="KY">Cayman Islands</MenuItem>
                                                <MenuItem value="CF">Central African Republic</MenuItem>
                                                <MenuItem value="TD">Chad</MenuItem>
                                                <MenuItem value="CL">Chile</MenuItem>
                                                <MenuItem value="CN">China</MenuItem>
                                                <MenuItem value="CX">Christmas Island</MenuItem>
                                                <MenuItem value="CC">Cocos (Keeling) Islands</MenuItem>
                                                <MenuItem value="CO">Colombia</MenuItem>
                                                <MenuItem value="KM">Comoros</MenuItem>
                                                <MenuItem value="CG">Congo</MenuItem>
                                                <MenuItem value="CD">Congo (Democratic Republic of the)</MenuItem>
                                                <MenuItem value="CK">Cook Islands</MenuItem>
                                                <MenuItem value="CR">Costa Rica</MenuItem>
                                                <MenuItem value="CI">Cote d'Ivoire !Côte d'Ivoire</MenuItem>
                                                <MenuItem value="HR">Croatia</MenuItem>
                                                <MenuItem value="CU">Cuba</MenuItem>
                                                <MenuItem value="CW">Curacao !Curaçao</MenuItem>
                                                <MenuItem value="CY">Cyprus</MenuItem>
                                                <MenuItem value="CZ">Czech Republic</MenuItem>
                                                <MenuItem value="DK">Denmark</MenuItem>
                                                <MenuItem value="DJ">Djibouti</MenuItem>
                                                <MenuItem value="DM">Dominica</MenuItem>
                                                <MenuItem value="DO">Dominican Republic</MenuItem>
                                                <MenuItem value="EC">Ecuador</MenuItem>
                                                <MenuItem value="EG">Egypt</MenuItem>
                                                <MenuItem value="SV">El Salvador</MenuItem>
                                                <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                                                <MenuItem value="ER">Eritrea</MenuItem>
                                                <MenuItem value="EE">Estonia</MenuItem>
                                                <MenuItem value="ET">Ethiopia</MenuItem>
                                                <MenuItem value="FK">Falkland Islands (Malvinas)</MenuItem>
                                                <MenuItem value="FO">Faroe Islands</MenuItem>
                                                <MenuItem value="FJ">Fiji</MenuItem>
                                                <MenuItem value="FI">Finland</MenuItem>
                                                <MenuItem value="FR">France</MenuItem>
                                                <MenuItem value="GF">French Guiana</MenuItem>
                                                <MenuItem value="PF">French Polynesia</MenuItem>
                                                <MenuItem value="TF">French Southern Territories</MenuItem>
                                                <MenuItem value="GA">Gabon</MenuItem>
                                                <MenuItem value="GM">Gambia</MenuItem>
                                                <MenuItem value="GE">Georgia</MenuItem>
                                                <MenuItem value="DE">Germany</MenuItem>
                                                <MenuItem value="GH">Ghana</MenuItem>
                                                <MenuItem value="GI">Gibraltar</MenuItem>
                                                <MenuItem value="GR">Greece</MenuItem>
                                                <MenuItem value="GL">Greenland</MenuItem>
                                                <MenuItem value="GD">Grenada</MenuItem>
                                                <MenuItem value="GP">Guadeloupe</MenuItem>
                                                <MenuItem value="GU">Guam</MenuItem>
                                                <MenuItem value="GT">Guatemala</MenuItem>
                                                <MenuItem value="GG">Guernsey</MenuItem>
                                                <MenuItem value="GN">Guinea</MenuItem>
                                                <MenuItem value="GW">Guinea-Bissau</MenuItem>
                                                <MenuItem value="GY">Guyana</MenuItem>
                                                <MenuItem value="HT">Haiti</MenuItem>
                                                <MenuItem value="HM">Heard Island and McDonald Islands</MenuItem>
                                                <MenuItem value="VA">Holy See</MenuItem>
                                                <MenuItem value="HN">Honduras</MenuItem>
                                                <MenuItem value="HK">Hong Kong</MenuItem>
                                                <MenuItem value="HU">Hungary</MenuItem>
                                                <MenuItem value="IS">Iceland</MenuItem>
                                                <MenuItem value="IN">India</MenuItem>
                                                <MenuItem value="ID">Indonesia</MenuItem>
                                                <MenuItem value="IR">Iran (Islamic Republic of)</MenuItem>
                                                <MenuItem value="IQ">Iraq</MenuItem>
                                                <MenuItem value="IE">Ireland</MenuItem>
                                                <MenuItem value="IM">Isle of Man</MenuItem>
                                                <MenuItem value="IL">Israel</MenuItem>
                                                <MenuItem value="IT">Italy</MenuItem>
                                                <MenuItem value="JM">Jamaica</MenuItem>
                                                <MenuItem value="JP">Japan</MenuItem>
                                                <MenuItem value="JE">Jersey</MenuItem>
                                                <MenuItem value="JO">Jordan</MenuItem>
                                                <MenuItem value="KZ">Kazakhstan</MenuItem>
                                                <MenuItem value="KE">Kenya</MenuItem>
                                                <MenuItem value="KI">Kiribati</MenuItem>
                                                <MenuItem value="KP">Korea (Democratic People's Republic of)</MenuItem>
                                                <MenuItem value="KR">Korea (Republic of)</MenuItem>
                                                <MenuItem value="KW">Kuwait</MenuItem>
                                                <MenuItem value="KG">Kyrgyzstan</MenuItem>
                                                <MenuItem value="LA">Lao People's Democratic Republic</MenuItem>
                                                <MenuItem value="LV">Latvia</MenuItem>
                                                <MenuItem value="LB">Lebanon</MenuItem>
                                                <MenuItem value="LS">Lesotho</MenuItem>
                                                <MenuItem value="LR">Liberia</MenuItem>
                                                <MenuItem value="LY">Libya</MenuItem>
                                                <MenuItem value="LI">Liechtenstein</MenuItem>
                                                <MenuItem value="LT">Lithuania</MenuItem>
                                                <MenuItem value="LU">Luxembourg</MenuItem>
                                                <MenuItem value="MO">Macao</MenuItem>
                                                <MenuItem value="MK">Macedonia (the former Yugoslav Republic of)</MenuItem>
                                                <MenuItem value="MG">Madagascar</MenuItem>
                                                <MenuItem value="MW">Malawi</MenuItem>
                                                <MenuItem value="MY">Malaysia</MenuItem>
                                                <MenuItem value="MV">Maldives</MenuItem>
                                                <MenuItem value="ML">Mali</MenuItem>
                                                <MenuItem value="MT">Malta</MenuItem>
                                                <MenuItem value="MH">Marshall Islands</MenuItem>
                                                <MenuItem value="MQ">Martinique</MenuItem>
                                                <MenuItem value="MR">Mauritania</MenuItem>
                                                <MenuItem value="MU">Mauritius</MenuItem>
                                                <MenuItem value="YT">Mayotte</MenuItem>
                                                <MenuItem value="MX">Mexico</MenuItem>
                                                <MenuItem value="FM">Micronesia (Federated States of)</MenuItem>
                                                <MenuItem value="MD">Moldova (Republic of)</MenuItem>
                                                <MenuItem value="MC">Monaco</MenuItem>
                                                <MenuItem value="MN">Mongolia</MenuItem>
                                                <MenuItem value="ME">Montenegro</MenuItem>
                                                <MenuItem value="MS">Montserrat</MenuItem>
                                                <MenuItem value="MA">Morocco</MenuItem>
                                                <MenuItem value="MZ">Mozambique</MenuItem>
                                                <MenuItem value="MM">Myanmar</MenuItem>
                                                <MenuItem value="NA">Namibia</MenuItem>
                                                <MenuItem value="NR">Nauru</MenuItem>
                                                <MenuItem value="NP">Nepal</MenuItem>
                                                <MenuItem value="NL">Netherlands</MenuItem>
                                                <MenuItem value="NC">New Caledonia</MenuItem>
                                                <MenuItem value="NZ">New Zealand</MenuItem>
                                                <MenuItem value="NI">Nicaragua</MenuItem>
                                                <MenuItem value="NE">Niger</MenuItem>
                                                <MenuItem value="NG">Nigeria</MenuItem>
                                                <MenuItem value="NU">Niue</MenuItem>
                                                <MenuItem value="NF">Norfolk Island</MenuItem>
                                                <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                                                <MenuItem value="NO">Norway</MenuItem>
                                                <MenuItem value="OM">Oman</MenuItem>
                                                <MenuItem value="PK">Pakistan</MenuItem>
                                                <MenuItem value="PW">Palau</MenuItem>
                                                <MenuItem value="PS">Palestine, State of</MenuItem>
                                                <MenuItem value="PA">Panama</MenuItem>
                                                <MenuItem value="PG">Papua New Guinea</MenuItem>
                                                <MenuItem value="PY">Paraguay</MenuItem>
                                                <MenuItem value="PE">Peru</MenuItem>
                                                <MenuItem value="PH">Philippines</MenuItem>
                                                <MenuItem value="PN">Pitcairn</MenuItem>
                                                <MenuItem value="PL">Poland</MenuItem>
                                                <MenuItem value="PT">Portugal</MenuItem>
                                                <MenuItem value="PR">Puerto Rico</MenuItem>
                                                <MenuItem value="QA">Qatar</MenuItem>
                                                <MenuItem value="RE">Reunion !Réunion</MenuItem>
                                                <MenuItem value="RO">Romania</MenuItem>
                                                <MenuItem value="RU">Russian Federation</MenuItem>
                                                <MenuItem value="RW">Rwanda</MenuItem>
                                                <MenuItem value="BL">Saint Barthelemy !Saint Barthélemy</MenuItem>
                                                <MenuItem value="SH">Saint Helena, Ascension and Tristan da Cunha</MenuItem>
                                                <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                                                <MenuItem value="LC">Saint Lucia</MenuItem>
                                                <MenuItem value="MF">Saint Martin (French part)</MenuItem>
                                                <MenuItem value="PM">Saint Pierre and Miquelon</MenuItem>
                                                <MenuItem value="VC">Saint Vincent and the Grenadines</MenuItem>
                                                <MenuItem value="WS">Samoa</MenuItem>
                                                <MenuItem value="SM">San Marino</MenuItem>
                                                <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                                                <MenuItem value="SA">Saudi Arabia</MenuItem>
                                                <MenuItem value="SN">Senegal</MenuItem>
                                                <MenuItem value="RS">Serbia</MenuItem>
                                                <MenuItem value="SC">Seychelles</MenuItem>
                                                <MenuItem value="SL">Sierra Leone</MenuItem>
                                                <MenuItem value="SG">Singapore</MenuItem>
                                                <MenuItem value="SX">Sint Maarten (Dutch part)</MenuItem>
                                                <MenuItem value="SK">Slovakia</MenuItem>
                                                <MenuItem value="SI">Slovenia</MenuItem>
                                                <MenuItem value="SB">Solomon Islands</MenuItem>
                                                <MenuItem value="SO">Somalia</MenuItem>
                                                <MenuItem value="ZA">South Africa</MenuItem>
                                                <MenuItem value="GS">South Georgia and the South Sandwich Islands</MenuItem>
                                                <MenuItem value="SS">South Sudan</MenuItem>
                                                <MenuItem value="ES">Spain</MenuItem>
                                                <MenuItem value="LK">Sri Lanka</MenuItem>
                                                <MenuItem value="SD">Sudan</MenuItem>
                                                <MenuItem value="SR">Suriname</MenuItem>
                                                <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                                                <MenuItem value="SZ">Swaziland</MenuItem>
                                                <MenuItem value="SE">Sweden</MenuItem>
                                                <MenuItem value="CH">Switzerland</MenuItem>
                                                <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                                                <MenuItem value="TW">Taiwan, Province of China[a]</MenuItem>
                                                <MenuItem value="TJ">Tajikistan</MenuItem>
                                                <MenuItem value="TZ">Tanzania, United Republic of</MenuItem>
                                                <MenuItem value="TH">Thailand</MenuItem>
                                                <MenuItem value="TL">Timor-Leste</MenuItem>
                                                <MenuItem value="TG">Togo</MenuItem>
                                                <MenuItem value="TK">Tokelau</MenuItem>
                                                <MenuItem value="TO">Tonga</MenuItem>
                                                <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                                                <MenuItem value="TN">Tunisia</MenuItem>
                                                <MenuItem value="TR">Turkey</MenuItem>
                                                <MenuItem value="TM">Turkmenistan</MenuItem>
                                                <MenuItem value="TC">Turks and Caicos Islands</MenuItem>
                                                <MenuItem value="TV">Tuvalu</MenuItem>
                                                <MenuItem value="UG">Uganda</MenuItem>
                                                <MenuItem value="UA">Ukraine</MenuItem>
                                                <MenuItem value="AE">United Arab Emirates</MenuItem>
                                                <MenuItem value="GB">United Kingdom of Great Britain and Northern Ireland</MenuItem>
                                                <MenuItem value="UM">United States Minor Outlying Islands</MenuItem>
                                                <MenuItem value="US">United States of America</MenuItem>
                                                <MenuItem value="UY">Uruguay</MenuItem>
                                                <MenuItem value="UZ">Uzbekistan</MenuItem>
                                                <MenuItem value="VU">Vanuatu</MenuItem>
                                                <MenuItem value="VE">Venezuela (Bolivarian Republic of)</MenuItem>
                                                <MenuItem value="VN">Viet Nam</MenuItem>
                                                <MenuItem value="VG">Virgin Islands (British)</MenuItem>
                                                <MenuItem value="VI">Virgin Islands (U.S.)</MenuItem>
                                                <MenuItem value="WF">Wallis and Futuna</MenuItem>
                                                <MenuItem value="EH">Western Sahara</MenuItem>
                                                <MenuItem value="YE">Yemen</MenuItem>
                                                <MenuItem value="ZM">Zambia</MenuItem>
                                                <MenuItem value="ZW">Zimbabwe</MenuItem>

                                            </Select>
                                        </FormControl>
                                        <label>
                                            Postal Code:
                                        </label>
                                        <TextField id="filled-basic" placeholder="Postal Code" variant="filled" size="small" name="kinPostalCode" value={this.state.kinPostalCode} onChange={this.handleChange}/>
                                        <label/>
                                    </div>
                            </div>
                            <hr/>
                            <div className="Contact Details">
                                <h1>Contact Details</h1>
                                    <div className="grid-container">
                                        <label>
                                            Main Phone:
                                        </label>
                                        <TextField id="filled-basic" placeholder="Main Phone" variant="filled" size="small" name="kinMainPhone" value={this.state.kinMainPhone} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Email:
                                        </label>
                                        <TextField id="filled-basic" placeholder="Email" variant="filled" size="small" name="kinEmail" value={this.state.kinEmail} onChange={this.handleChange}/>
                                        <label>
                                            Other:
                                        </label>
                                        <TextField id="filled-basic" placeholder="Other" variant="filled" size="small" name="kinOtherCommunication" value={this.state.kinOtherCommunication} onChange={this.handleChange}/>
                                        <label />
                                    </div>
                            </div>
                            <hr/>
                            <br/>
                            <div className="Button">
                                <Button variant="contained" href="/personal_info_2" >
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
                    <Route exact path="/personal_info_5">
                        <PersonalInfo5 />
                    </Route>
                    <Route exact path="/personal_info_2">
                        <PersonalInfo2 />
                    </Route>
                    <Route exact path="/personal_info_2">
                        <PersonalInfo2 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}