import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// Apply redux-thunk for async fetching
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;