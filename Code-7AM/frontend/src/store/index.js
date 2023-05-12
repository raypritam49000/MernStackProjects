
import {createStore,configureStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
//const store = configureStore(mainReducer,composeEnhancers(applyMiddleware(thunk)));

 export default  store;