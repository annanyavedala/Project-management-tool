import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, deleteTask, editTask } from '../actions/taskActions';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import { Button, List, ListItem, ListItemText, Dialog, DialogActions, Typography, DialogContent, DialogTitle } from '@mui/material';
import Stack from '@mui/material/Stack';


const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const TaskForm = ({ projectId }) => {
    const formatDate = (dateString) => {
        return dateString.substring(0, 10); // This will work if the date is always in ISO format
      };

    const dispatch = useDispatch();
    const { tasks, error } = useSelector((state) => state.tasks);
    const [newTask, setNewTask] = useState({ name: '', assignedTo: '', status: '', dueDate:''});
    const [editingTask, seteditingTask]= useState(null);
    const [formValues, setformValues] = useState({ name: '', assignedTo: '', status: '', dueDate:'' });

    const TaskSection = styled('div')(({ theme }) => ({
        flex: 1,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        border: '1px solid #ccc',
        borderRadius: '4px',
    }));

    const statuses = [
        {
          value: 'Pending',
          label: 'Pending',
        },
        {
          value: 'In Progress',
          label: 'In Progress',
        },
        {
          value: 'Completed',
          label: 'Completed',
        },
      ];
      


    useEffect(() => {
        if (projectId) {
            dispatch(fetchTasks(projectId)); // Fetch tasks when projectId changes
        }
    }, [dispatch, projectId]);

    const handleAddTask = (event) => {
        event.preventDefault();
        dispatch(addTask(projectId, newTask));
        setNewTask({ name: '', assignedTo: '', status: '', dueDate:'' });
    };

    const handleEditTask=(task) => (event)=>{
        event.preventDefault();
        seteditingTask(task);
        setformValues({name: task.name, assignedTo:task.assignedTo, status:task.status, dueDate:task.dueDate});
    }

    const handleFormChange=(e) =>{
        const {name, value}= e.target;
        setformValues({...formValues, [name]:value })

        
    }

    const handleDeleteTask = (taskId) => (event) => {
        event.preventDefault();
        dispatch(deleteTask(taskId));
        
    };

    const handleFormSubmit = (event) =>{
        console.log(editingTask._id);
        event.preventDefault();
        dispatch(editTask(editingTask._id, formValues));
        seteditingTask(null)

    }

    const renderTasks = (status) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <ListItem key={task._id} divider>
                    <ListItemText
                        primary={task.name}
                        secondary={`Assigned to: ${task.assignedTo}
                                    Status: ${task.status}
                                    Due Date: ${task.dueDate.substring(0, 10)}`}
                    />
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" style={{ marginTop: '8px' }} color="error" onClick={handleDeleteTask(task._id)}>
                            Delete Task
                        </Button>
                        <Button variant="outlined" style={{ marginTop: '8px' }} color="success" onClick={handleEditTask(task)}>
                            Edit Task
                        </Button>
                    </Stack>
                </ListItem>
            ));
    };

    return (
        <Container>
            <Typography variant="h2">Project Tasks</Typography>
            <form onSubmit={handleAddTask}>
                <TextField
                    label="Task Name"
                    variant="filled"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Assigned to"
                    variant="filled"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    select
                    label="Status"
                    variant="filled"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    fullWidth
                    margin="normal"
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Due Date"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                <Button variant="outlined" type="submit" style={{ marginTop: '8px' }} color="success">
                    Add Task
                </Button>

            </form>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TaskSection>
                    <Typography variant="h5">Pending</Typography>
                    <List>{renderTasks('Pending')}</List>
                </TaskSection>
                <TaskSection>
                    <Typography variant="h5">In Progress</Typography>
                    <List>{renderTasks('In Progress')}</List>
                </TaskSection>
                <TaskSection>
                    <Typography variant="h5">Completed</Typography>
                    <List>{renderTasks('Completed')}</List>
                </TaskSection>
            </div>
            
                <Dialog open={!!editingTask} onClose={() => seteditingTask(null)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Task Name"
                        type="text"
                        fullWidth
                        value={formValues.name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="assignedTo"
                        label="Assigned To"
                        type="text"
                        fullWidth
                        value={formValues.assignedTo}
                        onChange={handleFormChange}
                    />
                    <TextField
                    select
                    label="Status"
                    name="status"
                    variant="filled"
                    value={formValues.status}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Due Date"
                    type="date"
                    name = "dueDate"
                    value={formValues.dueDate ? formatDate(formValues.dueDate) : ''}
                    onChange={handleFormChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => seteditingTask(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </Container>
    );
};

export default TaskForm;
