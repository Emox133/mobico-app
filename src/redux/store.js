import {applyMiddleware, compose, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'
// import dataReducer from './reducers/dataReducer'

const initialState = {}

const reducers = combineReducers({
    user: userReducer,
    UI: uiReducer
    // data: dataReducer 
})

const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(reducers, initialState, enhancer);

export default store
