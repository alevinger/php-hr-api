import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import departments from './department/reducer';

const rootReducer = combineReducers({
    departments,
});

const logger = createLogger({
    collapsed: true,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof rootReducer>;

export type ThunkResult<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;

export default store;
