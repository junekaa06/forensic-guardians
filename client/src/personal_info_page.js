import React, {Component} from 'react';
import './personal_info_page.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { PersonalInfo2 } from "./personal_info_page_2";
import 'date-fns';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo2 from './logo2.png';

// import Nationality_Dropdown from './components/nationality_dropdown';

export class PersonalInfo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName: '', 
            reportedFullName: '',
            middleName: '',
            patronymicName: '',
            matronymicName: '',
            lastName: '',

            dateOfBirth: '',
            nationality: '',
            placeOfBirth: '',
            ancestry: '',
            biologicalSex: '',
            principalLanguage: '',
            gender: '',
            otherLanguage: '',

            fullAddress: '',
            country: '',

            homeWorkPhone: '',
            personalPhone: '',
            whatsAppPhone: '',
            email: '',
            otherCommunication: '',
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


        if (name === "firstName") {
            this.setState((state) => ({
                reportedFullName: value + " " + state.middleName + " " + state.lastName
            }));
        }
        else if (name === "middleName") {
            this.setState((state) => ({
                reportedFullName: state.firstName + " " + value + " " + state.lastName
            }));
        }
        else if (name === "lastName") {
            this.setState((state) => ({
                reportedFullName: state.firstName + " " + state.middleName + " " + value
            }));
        }
    }

    callSubmit() {
        if (this.state.firstName !== "" && this.state.lastName !== '' && this.state.dateOfBirth !== '' && this.state.nationality !== ''
            && this.state.placeOfBirth !== '' && this.state.biologicalSex !== '' && this.state.principalLanguage !== '' && this.state.gender !== ''
            && this.state.fullAddress !== '' && this.state.country !== '' && this.state.homeWorkPhone !== '' && this.state.email !== '') {
            fetch("http://localhost:9000/updateProfile?firstname="
                + this.state.firstName
                + "&middlename="
                + this.state.middleName
                + "&lastname="
                + this.state.lastName
                + "&fatherslastname="
                + this.state.patronymicName
                + "&motherslastname="
                + this.state.matronymicName
                + "&dateofbirth="
                + this.state.dateOfBirth
                + "&placeofbirth="
                + this.state.placeOfBirth
                + "&biologicalsex="
                + this.state.biologicalSex
                + "&gender="
                + this.state.gender
                + "&nationality="
                + this.state.nationality
                + "&ancestry="
                + this.state.ancestry
                + "&principallanguage="
                + this.state.principalLanguage
                + "&otherlanguage="
                + this.state.otherLanguage
                + "&fulladdress="
                + this.state.fullAddress
                + "&country="
                + this.state.country
                + "&homeworkphone="
                + this.state.homeWorkPhone
                + "&whatsapp="
                + this.state.whatsAppPhone
                + "&otherphone="
                + this.state.otherCommunication
                + "&personalphone="
                + this.state.personalPhone
                + "&email="
                + this.state.email, {
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
        alert("the form was submitted: " + this.state.principalLanguage);
        this.setState({ redirect: "/personal_info_2"})
    }

    state = { redirect: null };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
            }
        return (
            <Router>
                <Switch>
                    <Route exact path="/personal_info">
                        <div className="basicpage">
                            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <ul className="navbar">
                                    <li className="lilogo"><img className="logo2" src={logo2} alt="logo2"/></li>
                                    <li><a href="/log_in_page">Log In</a></li>
                                    <li><a href="/register_page">Sign Up</a></li>
                                </ul>
                                <hr/>
                                <div className="names">
                                    <h1>Names</h1>
                                    <div className="grid-container">
                                        <label>
                                            First Name:
                                        </label>
                                        <TextField id="filled-basic" placeholder="First Name" variant="filled" size="small" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                                        <label/>
                                        <label>
                                            Reported Full Name:
                                        </label>
                                            <TextField id="filled-basic" placeholder="" variant="filled" size="small" name="reportedFullName" value={this.state.reportedFullName}/>
                                        <label>
                                            Middle Name:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Middle Name" variant="filled" size="small" name="middleName" value={this.state.middleName} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Patronymic name(s):
                                            <br/>
                                            (optional)
                                        </label>
                                            <TextField id="filled-basic" placeholder="Patronymic Name" variant="filled" size="small" name="patronymicName" value={this.state.patronymicName} onChange={this.handleChange}/>
                                        <label>
                                            Last Name:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Last Name" variant="filled" size="small" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Matronymic name(s):
                                            <br/>
                                            (optional)
                                        </label>
                                            <TextField id="filled-basic" placeholder="Matronymic Name" variant="filled" size="small" name="matronymicName" value={this.state.matronymicName} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <br/>
                                <hr/>
                                <div className="administrative">
                                    <h1>Administrative Details</h1>
                                        <div className="grid-container">
                                        <label>
                                            Date of Birth:
                                        </label>
                                        <form className="dateOfBirth" noValidate>
                                            <TextField
                                                id="dateOfBirth"
                                                name="dateOfBirth"
                                                label="Date Of Birth"
                                                type="date"
                                                defaultValue=""
                                                value={this.state.dateOfBirth}
                                                onChange={this.handleChange}
                                                className="dateOfBirthField"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </form>
                                        <label/>
                                        <label>
                                            Nationality:
                                        </label>
                                            <FormControl variant="filled" className="nationality dropdown">
                                                <InputLabel id="demo-simple-select-filled-label">Nationality</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    name="nationality"
                                                    value={this.state.nationality}
                                                    onChange={this.handleChange}
                                                >
                                                <MenuItem value="AX">Åland Island</MenuItem>
                                                <MenuItem value="AL">Albanian</MenuItem>
                                                <MenuItem value="DZ">Algerian</MenuItem>
                                                <MenuItem value="US">American</MenuItem>
                                                <MenuItem value="UM">American - Minor Outlying Islands</MenuItem>
                                                <MenuItem value="AF">Afghan</MenuItem>
                                                <MenuItem value="AS">American Samoan</MenuItem>
                                                <MenuItem value="AD">Andorran</MenuItem>
                                                <MenuItem value="AO">Angolan</MenuItem>
                                                <MenuItem value="AI">Anguillan</MenuItem>
                                                <MenuItem value="AQ">Antarctic</MenuItem>
                                                <MenuItem value="AG">Antiguan or Barbudan</MenuItem>
                                                <MenuItem value="AR">Argentine</MenuItem>
                                                <MenuItem value="AM">Armenian</MenuItem>
                                                <MenuItem value="AW">Aruban</MenuItem>
                                                <MenuItem value="AU">Australian</MenuItem>
                                                <MenuItem value="AT">Austrian</MenuItem>
                                                <MenuItem value="AZ">Azerbaijani, Azeri</MenuItem>
                                                <MenuItem value="BS">Bahamian</MenuItem>
                                                <MenuItem value="BH">Bahraini</MenuItem>
                                                <MenuItem value="BD">Bangladeshi</MenuItem>
                                                <MenuItem value="BB">Barbadian</MenuItem>
                                                <MenuItem value="BL">Barthélemois</MenuItem>
                                                <MenuItem value="LS">Basotho</MenuItem>
                                                <MenuItem value="BY">Belarusian</MenuItem>
                                                <MenuItem value="BE">Belgian</MenuItem>
                                                <MenuItem value="BZ">Belizean</MenuItem>
                                                <MenuItem value="BJ">Beninese, Beninois</MenuItem>
                                                <MenuItem value="BM">Bermudian, Bermudan</MenuItem>
                                                <MenuItem value="BT">Bhutanese</MenuItem>
                                                <MenuItem value="IO">BIOT</MenuItem>
                                                <MenuItem value="GW">Bissau-Guinean</MenuItem>
                                                <MenuItem value="BO">Bolivian</MenuItem>
                                                <MenuItem value="BQ">Bonaire</MenuItem>
                                                <MenuItem value="BA">Bosnian or Herzegovinian</MenuItem>
                                                <MenuItem value="BV">Bouvet Island</MenuItem>
                                                <MenuItem value="BR">Brazilian</MenuItem>
                                                <MenuItem value="VG">British Virgin Island</MenuItem>
                                                <MenuItem value="GB">British, UK</MenuItem>
                                                <MenuItem value="BN">Bruneian</MenuItem>
                                                <MenuItem value="BG">Bulgarian</MenuItem>
                                                <MenuItem value="BF">Burkinabé</MenuItem>
                                                <MenuItem value="MM">Burmese</MenuItem>
                                                <MenuItem value="BI">Burundian</MenuItem>
                                                <MenuItem value="CV">Cabo Verdean</MenuItem>
                                                <MenuItem value="KH">Cambodian</MenuItem>
                                                <MenuItem value="CM">Cameroonian</MenuItem>
                                                <MenuItem value="CA">Canadian</MenuItem>
                                                <MenuItem value="KY">Caymanian</MenuItem>
                                                <MenuItem value="CF">Central African</MenuItem>
                                                <MenuItem value="TD">Chadian</MenuItem>
                                                <MenuItem value="GG">Channel Island</MenuItem>
                                                <MenuItem value="JE">Channel Island</MenuItem>
                                                <MenuItem value="CL">Chilean</MenuItem>
                                                <MenuItem value="CN">Chinese</MenuItem>
                                                <MenuItem value="TW">Chinese, Taiwanese</MenuItem>
                                                <MenuItem value="CX">Christmas Island</MenuItem>
                                                <MenuItem value="CC">Cocos Island</MenuItem>
                                                <MenuItem value="CO">Colombian</MenuItem>
                                                <MenuItem value="KM">Comoran, Comorian</MenuItem>
                                                <MenuItem value="CG">Congolese</MenuItem>
                                                <MenuItem value="CD">Congolese</MenuItem>
                                                <MenuItem value="CK">Cook Island</MenuItem>
                                                <MenuItem value="CR">Costa Rican</MenuItem>
                                                <MenuItem value="HR">Croatian</MenuItem>
                                                <MenuItem value="CU">Cuban</MenuItem>
                                                <MenuItem value="CW">Curaçaoan</MenuItem>
                                                <MenuItem value="CY">Cypriot</MenuItem>
                                                <MenuItem value="CZ">Czech</MenuItem>
                                                <MenuItem value="DK">Danish</MenuItem>
                                                <MenuItem value="DJ">Djiboutian</MenuItem>
                                                <MenuItem value="DM">Dominican</MenuItem>
                                                <MenuItem value="DO">Dominican</MenuItem>
                                                <MenuItem value="NL">Dutch, Netherlandic</MenuItem>
                                                <MenuItem value="EC">Ecuadorian</MenuItem>
                                                <MenuItem value="EG">Egyptian</MenuItem>
                                                <MenuItem value="AE">Emirati, Emirian, Emiri</MenuItem>
                                                <MenuItem value="GQ">Equatorial Guinean, Equatoguinean</MenuItem>
                                                <MenuItem value="ER">Eritrean</MenuItem>
                                                <MenuItem value="EE">Estonian</MenuItem>
                                                <MenuItem value="ET">Ethiopian</MenuItem>
                                                <MenuItem value="FK">Falkland Island</MenuItem>
                                                <MenuItem value="FO">Faroese</MenuItem>
                                                <MenuItem value="FJ">Fijian</MenuItem>
                                                <MenuItem value="FI">Finnish</MenuItem>
                                                <MenuItem value="FR">French</MenuItem>
                                                <MenuItem value="GF">French Guianese</MenuItem>
                                                <MenuItem value="PF">French Polynesian</MenuItem>
                                                <MenuItem value="TF">French Southern Territories</MenuItem>
                                                <MenuItem value="GA">Gabonese</MenuItem>
                                                <MenuItem value="GM">Gambian</MenuItem>
                                                <MenuItem value="GE">Georgian</MenuItem>
                                                <MenuItem value="DE">German</MenuItem>
                                                <MenuItem value="GH">Ghanaian</MenuItem>
                                                <MenuItem value="GI">Gibraltar</MenuItem>
                                                <MenuItem value="GR">Greek, Hellenic</MenuItem>
                                                <MenuItem value="GL">Greenlandic</MenuItem>
                                                <MenuItem value="GD">Grenadian</MenuItem>
                                                <MenuItem value="GP">Guadeloupe</MenuItem>
                                                <MenuItem value="GU">Guamanian, Guambat</MenuItem>
                                                <MenuItem value="GT">Guatemalan</MenuItem>
                                                <MenuItem value="GN">Guinean</MenuItem>
                                                <MenuItem value="GY">Guyanese</MenuItem>
                                                <MenuItem value="HT">Haitian</MenuItem>
                                                <MenuItem value="HM">Heard Island or McDonald Islands</MenuItem>
                                                <MenuItem value="HN">Honduran</MenuItem>
                                                <MenuItem value="HK">Hong Kong, Hong Kongese</MenuItem>
                                                <MenuItem value="HU">Hungarian, Magyar</MenuItem>
                                                <MenuItem value="KI">I-Kiribati</MenuItem>
                                                <MenuItem value="IS">Icelandic</MenuItem>
                                                <MenuItem value="IN">Indian</MenuItem>
                                                <MenuItem value="ID">Indonesian</MenuItem>
                                                <MenuItem value="IR">Iranian, Persian</MenuItem>
                                                <MenuItem value="IQ">Iraqi</MenuItem>
                                                <MenuItem value="IE">Irish</MenuItem>
                                                <MenuItem value="IL">Israeli</MenuItem>
                                                <MenuItem value="IT">Italian</MenuItem>
                                                <MenuItem value="CI">Ivorian</MenuItem>
                                                <MenuItem value="JM">Jamaican</MenuItem>
                                                <MenuItem value="JP">Japanese</MenuItem>
                                                <MenuItem value="JO">Jordanian</MenuItem>
                                                <MenuItem value="KZ">Kazakhstani, Kazakh</MenuItem>
                                                <MenuItem value="KE">Kenyan</MenuItem>
                                                <MenuItem value="KN">Kittitian or Nevisian</MenuItem>
                                                <MenuItem value="KW">Kuwaiti</MenuItem>
                                                <MenuItem value="KG">Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz</MenuItem>
                                                <MenuItem value="LA">Lao, Laotian</MenuItem>
                                                <MenuItem value="LV">Latvian</MenuItem>
                                                <MenuItem value="LB">Lebanese</MenuItem>
                                                <MenuItem value="LR">Liberian</MenuItem>
                                                <MenuItem value="LY">Libyan</MenuItem>
                                                <MenuItem value="LI">Liechtenstein</MenuItem>
                                                <MenuItem value="LT">Lithuanian</MenuItem>
                                                <MenuItem value="LU">Luxembourg, Luxembourgish</MenuItem>
                                                <MenuItem value="MO">Macanese, Chinese</MenuItem>
                                                <MenuItem value="MK">Macedonian</MenuItem>
                                                <MenuItem value="YT">Mahoran</MenuItem>
                                                <MenuItem value="MG">Malagasy</MenuItem>
                                                <MenuItem value="MW">Malawian</MenuItem>
                                                <MenuItem value="MY">Malaysian</MenuItem>
                                                <MenuItem value="MV">Maldivian</MenuItem>
                                                <MenuItem value="ML">Malian, Malinese</MenuItem>
                                                <MenuItem value="MT">Maltese</MenuItem>
                                                <MenuItem value="IM">Manx</MenuItem>
                                                <MenuItem value="MH">Marshallese</MenuItem>
                                                <MenuItem value="MQ">Martiniquais, Martinican</MenuItem>
                                                <MenuItem value="MR">Mauritanian</MenuItem>
                                                <MenuItem value="MU">Mauritian</MenuItem>
                                                <MenuItem value="MX">Mexican</MenuItem>
                                                <MenuItem value="FM">Micronesian</MenuItem>
                                                <MenuItem value="MD">Moldovan</MenuItem>
                                                <MenuItem value="MC">Monégasque, Monacan</MenuItem>
                                                <MenuItem value="MN">Mongolian</MenuItem>
                                                <MenuItem value="ME">Montenegrin</MenuItem>
                                                <MenuItem value="MS">Montserratian</MenuItem>
                                                <MenuItem value="MA">Moroccan</MenuItem>
                                                <MenuItem value="BW">Motswana, Botswanan</MenuItem>
                                                <MenuItem value="MZ">Mozambican</MenuItem>
                                                <MenuItem value="NA">Namibian</MenuItem>
                                                <MenuItem value="NR">Nauruan</MenuItem>
                                                <MenuItem value="NP">Nepali, Nepalese</MenuItem>
                                                <MenuItem value="NC">New Caledonian</MenuItem>
                                                <MenuItem value="NZ">New Zealand, NZ</MenuItem>
                                                <MenuItem value="VU">Ni-Vanuatu, Vanuatuan</MenuItem>
                                                <MenuItem value="NI">Nicaraguan</MenuItem>
                                                <MenuItem value="NG">Nigerian</MenuItem>
                                                <MenuItem value="NE">Nigerien</MenuItem>
                                                <MenuItem value="NU">Niuean</MenuItem>
                                                <MenuItem value="NF">Norfolk Island</MenuItem>
                                                <MenuItem value="KP">North Korean</MenuItem>
                                                <MenuItem value="MP">Northern Marianan</MenuItem>
                                                <MenuItem value="NO">Norwegian</MenuItem>
                                                <MenuItem value="OM">Omani</MenuItem>
                                                <MenuItem value="PK">Pakistani</MenuItem>
                                                <MenuItem value="PW">Palauan</MenuItem>
                                                <MenuItem value="PS">Palestinian</MenuItem>
                                                <MenuItem value="PA">Panamanian</MenuItem>
                                                <MenuItem value="PG">Papua New Guinean, Papuan</MenuItem>
                                                <MenuItem value="PY">Paraguayan</MenuItem>
                                                <MenuItem value="PE">Peruvian</MenuItem>
                                                <MenuItem value="PH">Philippine, Filipino</MenuItem>
                                                <MenuItem value="PN">Pitcairn Island</MenuItem>
                                                <MenuItem value="PL">Polish</MenuItem>
                                                <MenuItem value="PT">Portuguese</MenuItem>
                                                <MenuItem value="PR">Puerto Rican</MenuItem>
                                                <MenuItem value="QA">Qatari</MenuItem>
                                                <MenuItem value="RE">Réunionese, Réunionnais</MenuItem>
                                                <MenuItem value="RO">Romanian</MenuItem>
                                                <MenuItem value="RU">Russian</MenuItem>
                                                <MenuItem value="RW">Rwandan</MenuItem>
                                                <MenuItem value="EH">Sahrawi, Sahrawian, Sahraouian</MenuItem>
                                                <MenuItem value="SH">Saint Helenian</MenuItem>
                                                <MenuItem value="LC">Saint Lucian</MenuItem>
                                                <MenuItem value="VC">Saint Vincentian, Vincentian</MenuItem>
                                                <MenuItem value="MF">Saint-Martinoise</MenuItem>
                                                <MenuItem value="PM">Saint-Pierrais or Miquelonnais</MenuItem>
                                                <MenuItem value="SV">Salvadoran</MenuItem>
                                                <MenuItem value="SM">Sammarinese</MenuItem>
                                                <MenuItem value="WS">Samoan</MenuItem>
                                                <MenuItem value="ST">São Toméan</MenuItem>
                                                <MenuItem value="SA">Saudi, Saudi Arabian</MenuItem>
                                                <MenuItem value="SN">Senegalese</MenuItem>
                                                <MenuItem value="RS">Serbian</MenuItem>
                                                <MenuItem value="SC">Seychellois</MenuItem>
                                                <MenuItem value="SL">Sierra Leonean</MenuItem>
                                                <MenuItem value="SG">Singaporean</MenuItem>
                                                <MenuItem value="SX">Sint Maarten</MenuItem>
                                                <MenuItem value="SK">Slovak</MenuItem>
                                                <MenuItem value="SI">Slovenian, Slovene</MenuItem>
                                                <MenuItem value="SB">Solomon Island</MenuItem>
                                                <MenuItem value="SO">Somali, Somalian</MenuItem>
                                                <MenuItem value="ZA">South African</MenuItem>
                                                <MenuItem value="GS">South Georgia or South Sandwich Islands</MenuItem>
                                                <MenuItem value="KR">South Korean</MenuItem>
                                                <MenuItem value="SS">South Sudanese</MenuItem>
                                                <MenuItem value="ES">Spanish</MenuItem>
                                                <MenuItem value="LK">Sri Lankan</MenuItem>
                                                <MenuItem value="SD">Sudanese</MenuItem>
                                                <MenuItem value="SR">Surinamese</MenuItem>
                                                <MenuItem value="SJ">Svalbard</MenuItem>
                                                <MenuItem value="SZ">Swazi</MenuItem>
                                                <MenuItem value="SE">Swedish</MenuItem>
                                                <MenuItem value="CH">Swiss</MenuItem>
                                                <MenuItem value="SY">Syrian</MenuItem>
                                                <MenuItem value="TJ">Tajikistani</MenuItem>
                                                <MenuItem value="TZ">Tanzanian</MenuItem>
                                                <MenuItem value="TH">Thai</MenuItem>
                                                <MenuItem value="TL">Timorese</MenuItem>
                                                <MenuItem value="TG">Togolese</MenuItem>
                                                <MenuItem value="TK">Tokelauan</MenuItem>
                                                <MenuItem value="TO">Tongan</MenuItem>
                                                <MenuItem value="TT">Trinidadian or Tobagonian</MenuItem>
                                                <MenuItem value="TN">Tunisian</MenuItem>
                                                <MenuItem value="TR">Turkish</MenuItem>
                                                <MenuItem value="TM">Turkmen</MenuItem>
                                                <MenuItem value="TC">Turks and Caicos Island</MenuItem>
                                                <MenuItem value="TV">Tuvaluan</MenuItem>
                                                <MenuItem value="VI">U.S. Virgin Island</MenuItem>
                                                <MenuItem value="UG">Ugandan</MenuItem>
                                                <MenuItem value="UA">Ukrainian</MenuItem>
                                                <MenuItem value="UY">Uruguayan</MenuItem>
                                                <MenuItem value="UZ">Uzbekistani, Uzbek</MenuItem>
                                                <MenuItem value="VA">Vatican</MenuItem>
                                                <MenuItem value="VE">Venezuelan</MenuItem>
                                                <MenuItem value="VN">Vietnamese</MenuItem>
                                                <MenuItem value="WF">Wallis and Futuna, Wallisian or Futunan</MenuItem>
                                                <MenuItem value="YE">Yemeni</MenuItem>
                                                <MenuItem value="ZM">Zambian</MenuItem>
                                                <MenuItem value="ZW">Zimbabwean</MenuItem>
                                                </Select>
                                            </FormControl>
                                        <label>
                                            Place of Birth:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Place of Birth" variant="filled" size="small" name="placeOfBirth" value={this.state.placeOfBirth} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Ancestry:
                                            <br/>
                                            (optional)
                                        </label>
                                        <FormControl variant="filled" className="ancestry dropdown">
                                            <InputLabel id="demo-simple-select-filled-label">Ancestry</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="ancestry"
                                                value={this.state.ancestry}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="AX">Åland Island</MenuItem>
                                                <MenuItem value="AL">Albanian</MenuItem>
                                                <MenuItem value="DZ">Algerian</MenuItem>
                                                <MenuItem value="US">American</MenuItem>
                                                <MenuItem value="UM">American - Minor Outlying Islands</MenuItem>
                                                <MenuItem value="AF">Afghan</MenuItem>
                                                <MenuItem value="AS">American Samoan</MenuItem>
                                                <MenuItem value="AD">Andorran</MenuItem>
                                                <MenuItem value="AO">Angolan</MenuItem>
                                                <MenuItem value="AI">Anguillan</MenuItem>
                                                <MenuItem value="AQ">Antarctic</MenuItem>
                                                <MenuItem value="AG">Antiguan or Barbudan</MenuItem>
                                                <MenuItem value="AR">Argentine</MenuItem>
                                                <MenuItem value="AM">Armenian</MenuItem>
                                                <MenuItem value="AW">Aruban</MenuItem>
                                                <MenuItem value="AU">Australian</MenuItem>
                                                <MenuItem value="AT">Austrian</MenuItem>
                                                <MenuItem value="AZ">Azerbaijani, Azeri</MenuItem>
                                                <MenuItem value="BS">Bahamian</MenuItem>
                                                <MenuItem value="BH">Bahraini</MenuItem>
                                                <MenuItem value="BD">Bangladeshi</MenuItem>
                                                <MenuItem value="BB">Barbadian</MenuItem>
                                                <MenuItem value="BL">Barthélemois</MenuItem>
                                                <MenuItem value="LS">Basotho</MenuItem>
                                                <MenuItem value="BY">Belarusian</MenuItem>
                                                <MenuItem value="BE">Belgian</MenuItem>
                                                <MenuItem value="BZ">Belizean</MenuItem>
                                                <MenuItem value="BJ">Beninese, Beninois</MenuItem>
                                                <MenuItem value="BM">Bermudian, Bermudan</MenuItem>
                                                <MenuItem value="BT">Bhutanese</MenuItem>
                                                <MenuItem value="IO">BIOT</MenuItem>
                                                <MenuItem value="GW">Bissau-Guinean</MenuItem>
                                                <MenuItem value="BO">Bolivian</MenuItem>
                                                <MenuItem value="BQ">Bonaire</MenuItem>
                                                <MenuItem value="BA">Bosnian or Herzegovinian</MenuItem>
                                                <MenuItem value="BV">Bouvet Island</MenuItem>
                                                <MenuItem value="BR">Brazilian</MenuItem>
                                                <MenuItem value="VG">British Virgin Island</MenuItem>
                                                <MenuItem value="GB">British, UK</MenuItem>
                                                <MenuItem value="BN">Bruneian</MenuItem>
                                                <MenuItem value="BG">Bulgarian</MenuItem>
                                                <MenuItem value="BF">Burkinabé</MenuItem>
                                                <MenuItem value="MM">Burmese</MenuItem>
                                                <MenuItem value="BI">Burundian</MenuItem>
                                                <MenuItem value="CV">Cabo Verdean</MenuItem>
                                                <MenuItem value="KH">Cambodian</MenuItem>
                                                <MenuItem value="CM">Cameroonian</MenuItem>
                                                <MenuItem value="CA">Canadian</MenuItem>
                                                <MenuItem value="KY">Caymanian</MenuItem>
                                                <MenuItem value="CF">Central African</MenuItem>
                                                <MenuItem value="TD">Chadian</MenuItem>
                                                <MenuItem value="GG">Channel Island</MenuItem>
                                                <MenuItem value="JE">Channel Island</MenuItem>
                                                <MenuItem value="CL">Chilean</MenuItem>
                                                <MenuItem value="CN">Chinese</MenuItem>
                                                <MenuItem value="TW">Chinese, Taiwanese</MenuItem>
                                                <MenuItem value="CX">Christmas Island</MenuItem>
                                                <MenuItem value="CC">Cocos Island</MenuItem>
                                                <MenuItem value="CO">Colombian</MenuItem>
                                                <MenuItem value="KM">Comoran, Comorian</MenuItem>
                                                <MenuItem value="CG">Congolese</MenuItem>
                                                <MenuItem value="CD">Congolese</MenuItem>
                                                <MenuItem value="CK">Cook Island</MenuItem>
                                                <MenuItem value="CR">Costa Rican</MenuItem>
                                                <MenuItem value="HR">Croatian</MenuItem>
                                                <MenuItem value="CU">Cuban</MenuItem>
                                                <MenuItem value="CW">Curaçaoan</MenuItem>
                                                <MenuItem value="CY">Cypriot</MenuItem>
                                                <MenuItem value="CZ">Czech</MenuItem>
                                                <MenuItem value="DK">Danish</MenuItem>
                                                <MenuItem value="DJ">Djiboutian</MenuItem>
                                                <MenuItem value="DM">Dominican</MenuItem>
                                                <MenuItem value="DO">Dominican</MenuItem>
                                                <MenuItem value="NL">Dutch, Netherlandic</MenuItem>
                                                <MenuItem value="EC">Ecuadorian</MenuItem>
                                                <MenuItem value="EG">Egyptian</MenuItem>
                                                <MenuItem value="AE">Emirati, Emirian, Emiri</MenuItem>
                                                <MenuItem value="GQ">Equatorial Guinean, Equatoguinean</MenuItem>
                                                <MenuItem value="ER">Eritrean</MenuItem>
                                                <MenuItem value="EE">Estonian</MenuItem>
                                                <MenuItem value="ET">Ethiopian</MenuItem>
                                                <MenuItem value="FK">Falkland Island</MenuItem>
                                                <MenuItem value="FO">Faroese</MenuItem>
                                                <MenuItem value="FJ">Fijian</MenuItem>
                                                <MenuItem value="FI">Finnish</MenuItem>
                                                <MenuItem value="FR">French</MenuItem>
                                                <MenuItem value="GF">French Guianese</MenuItem>
                                                <MenuItem value="PF">French Polynesian</MenuItem>
                                                <MenuItem value="TF">French Southern Territories</MenuItem>
                                                <MenuItem value="GA">Gabonese</MenuItem>
                                                <MenuItem value="GM">Gambian</MenuItem>
                                                <MenuItem value="GE">Georgian</MenuItem>
                                                <MenuItem value="DE">German</MenuItem>
                                                <MenuItem value="GH">Ghanaian</MenuItem>
                                                <MenuItem value="GI">Gibraltar</MenuItem>
                                                <MenuItem value="GR">Greek, Hellenic</MenuItem>
                                                <MenuItem value="GL">Greenlandic</MenuItem>
                                                <MenuItem value="GD">Grenadian</MenuItem>
                                                <MenuItem value="GP">Guadeloupe</MenuItem>
                                                <MenuItem value="GU">Guamanian, Guambat</MenuItem>
                                                <MenuItem value="GT">Guatemalan</MenuItem>
                                                <MenuItem value="GN">Guinean</MenuItem>
                                                <MenuItem value="GY">Guyanese</MenuItem>
                                                <MenuItem value="HT">Haitian</MenuItem>
                                                <MenuItem value="HM">Heard Island or McDonald Islands</MenuItem>
                                                <MenuItem value="HN">Honduran</MenuItem>
                                                <MenuItem value="HK">Hong Kong, Hong Kongese</MenuItem>
                                                <MenuItem value="HU">Hungarian, Magyar</MenuItem>
                                                <MenuItem value="KI">I-Kiribati</MenuItem>
                                                <MenuItem value="IS">Icelandic</MenuItem>
                                                <MenuItem value="IN">Indian</MenuItem>
                                                <MenuItem value="ID">Indonesian</MenuItem>
                                                <MenuItem value="IR">Iranian, Persian</MenuItem>
                                                <MenuItem value="IQ">Iraqi</MenuItem>
                                                <MenuItem value="IE">Irish</MenuItem>
                                                <MenuItem value="IL">Israeli</MenuItem>
                                                <MenuItem value="IT">Italian</MenuItem>
                                                <MenuItem value="CI">Ivorian</MenuItem>
                                                <MenuItem value="JM">Jamaican</MenuItem>
                                                <MenuItem value="JP">Japanese</MenuItem>
                                                <MenuItem value="JO">Jordanian</MenuItem>
                                                <MenuItem value="KZ">Kazakhstani, Kazakh</MenuItem>
                                                <MenuItem value="KE">Kenyan</MenuItem>
                                                <MenuItem value="KN">Kittitian or Nevisian</MenuItem>
                                                <MenuItem value="KW">Kuwaiti</MenuItem>
                                                <MenuItem value="KG">Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz</MenuItem>
                                                <MenuItem value="LA">Lao, Laotian</MenuItem>
                                                <MenuItem value="LV">Latvian</MenuItem>
                                                <MenuItem value="LB">Lebanese</MenuItem>
                                                <MenuItem value="LR">Liberian</MenuItem>
                                                <MenuItem value="LY">Libyan</MenuItem>
                                                <MenuItem value="LI">Liechtenstein</MenuItem>
                                                <MenuItem value="LT">Lithuanian</MenuItem>
                                                <MenuItem value="LU">Luxembourg, Luxembourgish</MenuItem>
                                                <MenuItem value="MO">Macanese, Chinese</MenuItem>
                                                <MenuItem value="MK">Macedonian</MenuItem>
                                                <MenuItem value="YT">Mahoran</MenuItem>
                                                <MenuItem value="MG">Malagasy</MenuItem>
                                                <MenuItem value="MW">Malawian</MenuItem>
                                                <MenuItem value="MY">Malaysian</MenuItem>
                                                <MenuItem value="MV">Maldivian</MenuItem>
                                                <MenuItem value="ML">Malian, Malinese</MenuItem>
                                                <MenuItem value="MT">Maltese</MenuItem>
                                                <MenuItem value="IM">Manx</MenuItem>
                                                <MenuItem value="MH">Marshallese</MenuItem>
                                                <MenuItem value="MQ">Martiniquais, Martinican</MenuItem>
                                                <MenuItem value="MR">Mauritanian</MenuItem>
                                                <MenuItem value="MU">Mauritian</MenuItem>
                                                <MenuItem value="MX">Mexican</MenuItem>
                                                <MenuItem value="FM">Micronesian</MenuItem>
                                                <MenuItem value="MD">Moldovan</MenuItem>
                                                <MenuItem value="MC">Monégasque, Monacan</MenuItem>
                                                <MenuItem value="MN">Mongolian</MenuItem>
                                                <MenuItem value="ME">Montenegrin</MenuItem>
                                                <MenuItem value="MS">Montserratian</MenuItem>
                                                <MenuItem value="MA">Moroccan</MenuItem>
                                                <MenuItem value="BW">Motswana, Botswanan</MenuItem>
                                                <MenuItem value="MZ">Mozambican</MenuItem>
                                                <MenuItem value="NA">Namibian</MenuItem>
                                                <MenuItem value="NR">Nauruan</MenuItem>
                                                <MenuItem value="NP">Nepali, Nepalese</MenuItem>
                                                <MenuItem value="NC">New Caledonian</MenuItem>
                                                <MenuItem value="NZ">New Zealand, NZ</MenuItem>
                                                <MenuItem value="VU">Ni-Vanuatu, Vanuatuan</MenuItem>
                                                <MenuItem value="NI">Nicaraguan</MenuItem>
                                                <MenuItem value="NG">Nigerian</MenuItem>
                                                <MenuItem value="NE">Nigerien</MenuItem>
                                                <MenuItem value="NU">Niuean</MenuItem>
                                                <MenuItem value="NF">Norfolk Island</MenuItem>
                                                <MenuItem value="KP">North Korean</MenuItem>
                                                <MenuItem value="MP">Northern Marianan</MenuItem>
                                                <MenuItem value="NO">Norwegian</MenuItem>
                                                <MenuItem value="OM">Omani</MenuItem>
                                                <MenuItem value="PK">Pakistani</MenuItem>
                                                <MenuItem value="PW">Palauan</MenuItem>
                                                <MenuItem value="PS">Palestinian</MenuItem>
                                                <MenuItem value="PA">Panamanian</MenuItem>
                                                <MenuItem value="PG">Papua New Guinean, Papuan</MenuItem>
                                                <MenuItem value="PY">Paraguayan</MenuItem>
                                                <MenuItem value="PE">Peruvian</MenuItem>
                                                <MenuItem value="PH">Philippine, Filipino</MenuItem>
                                                <MenuItem value="PN">Pitcairn Island</MenuItem>
                                                <MenuItem value="PL">Polish</MenuItem>
                                                <MenuItem value="PT">Portuguese</MenuItem>
                                                <MenuItem value="PR">Puerto Rican</MenuItem>
                                                <MenuItem value="QA">Qatari</MenuItem>
                                                <MenuItem value="RE">Réunionese, Réunionnais</MenuItem>
                                                <MenuItem value="RO">Romanian</MenuItem>
                                                <MenuItem value="RU">Russian</MenuItem>
                                                <MenuItem value="RW">Rwandan</MenuItem>
                                                <MenuItem value="EH">Sahrawi, Sahrawian, Sahraouian</MenuItem>
                                                <MenuItem value="SH">Saint Helenian</MenuItem>
                                                <MenuItem value="LC">Saint Lucian</MenuItem>
                                                <MenuItem value="VC">Saint Vincentian, Vincentian</MenuItem>
                                                <MenuItem value="MF">Saint-Martinoise</MenuItem>
                                                <MenuItem value="PM">Saint-Pierrais or Miquelonnais</MenuItem>
                                                <MenuItem value="SV">Salvadoran</MenuItem>
                                                <MenuItem value="SM">Sammarinese</MenuItem>
                                                <MenuItem value="WS">Samoan</MenuItem>
                                                <MenuItem value="ST">São Toméan</MenuItem>
                                                <MenuItem value="SA">Saudi, Saudi Arabian</MenuItem>
                                                <MenuItem value="SN">Senegalese</MenuItem>
                                                <MenuItem value="RS">Serbian</MenuItem>
                                                <MenuItem value="SC">Seychellois</MenuItem>
                                                <MenuItem value="SL">Sierra Leonean</MenuItem>
                                                <MenuItem value="SG">Singaporean</MenuItem>
                                                <MenuItem value="SX">Sint Maarten</MenuItem>
                                                <MenuItem value="SK">Slovak</MenuItem>
                                                <MenuItem value="SI">Slovenian, Slovene</MenuItem>
                                                <MenuItem value="SB">Solomon Island</MenuItem>
                                                <MenuItem value="SO">Somali, Somalian</MenuItem>
                                                <MenuItem value="ZA">South African</MenuItem>
                                                <MenuItem value="GS">South Georgia or South Sandwich Islands</MenuItem>
                                                <MenuItem value="KR">South Korean</MenuItem>
                                                <MenuItem value="SS">South Sudanese</MenuItem>
                                                <MenuItem value="ES">Spanish</MenuItem>
                                                <MenuItem value="LK">Sri Lankan</MenuItem>
                                                <MenuItem value="SD">Sudanese</MenuItem>
                                                <MenuItem value="SR">Surinamese</MenuItem>
                                                <MenuItem value="SJ">Svalbard</MenuItem>
                                                <MenuItem value="SZ">Swazi</MenuItem>
                                                <MenuItem value="SE">Swedish</MenuItem>
                                                <MenuItem value="CH">Swiss</MenuItem>
                                                <MenuItem value="SY">Syrian</MenuItem>
                                                <MenuItem value="TJ">Tajikistani</MenuItem>
                                                <MenuItem value="TZ">Tanzanian</MenuItem>
                                                <MenuItem value="TH">Thai</MenuItem>
                                                <MenuItem value="TL">Timorese</MenuItem>
                                                <MenuItem value="TG">Togolese</MenuItem>
                                                <MenuItem value="TK">Tokelauan</MenuItem>
                                                <MenuItem value="TO">Tongan</MenuItem>
                                                <MenuItem value="TT">Trinidadian or Tobagonian</MenuItem>
                                                <MenuItem value="TN">Tunisian</MenuItem>
                                                <MenuItem value="TR">Turkish</MenuItem>
                                                <MenuItem value="TM">Turkmen</MenuItem>
                                                <MenuItem value="TC">Turks and Caicos Island</MenuItem>
                                                <MenuItem value="TV">Tuvaluan</MenuItem>
                                                <MenuItem value="VI">U.S. Virgin Island</MenuItem>
                                                <MenuItem value="UG">Ugandan</MenuItem>
                                                <MenuItem value="UA">Ukrainian</MenuItem>
                                                <MenuItem value="UY">Uruguayan</MenuItem>
                                                <MenuItem value="UZ">Uzbekistani, Uzbek</MenuItem>
                                                <MenuItem value="VA">Vatican</MenuItem>
                                                <MenuItem value="VE">Venezuelan</MenuItem>
                                                <MenuItem value="VN">Vietnamese</MenuItem>
                                                <MenuItem value="WF">Wallis and Futuna, Wallisian or Futunan</MenuItem>
                                                <MenuItem value="YE">Yemeni</MenuItem>
                                                <MenuItem value="ZM">Zambian</MenuItem>
                                                <MenuItem value="ZW">Zimbabwean</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <label>
                                            Biological Sex:
                                        </label>
                                            <FormControl variant="filled" className="biologicalSex dropdown">
                                                <InputLabel id="demo-simple-select-filled-label">Biological Sex</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    name="biologicalSex"
                                                    value={this.state.biologicalSex}
                                                    onChange={this.handleChange}
                                                >
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="female">Female</MenuItem>
                                                </Select>
                                            </FormControl>
                                        <label/>
                                        <label>
                                            Principal Language:
                                        </label>
                                            <FormControl variant="filled" className="principalLanguage dropdown">
                                            <InputLabel id="demo-simple-select-filled-label">Principal Language</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="principalLanguage"
                                                value={this.state.principalLanguage}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="AFR">Afrikaans</MenuItem>
                                                <MenuItem value="AKA">Akan</MenuItem>
                                                <MenuItem value="SQI">Albanian</MenuItem>
                                                <MenuItem value="AMH">Amharic</MenuItem>
                                                <MenuItem value="ARA">Arabic</MenuItem>
                                                <MenuItem value="AZE">Azerbaijani</MenuItem>
                                                <MenuItem value="EUS">Basque</MenuItem>
                                                <MenuItem value="BEN">Bengali</MenuItem>
                                                <MenuItem value="BOS">Bosnian</MenuItem>
                                                <MenuItem value="BUL">Bulgarian</MenuItem>
                                                <MenuItem value="MYA">Burmese</MenuItem>
                                                <MenuItem value="CHA">Chamorro</MenuItem>
                                                <MenuItem value="CBK">Chavacano</MenuItem>
                                                <MenuItem value="CHK">Chuukese</MenuItem>
                                                <MenuItem value="CRE">Cree</MenuItem>
                                                <MenuItem value="HRV">Croatian</MenuItem>
                                                <MenuItem value="CES">Czech</MenuItem>
                                                <MenuItem value="DAK">Dakota</MenuItem>
                                                <MenuItem value="DAN">Danish</MenuItem>
                                                <MenuItem value="PRS">Dari</MenuItem>
                                                <MenuItem value="DIN">Dinka</MenuItem>
                                                <MenuItem value="BIN">Edo</MenuItem>
                                                <MenuItem value="ENG">English</MenuItem>
                                                <MenuItem value="EST">Estonian</MenuItem>
                                                <MenuItem value="EWE">Ewe</MenuItem>
                                                <MenuItem value="FIN">Finnish</MenuItem>
                                                <MenuItem value="NLD">Flemish</MenuItem>
                                                <MenuItem value="FRA">French</MenuItem>
                                                <MenuItem value="GAA">Ga</MenuItem>
                                                <MenuItem value="GAD">Gaddang</MenuItem>
                                                <MenuItem value="KAT">Georgian</MenuItem>
                                                <MenuItem value="DEU">German</MenuItem>
                                                <MenuItem value="GUJ">Gujarati</MenuItem>
                                                <MenuItem value="HAT">Haitian Creole</MenuItem>
                                                <MenuItem value="HAU">Hausa</MenuItem>
                                                <MenuItem value="HEB">Hebrew</MenuItem>
                                                <MenuItem value="HIN">Hindi</MenuItem>
                                                <MenuItem value="HUN">Hungarian</MenuItem>
                                                <MenuItem value="IBG">Ibanag</MenuItem>
                                                <MenuItem value="ISL">Icelandic</MenuItem>
                                                <MenuItem value="IBO">Igbo</MenuItem>
                                                <MenuItem value="IND">Indonesian</MenuItem>
                                                <MenuItem value="IKU">Inuktitut</MenuItem>
                                                <MenuItem value="ITA">Italian</MenuItem>
                                                <MenuItem value="JPN">Japanese</MenuItem>
                                                <MenuItem value="JAV">Javanese</MenuItem>
                                                <MenuItem value="KAS">Kashmiri</MenuItem>
                                                <MenuItem value="KAZ">Kazakh</MenuItem>
                                                <MenuItem value="KIK">Kikuyu</MenuItem>
                                                <MenuItem value="KIN">Kinyarwanda</MenuItem>
                                                <MenuItem value="KOR">Korean</MenuItem>
                                                <MenuItem value="KRI">Krio</MenuItem>
                                                <MenuItem value="KUR">Kurdish</MenuItem>
                                                <MenuItem value="KIR">Kyrgyz</MenuItem>
                                                <MenuItem value="LKT">Lakota</MenuItem>
                                                <MenuItem value="LAV">Latvian</MenuItem>
                                                <MenuItem value="LIN">Lingala</MenuItem>
                                                <MenuItem value="LIT">Lithuanian</MenuItem>
                                                <MenuItem value="YMM">Maay</MenuItem>
                                                <MenuItem value="MKD">Macedonian</MenuItem>
                                                <MenuItem value="MAL">Malayalam</MenuItem>
                                                <MenuItem value="MLT">Maltese</MenuItem>
                                                <MenuItem value="MAN">Mandingo</MenuItem>
                                                <MenuItem value="MNK">Mandinka</MenuItem>
                                                <MenuItem value="MAR">Marathi</MenuItem>
                                                <MenuItem value="MAH">Marshallese</MenuItem>
                                                <MenuItem value="MON">Mongolian</MenuItem>
                                                <MenuItem value="CNR">Montenegrin</MenuItem>
                                                <MenuItem value="NAV">Navajo</MenuItem>
                                                <MenuItem value="NAP">Neapolitan</MenuItem>
                                                <MenuItem value="PCM">Nigerian Pidgin</MenuItem>
                                                <MenuItem value="NOR">Norwegian</MenuItem>
                                                <MenuItem value="ORM">Oromo</MenuItem>
                                                <MenuItem value="PAP">Papiamento</MenuItem>
                                                <MenuItem value="POL">Polish</MenuItem>
                                                <MenuItem value="POR">Portuguese</MenuItem>
                                                <MenuItem value="FUC">Pulaar</MenuItem>
                                                <MenuItem value="PAN">Punjabi</MenuItem>
                                                <MenuItem value="RON">Romanian</MenuItem>
                                                <MenuItem value="RUS">Russian</MenuItem>
                                                <MenuItem value="SMO">Samoan</MenuItem>
                                                <MenuItem value="SRP">Serbian</MenuItem>
                                                <MenuItem value="SNA">Shona</MenuItem>
                                                <MenuItem value="SCN">Sicilian</MenuItem>
                                                <MenuItem value="SIN">Sinhalese</MenuItem>
                                                <MenuItem value="SLK">Slovak</MenuItem>
                                                <MenuItem value="SOM">Somali</MenuItem>
                                                <MenuItem value="SPA">Spanish</MenuItem>
                                                <MenuItem value="APD">Sudanese Arabic</MenuItem>
                                                <MenuItem value="SUN">Sundanese</MenuItem>
                                                <MenuItem value="SUS">Susu</MenuItem>
                                                <MenuItem value="SWE">Swedish</MenuItem>
                                                <MenuItem value="TGL">Tagalog</MenuItem>
                                                <MenuItem value="TGK">Tajik</MenuItem>
                                                <MenuItem value="TAM">Tamil</MenuItem>
                                                <MenuItem value="TEL">Telugu</MenuItem>
                                                <MenuItem value="THA">Thai</MenuItem>
                                                <MenuItem value="BOD">Tibetan</MenuItem>
                                                <MenuItem value="TIG">Tigre</MenuItem>
                                                <MenuItem value="TIR">Tigrinya</MenuItem>
                                                <MenuItem value="TUR">Turkish</MenuItem>
                                                <MenuItem value="TWI">Twi</MenuItem>
                                                <MenuItem value="UKR">Ukrainian</MenuItem>
                                                <MenuItem value="URD">Urdu</MenuItem>
                                                <MenuItem value="UIG">Uyghur</MenuItem>
                                                <MenuItem value="UZB">Uzbek</MenuItem>
                                                <MenuItem value="VIE">Vietnamese</MenuItem>
                                                <MenuItem value="CYM">Welsh</MenuItem>
                                                <MenuItem value="WOL">Wolof</MenuItem>
                                                <MenuItem value="YID">Yiddish</MenuItem>
                                                <MenuItem value="YOR">Yoruba</MenuItem>
                                            </Select>
                                            </FormControl>
                                        <label>
                                            Gender:
                                        </label>
                                            <FormControl variant="filled" className="gender dropdown">
                                                <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    name="gender"
                                                    value={this.state.gender}
                                                    onChange={this.handleChange}
                                                >
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="female">Female</MenuItem>
                                                    <MenuItem value="other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        <label/>
                                        <label>
                                            Other Language:
                                            <br/>
                                            (optional)
                                        </label>
                                        <FormControl variant="filled" className="otherLanguage dropdown">
                                            <InputLabel id="demo-simple-select-filled-label">Other Language</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="otherLanguage"
                                                value={this.state.otherLanguage}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value="AFR">Afrikaans</MenuItem>
                                                <MenuItem value="AKA">Akan</MenuItem>
                                                <MenuItem value="SQI">Albanian</MenuItem>
                                                <MenuItem value="AMH">Amharic</MenuItem>
                                                <MenuItem value="ARA">Arabic</MenuItem>
                                                <MenuItem value="AZE">Azerbaijani</MenuItem>
                                                <MenuItem value="EUS">Basque</MenuItem>
                                                <MenuItem value="BEN">Bengali</MenuItem>
                                                <MenuItem value="BOS">Bosnian</MenuItem>
                                                <MenuItem value="BUL">Bulgarian</MenuItem>
                                                <MenuItem value="MYA">Burmese</MenuItem>
                                                <MenuItem value="CHA">Chamorro</MenuItem>
                                                <MenuItem value="CBK">Chavacano</MenuItem>
                                                <MenuItem value="CHK">Chuukese</MenuItem>
                                                <MenuItem value="CRE">Cree</MenuItem>
                                                <MenuItem value="HRV">Croatian</MenuItem>
                                                <MenuItem value="CES">Czech</MenuItem>
                                                <MenuItem value="DAK">Dakota</MenuItem>
                                                <MenuItem value="DAN">Danish</MenuItem>
                                                <MenuItem value="PRS">Dari</MenuItem>
                                                <MenuItem value="DIN">Dinka</MenuItem>
                                                <MenuItem value="BIN">Edo</MenuItem>
                                                <MenuItem value="ENG">English</MenuItem>
                                                <MenuItem value="EST">Estonian</MenuItem>
                                                <MenuItem value="EWE">Ewe</MenuItem>
                                                <MenuItem value="FIN">Finnish</MenuItem>
                                                <MenuItem value="NLD">Flemish</MenuItem>
                                                <MenuItem value="FRA">French</MenuItem>
                                                <MenuItem value="GAA">Ga</MenuItem>
                                                <MenuItem value="GAD">Gaddang</MenuItem>
                                                <MenuItem value="KAT">Georgian</MenuItem>
                                                <MenuItem value="DEU">German</MenuItem>
                                                <MenuItem value="GUJ">Gujarati</MenuItem>
                                                <MenuItem value="HAT">Haitian Creole</MenuItem>
                                                <MenuItem value="HAU">Hausa</MenuItem>
                                                <MenuItem value="HEB">Hebrew</MenuItem>
                                                <MenuItem value="HIN">Hindi</MenuItem>
                                                <MenuItem value="HUN">Hungarian</MenuItem>
                                                <MenuItem value="IBG">Ibanag</MenuItem>
                                                <MenuItem value="ISL">Icelandic</MenuItem>
                                                <MenuItem value="IBO">Igbo</MenuItem>
                                                <MenuItem value="IND">Indonesian</MenuItem>
                                                <MenuItem value="IKU">Inuktitut</MenuItem>
                                                <MenuItem value="ITA">Italian</MenuItem>
                                                <MenuItem value="JPN">Japanese</MenuItem>
                                                <MenuItem value="JAV">Javanese</MenuItem>
                                                <MenuItem value="KAS">Kashmiri</MenuItem>
                                                <MenuItem value="KAZ">Kazakh</MenuItem>
                                                <MenuItem value="KIK">Kikuyu</MenuItem>
                                                <MenuItem value="KIN">Kinyarwanda</MenuItem>
                                                <MenuItem value="KOR">Korean</MenuItem>
                                                <MenuItem value="KRI">Krio</MenuItem>
                                                <MenuItem value="KUR">Kurdish</MenuItem>
                                                <MenuItem value="KIR">Kyrgyz</MenuItem>
                                                <MenuItem value="LKT">Lakota</MenuItem>
                                                <MenuItem value="LAV">Latvian</MenuItem>
                                                <MenuItem value="LIN">Lingala</MenuItem>
                                                <MenuItem value="LIT">Lithuanian</MenuItem>
                                                <MenuItem value="YMM">Maay</MenuItem>
                                                <MenuItem value="MKD">Macedonian</MenuItem>
                                                <MenuItem value="MAL">Malayalam</MenuItem>
                                                <MenuItem value="MLT">Maltese</MenuItem>
                                                <MenuItem value="MAN">Mandingo</MenuItem>
                                                <MenuItem value="MNK">Mandinka</MenuItem>
                                                <MenuItem value="MAR">Marathi</MenuItem>
                                                <MenuItem value="MAH">Marshallese</MenuItem>
                                                <MenuItem value="MON">Mongolian</MenuItem>
                                                <MenuItem value="CNR">Montenegrin</MenuItem>
                                                <MenuItem value="NAV">Navajo</MenuItem>
                                                <MenuItem value="NAP">Neapolitan</MenuItem>
                                                <MenuItem value="PCM">Nigerian Pidgin</MenuItem>
                                                <MenuItem value="NOR">Norwegian</MenuItem>
                                                <MenuItem value="ORM">Oromo</MenuItem>
                                                <MenuItem value="PAP">Papiamento</MenuItem>
                                                <MenuItem value="POL">Polish</MenuItem>
                                                <MenuItem value="POR">Portuguese</MenuItem>
                                                <MenuItem value="FUC">Pulaar</MenuItem>
                                                <MenuItem value="PAN">Punjabi</MenuItem>
                                                <MenuItem value="RON">Romanian</MenuItem>
                                                <MenuItem value="RUS">Russian</MenuItem>
                                                <MenuItem value="SMO">Samoan</MenuItem>
                                                <MenuItem value="SRP">Serbian</MenuItem>
                                                <MenuItem value="SNA">Shona</MenuItem>
                                                <MenuItem value="SCN">Sicilian</MenuItem>
                                                <MenuItem value="SIN">Sinhalese</MenuItem>
                                                <MenuItem value="SLK">Slovak</MenuItem>
                                                <MenuItem value="SOM">Somali</MenuItem>
                                                <MenuItem value="SPA">Spanish</MenuItem>
                                                <MenuItem value="APD">Sudanese Arabic</MenuItem>
                                                <MenuItem value="SUN">Sundanese</MenuItem>
                                                <MenuItem value="SUS">Susu</MenuItem>
                                                <MenuItem value="SWE">Swedish</MenuItem>
                                                <MenuItem value="TGL">Tagalog</MenuItem>
                                                <MenuItem value="TGK">Tajik</MenuItem>
                                                <MenuItem value="TAM">Tamil</MenuItem>
                                                <MenuItem value="TEL">Telugu</MenuItem>
                                                <MenuItem value="THA">Thai</MenuItem>
                                                <MenuItem value="BOD">Tibetan</MenuItem>
                                                <MenuItem value="TIG">Tigre</MenuItem>
                                                <MenuItem value="TIR">Tigrinya</MenuItem>
                                                <MenuItem value="TUR">Turkish</MenuItem>
                                                <MenuItem value="TWI">Twi</MenuItem>
                                                <MenuItem value="UKR">Ukrainian</MenuItem>
                                                <MenuItem value="URD">Urdu</MenuItem>
                                                <MenuItem value="UIG">Uyghur</MenuItem>
                                                <MenuItem value="UZB">Uzbek</MenuItem>
                                                <MenuItem value="VIE">Vietnamese</MenuItem>
                                                <MenuItem value="CYM">Welsh</MenuItem>
                                                <MenuItem value="WOL">Wolof</MenuItem>
                                                <MenuItem value="YID">Yiddish</MenuItem>
                                                <MenuItem value="YOR">Yoruba</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <br/>
                                <hr/>
                                <div className="address">
                                    <h1>Usual Address / Place of Residence</h1>
                                    <div className="grid-container">
                                        <label>
                                            Full Address:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Full Address" variant="filled" size="small" name="fullAddress" value={this.state.fullAddress} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Country:
                                        </label>
                                        <FormControl variant="filled" className="country dropdown">
                                            <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                name="country"
                                                value={this.state.country}
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
                                    </div>
                                </div>
                                <br/>
                                <hr/>
                                <div className="contact">
                                    <h1>Contact Details</h1>
                                    <div className="grid-container">
                                        <label>
                                            Home/Work Phone:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Home/Work Phone" variant="filled" size="small" name="homeWorkPhone" value={this.state.homeWorkPhone} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Personal Phone:
                                            <br/>
                                            (optional)
                                        </label>
                                            <TextField id="filled-basic" placeholder="Personal Phone" variant="filled" size="small" name="personalPhone" value={this.state.personalPhone} onChange={this.handleChange}/>
                                        <label>
                                            Whatsapp/Viber:
                                            <br/>
                                            (optional)
                                        </label>
                                            <TextField id="filled-basic" placeholder="Whatsapp/Viber" variant="filled" size="small" name="whatsAppPhone" value={this.state.whatsAppPhone} onChange={this.handleChange}/>
                                        <label/>
                                        <label>
                                            Email:
                                        </label>
                                            <TextField id="filled-basic" placeholder="Email" variant="filled" size="small" name="email" value={this.state.email} onChange={this.handleChange}/>
                                        <label>
                                            Other:
                                            <br/>
                                            (optional)
                                        </label>
                                            <TextField id="filled-basic" placeholder="Other" variant="filled" size="small" name="otherCommunication" value={this.state.otherCommunication} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="Button">
                                    <Button variant="contained" type="submit">
                                        Next Page
                                    </Button>
                                </div>
                            </form>
                            <br/>
                        </div>
                    </Route>
                    <Route exact path="/personal_info_2">
                        <PersonalInfo2 />
                    </Route>
                    <Route exact path="/log_in_page">
                        <PersonalInfo2 />
                    </Route>
                </Switch>
            </Router>
        )
    }
}