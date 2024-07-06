// frontend/src/actions/taskActions.js
import api from '../services/apiService';

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASKS_SUCCESS = 'ADD_TASKS_SUCCESS';
export const ADD_TASKS_FAILURE = 'ADD_TASKS_FAILURE';
export const DELETE_TASKS_SUCCESS = 'DELETE_TASKS_SUCCESS';
export const DELETE_TASKS_FAILURE = 'DELETE_TASKS_FAILURE';
export const EDIT_TASKS_SUCCESS = 'EDIT_TASKS_SUCCESS';
export const EDIT_TASKS_FAILURE = 'EDIT_TASKS_FAILURE';

export const fetchTasks = (projectId) => async (dispatch) => {
    try {
        const res = await api.get(`/tasks/${projectId}`);
        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_TASKS_FAILURE,
            payload: err.message,
        });
    }
};

export const addTask = (projectId, task) => async (dispatch) => {
    try {
        const res = await api.post(`/tasks/${projectId}/Createtask`, task);
        dispatch({
            type: ADD_TASKS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ADD_TASKS_FAILURE,
            payload: err.message,
        });
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        const res = await api.post('/tasks/delete', { id: taskId });
        dispatch({
            type: DELETE_TASKS_SUCCESS,
            payload: taskId,
        });
    } catch (err) {
        dispatch({
            type: DELETE_TASKS_FAILURE,
            payload: err.message,
        });
    }
};

export const editTask = (taskId, task) => async (dispatch) => {
    try {
        const res = await api.post(`/tasks/${taskId}/edit`, task);
        dispatch({
            type: EDIT_TASKS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EDIT_TASKS_FAILURE,
            payload: err.message,
        });
    }
};

