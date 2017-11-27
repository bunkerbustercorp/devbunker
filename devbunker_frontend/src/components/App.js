import React, { Component } from 'react';

import { HomePage, RegisterPage } from 'components';
import { Route } from 'react-router-dom';
import { 
    ScreenMaskContainer,
    LoginModalContainer,
    UserLoader,
 } from 'containers';


class App extends Component {
    render() {
        return (
        <div>
            <Route exact path ="/" component={HomePage}/>
            <Route path="/register" component={RegisterPage}/>
            <ScreenMaskContainer/>
            <LoginModalContainer/>
            <UserLoader/>
        </div>
        );
    }
}

export default App;