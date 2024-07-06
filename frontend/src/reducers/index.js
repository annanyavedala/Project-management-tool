import { combineReducers } from "redux";
import authReducer from './authReducers';
import projectReducer from './projectReducers';
import taskReducer from './taskReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer
})

export default rootReducer;
