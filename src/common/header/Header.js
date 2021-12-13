import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import { ThreeSixty } from '@material-ui/icons';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            isModalOpen: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
        }
    }


    openModalHandler = () => {
        this.setState({
            value: 0,
            isModalOpen: true,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            usernameRequired: "displayNone",
            username: "",
            loginPasswordRequired: "displayNone",
            loginPassword: "",
            firstnameRequired: "displayNone",
            firstname: "",
            lastnameRequired: "displayNone",
            lastname: "",
            emailRequired: "displayNone",
            email: "",
            registerPasswordRequired: "displayNone",
            registerPassword: "",
            contactRequired: "displayNone",
            contact: ""
        });
    }


    changeTabHandler = (event, value) => {
        this.setState({ value });
    }

    modalCloseHandler = () => {
        this.setState({ isModalOpen: false });
    }

    loginClickHandler = () => {
        if (this.state.username === "") {
            this.setState({ usernameRequired: "displayBlock" })
        } else {
            this.setState({ usernameRequired: "displayNone" })
        }

        if (this.state.loginPassword === "") {
            this.setState({ loginPasswordRequired: "displayBlock" })
        } else {
            this.setState({ loginPasswordRequired: "displayNone" })
        }

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.modalCloseHandler();
            }
        });

        xhrLogin.open("POST", "http://localhost:8085/api/v1/auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.send(dataLogin);

    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    loginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value })
    }


    firstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value })
    }

    lastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value })
    }

    registerPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value })
    }

    emailChangeHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    contactChangeHandler = (e) => {
        this.setState({ contact: e.target.value })
    }

    registerClickHandler = () => {
        if (this.state.email === "") {
            this.setState({ emailRequired: "displayBlock" });
        } else {
            this.setState({ emailRequired: "displayNone" });
        }

        if (this.state.firstname === "") {
            this.setState({ firstnameRequired: "displayBlock" });
        } else {
            this.setState({ firstnameRequired: "displayNone" });
        }

        if (this.state.registerPassword === "") {
            this.setState({ registerPasswordRequired: "displayBlock" });
        } else {
            this.setState({ registerPasswordRequired: "displayNone" });
        }

        if (this.state.contact === "") {
            this.setState({ contactRequired: "displayBlock" });
        } else {
            this.setState({ contactRequired: "displayNone" });
        }

        if (this.state.lastname === "") {
            this.setState({ lastnameRequired: "displayBlock" });
        } else {
            this.setState({ lastnameRequired: "displayNone" });
        }
        let params = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword

        })

        let xhrSignup = new XMLHttpRequest();
        let that = this;

        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState == 4) {
                that.setState({ registrationSuccess: true })
            }
        })

        xhrSignup.open("POST", "http://localhost:8085/api/v1/signup")
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.send(params);
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }


    render() {
        return (
            <div className="header">
                <img src={logo} className="logo" alt="Logo" />

                {!this.state.loggedIn ?
                    <div className="button-login">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            Login
                        </Button>
                    </div>
                    :
                    <div className="button-login">
                        <Button variant="contained" color="default" onClick={this.logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }

                {this.props.showBookShowButton === "true" && !this.state.loggedIn
                    ? <div className="button-bookshow">
                        <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                            Book Show
                        </Button>
                    </div>
                    : ""
                }

                {this.props.showBookShowButton === "true" && this.state.loggedIn
                    ? <div className="button-bookshow">
                        <Link to={"/bookshow/" + this.props.id}>
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button>
                        </Link>
                    </div>
                    : ""
                }

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.modalCloseHandler}
                    style={modalStyle}
                    contentLabel="Login"

                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.changeTabHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.usernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.loginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.firstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.lastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.emailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.registerPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.contactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}
export default Header


