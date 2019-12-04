import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import authReducer from './store/reducers/auth';
import navbarReducer from './store/reducers/navbar';
import studentReducer from './store/reducers/student';
import countryReducer from './store/reducers/countries';
import chatReducer from './store/reducers/chat';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchStudent,watchCountries, watchChat } from './store/sagas/index';

const composeEnhancers = compose;

const rootReducers = combineReducers({
    auth: authReducer,
    navbar: navbarReducer,
    student: studentReducer,
    country: countryReducer,
    chat: chatReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchStudent);
sagaMiddleware.run(watchCountries);
sagaMiddleware.run(watchChat);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
