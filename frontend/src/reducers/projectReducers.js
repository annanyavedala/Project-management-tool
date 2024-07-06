// frontend/src/reducers/projectReducer.js
import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_FAILURE,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_FAILURE
  } from '../actions/projectActions';
  
  const initialState = {
    projects: [],
    loading: true,
    error: null,
  };
  
  const projectReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case FETCH_PROJECT_SUCCESS:
        return {
          ...state,
          projects: payload,
          loading: false,
          error: null,
        };
      case FETCH_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      case ADD_PROJECT_SUCCESS:
        return {
          ...state,
          projects: [...state.projects, payload],
          loading: false,
          error: null,
        };
      case ADD_PROJECT_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
        case DELETE_PROJECT_SUCCESS:
          return {
            ...state,
            projects: state.projects.filter(project => project._id !== action.payload),
            loading: false,
            error: null,
          };
        case DELETE_PROJECT_FAILURE:
          return {
            ...state,
            loading: false,
            error: payload,
          };
        case EDIT_PROJECT_SUCCESS:
            return {
              ...state,
              projects: state.projects.map(project => project.id === action.payload.id?action.payload:project),
              loading: false,
              error: null,
            };
        case EDIT_PROJECT_FAILURE:
            return {
              ...state,
              loading: false,
              error: payload,
            };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  