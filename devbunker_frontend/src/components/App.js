import React, { Component } from 'react';

import { 
    HomePage,
    CommunityPage,
    ReadPage,
    WritePage,
    RegisterPage
} from 'components';
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
            <Route exact path ="/community" component={CommunityPage}/>
            <Route exact path ="/read" component={ReadPage}/>
            <Route exact path ="/write" component={WritePage}/>
            <Route exact path ="/mypage" component={CommunityPage}/>
            <Route path="/register" component={RegisterPage}/>
            <ScreenMaskContainer/>
            <LoginModalContainer/>
            <UserLoader/>
        </div>
        );
    }
}

export default App;