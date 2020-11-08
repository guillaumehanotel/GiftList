import {applyMiddleware, createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {yearReducer} from '@store/year/reducer';
import thunk from 'redux-thunk';
import {authReducer} from 'store/auth/reducer';

const rootReducer = combineReducers({
  year: yearReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
