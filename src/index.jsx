import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    HashRouter,
    Routes,
} from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Main from 'Components/Main.jsx';
import { searchParams, pageState, loginState } from 'States/reducers.js';

// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const store = createStore(
    combineReducers({
        searchParams, pageState, loginState
    }),
);

ReactDOM.createRoot(
    document.getElementById('root'),
).render(
    <Provider store={store}>
        <HashRouter basename="/">
            <Main />
        </HashRouter>,
    </Provider>,
);