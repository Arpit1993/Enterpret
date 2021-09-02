import {combineReducers} from "redux";
import mainReducer from './reducers/mainReducer';
import ruleReducer from './reducers/ruleReducer';

export const rootReducer = combineReducers({
    main: mainReducer,
    rule: ruleReducer
});

