// frontend/src/reducers/taskReducer.js
import {
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASKS_SUCCESS,
    ADD_TASKS_FAILURE,
    DELETE_TASKS_SUCCESS,
    DELETE_TASKS_FAILURE,
    EDIT_TASKS_SUCCESS,
    EDIT_TASKS_FAILURE,
} from '../actions/taskActions';

const initialState = {
    tasks: [],
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                error: null,
            };
        case FETCH_TASKS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                error: null,
            };
        case ADD_TASKS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_TASKS_SUCCESS:
                return {
                    ...state,
                    tasks: state.tasks.filter(task => task._id !== action.payload),
                    error: null,
                };
        case DELETE_TASKS_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                };

        case EDIT_TASKS_SUCCESS:
                return {
                    ...state,
                    tasks: state.tasks.map(task =>
                        task.id === action.payload.id ? action.payload : task
                    ),
                        error: null,
                    };
        case EDIT_TASKS_FAILURE:
                return {
                        ...state,
                        error: action.payload,
                    };
        default:
            return state;
    }
};

export default taskReducer;
