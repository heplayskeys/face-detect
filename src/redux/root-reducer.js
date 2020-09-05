import { combineReducers } from 'redux';
import inputReducer from './input/input.reducer';
import routeReducer from './route/route.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
	setInput: inputReducer,
	setRoute: routeReducer,
	setUser: userReducer
});

export default rootReducer;
