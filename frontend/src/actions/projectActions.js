import React from 'react';
import api from '../services/apiService';
export const FETCH_PROJECT_SUCCESS='FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE='FETCH_PROJECT_FAILURE';
export const ADD_PROJECT_SUCCESS='ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE='ADD_PROJECT_FAILURE';
export const DELETE_PROJECT_SUCCESS='DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE='DELETE_PROJECT_FAILURE';
export const EDIT_PROJECT_SUCCESS='EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_FAILURE='EDIT_PROJECT_FAILURE';



export const fetchProjects=()=> async (dispatch)=>{

    try{
        const res = await api.get('/projects')
        dispatch({
            type:FETCH_PROJECT_SUCCESS,
            payload: res.data
        });
        
    }catch(err){
        dispatch({
            type: FETCH_PROJECT_FAILURE,
            payload: err.message,
          });

    }
};

export const addProject = (project) => async (dispatch) => {
    try {
      const res = await api.post('/addProject', project);
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_PROJECT_FAILURE,
        payload: err.message,
      });
    }
  };

  export const deleteProject = (projectId) => async (dispatch) => {
    try {
      const res = await api.post('/deleteProject', { id: projectId });
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: projectId,
      });
    } catch (err) {
      dispatch({
        type: DELETE_PROJECT_FAILURE,
        payload: err.message,
      });
    }
  };


  export const editProject = (projectId, project) => async (dispatch) => {
    try {
      const res = await api.post(`/${projectId}/editProject`, project);
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: project,
      });
    } catch (err) {
      dispatch({
        type: EDIT_PROJECT_FAILURE,
        payload: err.message,
      });
    }
  };

