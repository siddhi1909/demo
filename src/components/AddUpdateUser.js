import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Toast from '../components/Toast';
import {AppContext} from '../context/AppProvider';

export default class AddUpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: null,
                username: '',
                password: ''
            },
            isFormValid: true,
            validationMessage: '',
            success: true,
            userList: [],
            showToast: false,
            levelToast: 'success',
            messageToast: '',
            updateActive: false
        }
    }

    onLogout = () => {
        localStorage.removeItem('user');
        this.props.history.push("/");
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var userProperty = {...this.state.user};
        if(value !== userProperty[name]) {
            userProperty[name] = value;
            this.setState({user: userProperty, isFormValid: true, validationMessage: '',updateActive: true});
        } else {
            this.setState({updateActive: false});
        }
    }
    showToast = () => {
        this.setState({
            showToast: true
        }, () => {
            setTimeout(() =>
                    this.setState({showToast: false})
                , 3000)
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.user.username === '' || this.state.user.password === '') {
            this.setState({isFormValid: false, validationMessage: "In-appropriate Data!", success: false})
            return
        }

        if (!this.state.user.id) {
            let userList = this.state.userList;
            let lastElement = [...this.state.userList].pop()
            this.state.user.id = lastElement.id + 1;
            userList.push(this.state.user)
            localStorage.setItem('userList', JSON.stringify(userList));
            this.setState({
                user: {id: null, username: '', password: ''},
                validationMessage: "User Successfully Added!",
                success: true
            })
        } else {
            let userListTemp = [...this.state.userList];
            let userTemp = {...this.state.user};

            let foundIndex = userListTemp.findIndex(element => element.id === userTemp.id);
            if(foundIndex!=-1) {
                userListTemp.splice(foundIndex, 1, userTemp);
                localStorage.setItem('userList', JSON.stringify(userListTemp));
                this.setState({userList: userListTemp, success: true, messageToast: "User Successfully Updated!"})
                this.showToast();
                setTimeout(() => this.props.history.push("/dashboard"), 3500);
            }
        }
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        let userList = [];
        if (localStorage.getItem('userList')) {
            userList = JSON.parse(localStorage.getItem('userList'))
            this.setState({userList: userList})
        }
        let found = userList.find((element) => {
            return element.id === id;
        })
        if (found) {
            this.setState({user: found})
        } else if (this.props.match.params.id && !found) {
            this.setState({messageToast: "No User Found!"})
            this.showToast();
        }
    }

    render() {
        let boxClass = ["form-box"];
        let messageBoxClass = ["alert"];
        if (!this.state.isFormValid) {
            boxClass.push('was-validated');
        }
        if (this.state.success) {
            messageBoxClass.push('alert-success')
        } else {
            messageBoxClass.push('alert-danger')
        }
        return (
            <>
                <nav className="navbar navbar-dark sticky-top bg-dark">
                    <Link className="back-link" to="/dashboard">&#8668;</Link>
                    <span></span>
                    <button onClick={this.onLogout} className="btn btn-outline-success float-right"
                            type="button">Logout
                    </button>
                </nav>

                <div className="container">
                    <div id="sidenav">
                        <div className="wrapper">
                            <div className="menu">
                                <ul>
                                    <li>Welcome&nbsp;
                                        <AppContext.Consumer>
                                            {(context) => context.username}
                                        </AppContext.Consumer>
                                    </li>
                                </ul>
                            </div>
                            <div className="menu">&nbsp;
                            </div>

                            <div className="card text-white bg-danger mb-3">
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                            <div className="card text-white bg-info mb-3">
                                <div className="card-body">
                                </div>
                            </div>
                            <div className="card text-white bg-secondary mb-3">
                                <div className="card-body">
                                </div>
                            </div>
                            <div className="card text-white bg-light mb-3">
                                <div className="card-body">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h2>Create users: </h2>
                            <form onSubmit={this.onSubmit} className={boxClass.join(' ')}>
                                {(this.state.validationMessage) ?
                                    (<div className={messageBoxClass.join(' ')}>
                                        {this.state.validationMessage}
                                    </div>) : ''
                                }
                                <div className="form-group">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="text" name="username" className="form-control" id="inputUsername"
                                           placeholder="Username"
                                           required value={this.state.user.username} onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">Please enter a valid username.</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input type="password" name="password" className="form-control" id="inputPassword"
                                           placeholder="Password"
                                           required value={this.state.user.password} onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">Please enter your password to continue.</div>
                                </div>
                                <button type="submit" disabled={this.state.user.id && !this.state.updateActive}
                                        className="btn btn-outline-success btn-block">{(this.state.user.id) ? "Update" : "Add"}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Toast
                    level={this.state.levelToast}
                    message={this.state.messageToast}
                    visible={this.state.showToast}
                />
            </>
        )
    }
}