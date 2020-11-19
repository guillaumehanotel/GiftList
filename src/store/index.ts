import {applyMiddleware, createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {yearReducer} from '@store/year/reducer';
import {authReducer} from 'store/auth/reducer';
import {personReducer} from 'store/person/reducer';
import {giftReducer} from 'store/gift/reducer';

const rootReducer = combineReducers({
  year: yearReducer,
  auth: authReducer,
  person: personReducer,
  gift: giftReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
