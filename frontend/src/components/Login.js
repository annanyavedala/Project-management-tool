import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { login } from '../actions/authActions';

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
  
  const LoginForm = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
    const { email, password } = formData;

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
      dispatch(login({ email, password }));
      
    };
  
  
    return (
      <Form onSubmit={onSubmit}>
         {error && <Alert>Login failed</Alert>}
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
          Login
        </Button>
      </Form>
    );
  };
  
  export default LoginForm;
  