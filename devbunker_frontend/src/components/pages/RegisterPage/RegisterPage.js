import React, { Component } from 'react';
import {
    HomeTemplate,
    RegisterTemplate,
    PolyBackground,
    Paper
} from 'components';
import {HeaderContainer, RegisterFormContainer} from 'containers';
class RegisterPage extends Component {
    state = {
        half: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                half: true
            });
        })
    }
    
    render() {
        const { half } = this.state;

        return (
            <HomeTemplate 
                header={<HeaderContainer isRegister/>}>
                <PolyBackground half={half}>
                </PolyBackground>
                <Paper>
                    <RegisterTemplate>
                        <RegisterFormContainer/>
                    </RegisterTemplate>
                </Paper>
            </HomeTemplate>
        );
    }
}

export default RegisterPage;