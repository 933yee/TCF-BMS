import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
} from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Main from 'Components/Main.jsx';
import { searchParams, pageState, loginState } from 'States/reducers.js';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const store = createStore(
    combineReducers({
        searchParams, pageState, loginState
    }),
);

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/">
            <Main />
        </Router>,
    </Provider>,
    document.getElementById('root')
);