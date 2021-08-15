import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer'

// buat composer enhancer untuk menghubungkan dengan Chrome DevTools Redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  gabung reducer, untuk sementara kosong, karena kita belum membuat reducer

const rootReducers = combineReducers({
	auth: authReducer,
	products: productReducer
});
//  buat store, dan gunakan composerEnhancer + middleware thunk
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store