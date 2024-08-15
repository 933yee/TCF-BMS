import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Switch
} from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Main from 'Components/Main.jsx';
import { searchParams, pageState, loginState, localDatabaseState } from 'States/reducers.js';

// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const store = createStore(
    combineReducers({
        searchParams, pageState, loginState, localDatabaseState
    }),
);

ReactDOM.createRoot(
    document.getElementById('root'),
).render(
    <Provider store={store}>
        <BrowserRouter basename="/">
            <Main />
        </BrowserRouter >,
    </Provider>,
);