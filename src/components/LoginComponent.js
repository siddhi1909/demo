import React, { Component } from 'react';
import logo from '../assets/images/star-wars-logo.png';
import '../styles/App.css';
import '../styles/bootstrap.min.css'
import { connect } from 'react-redux';
import {loginUserSucess}  from '../redux/actions/authActions';

class LoginComponent extends Component {
    userList;
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            username: '',
            password: '',
            isFormValid: true,
            validationMessage: ''
        }
    }

    onSubmit = async e => {
        e.preventDefault();
        let userList = [];
        userList = await fetch('https://swapi.co/api/people/?search=' + this.state.username)
            .then(response => response.json())
            .then(response => {
                this.setState({userList: response.results});
                return response.results;
            },);
        let index = userList.findIndex((element) => {
            return element.name === this.state.username && element.birth_year === this.state.password;
        })
        if(index!==-1){
            localStorage.setItem('user', JSON.stringify(this.state.username));
            this.props.dispatch(loginUserSucess(this.state.username));
            this.props.history.push('/dashboard');
        } else {
            this.setState({isFormValid: !this.state.isFormValid, validationMessage: "Wrong Username & password combination!"})
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value,isFormValid: true,validationMessage: ''});
    }

    render() {
        let boxClass = ["form-box"];
        if(!this.state.isFormValid) {
            boxClass.push('was-validated');
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="logo" alt="logo" />
                </div>
                <div className="container">
                    <form onSubmit={this.onSubmit} className={boxClass.join(' ')} id="login">
                        {(this.state.validationMessage)?
                            (<div className="alert alert-danger alert-dismissible fade show" >
                                <strong>Error!</strong> {this.state.validationMessage}
                            </div>):''
                        }
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control" id="username" placeholder="Username"
                                   required value={this.state.username} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">Please enter a valid username.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Password"
                                   required value={this.state.password} onChange={this.handleInputChange} />
                                <div className="invalid-feedback">Please enter your password to continue.</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    currentUser: state.auth.user,
});

export default connect(mapStateToProps, null)(LoginComponent);