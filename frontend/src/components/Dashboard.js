import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject, deleteProject, editProject } from '../actions/projectActions';
import { CircularProgress, Typography, Paper, List, ListItem, Button as MuiButton, TextField, Dialog, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

const ProjectList = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ProjectItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { tasks, err } = useSelector((state) => state.tasks);
  const [viewProgress, setviewProgress]= useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, seteditingTask]= useState(null);
  const [formValues, setformValues]= useState({
    name:'',
    description:''
  })

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);


  const onAddProject = (e) => {
    e.preventDefault();
    dispatch(addProject({ name, description }));
    setName('');
    setDescription('');
  };

  const handleProjectDelete = (projectId) => () => {
    dispatch(deleteProject(projectId));
  };

  const handleProjectEdit=(project) =>{
    seteditingTask(project);
}

  const handleFormChange=(e)=>{
    e.preventDefault();
    const {name, value}= e.target;
    setformValues({...formValues, [name]:value })
  }

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditFormSubmit =() =>{
    dispatch(editProject(editingTask._id, formValues))
    seteditingTask(null);

  }

  


  return (
    <Container>
      <Typography variant="h2">Project Dashboard</Typography>
      <Paper style={{ padding: '16px', width: '100%' }}>
      <form onSubmit={onAddProject}>
        <TextField
          label="Project Name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Project Description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" type="submit" color="primary" style={{ marginTop: '8px' }}>
          Add Project
        </Button>
      </form>
      </Paper>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{`Error: ${error}`}</Typography>
      ) : (
        <List>
          {projects.map((project) => (
            <ListItem key={project._id} style={{ marginBottom: '8px' }}>
              <Paper style={{ padding: '16px', width: '100%' }}>
                <div>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </div>
                <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => handleProjectClick(project._id)} style={{ marginTop: '8px' }} color="success">GO TO PROJECT TASKS</Button>
                <Button variant="outlined" onClick={handleProjectDelete(project._id)} style={{ marginTop: '8px' }} color="error">DELETE PROJECT</Button>
                <Button variant="outlined" onClick={() => handleProjectEdit(project)} style={{ marginTop: '8px' }}>EDIT PROJECT</Button>
              </Stack>
              </Paper>
            </ListItem>
          ))}
          <Dialog open={!!editingTask} onClose={() => seteditingTask(null)}>
          <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Project Name"
                        type="text"
                        fullWidth
                        value={formValues.name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formValues.description}
                        onChange={handleFormChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => seteditingTask(null)} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleEditFormSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>

          </Dialog>
        </List>
      )}
    </Container>
  );
};

export default Dashboard;
