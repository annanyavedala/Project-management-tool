import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { register } from '../actions/authActions';
import MenuItem from '@mui/material/MenuItem';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(2),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f9f9f9',
}));

const Button = styled('button')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const Alert = styled('div')(({ theme }) => ({
  color: 'red',
  marginBottom: theme.spacing(2),
}));

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role:'',
    email: '',
    password: ''
  });
  const statuses = [
    {
      value: 'Team Member',
      label: 'Team Member',
    },
    {
      value: 'Project Manager',
      label: 'Project Manager',
    },
    {
      value: 'Stakeholder',
      label: 'Stakeholder',
    },
    {
      value: 'Administrator',
      label: 'Administrator',
    },
    {
      value: 'Task Owner',
      label: 'Task Owner',
    },
  ];
  

  const { name, role, email, password } = formData;

  const auth = useSelector(state => state.auth);
  const { isAuthenticated, error } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ name, role, email, password }));
  };

  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert>'Registration failed'</Alert>}
      <TextField
        id="name"
        label="Name"
        variant="filled"
        name="name"
        placeholder="Enter your name"
        value={name}
        onChange={onChange}
        fullWidth
      />

      <TextField
        select
        label="Role"
        variant="filled"
        value={role}
        onChange={onChange}
        fullWidth
        name="role"
        margin="normal"
        >
        {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                    {option.label}
            </MenuItem>
                    ))}
          </TextField>

      <TextField
        id="email"
        label="Email"
        variant="filled"
        name="email"
        placeholder="Enter your email address"
        value={email}
        onChange={onChange}
        fullWidth
      />

      <TextField
        id="password"
        label="Password"
        variant="filled"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={onChange}
        type="password"
        fullWidth
      />

      <Button type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
