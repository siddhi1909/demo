import React, {Component} from 'react';
export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state = {
        username: (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username !== '')?JSON.parse(localStorage.getItem('user')).username:'User',

    }

    setUsername = username => {
        this.setState({'username': username});
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    }
}