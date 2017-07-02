import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// const reducers = combineReducers({});

const reduxDevtools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = reduxDevtools || compose;

export const initStore = (initialState = {a: 1}) =>
  createStore((state) => state, initialState, composeEnhancers);