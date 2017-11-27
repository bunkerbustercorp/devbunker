import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import { AppContainer as HotContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import Root from './Root';
import 'styles/main.scss';
import axios from 'axios';

window.axios = axios;

const render = (Component) => ReactDOM.render(
    (
        <HotContainer>
            <Component store={store}/>
        </HotContainer>
    ), 
    document.getElementById('root')
);

render(Root);

if(module.hot) {
    module.hot.accept('./Root', () => render(Root))
}

registerServiceWorker();