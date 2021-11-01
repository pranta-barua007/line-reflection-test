import { createStore, applyMiddleware, compose } from 'redux';

import  logger  from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if(process.env.NODE_ENV !== 'production'){
    middleWares.push(logger);  
} 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));

export default store;