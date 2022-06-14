import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {registerInitiate} from "../redux/action"


const NewRegister = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { email, password, displayName, passwordConfirm } = state;
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStle = { margin: 0, fontSize: '25px', fontWeight: 'bold' };
  const avtarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const{currentUser} = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser){
      navigate("/");
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== passwordConfirm){
      return;
    }
    dispatch(registerInitiate(email, password, displayName))
    setState({email: "", displayName:"", password:"", passwordConfirm:""});
  };
  const handleChange = (e) => {
    const {name, value} = e.target ;
    setState({...state,[name]: value});
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avtarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={headerStle}>Sign Up</Typography>
          <Typography gutterBottom variant="caption">
            {' '}
            Please Fill this Form
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            fullWidth
            label="Full Name"
            onChange={handleChange}
            value={displayName}
            required
            type="text"
            id="displayname"
            name='displayName'
          />
          <TextField
            variant="standard"
            fullWidth
            label="Email Address"
            onChange={handleChange}
            value={email}
            required
            type="email"
            id="user-email"
            name='email'
          />
          <TextField
            variant="standard"
            fullWidth
            label="Password"
            onChange={handleChange}
            value={password}
            required
            type="password"
            id="inputPassword"
            name="password"
          />
           <TextField
            variant="standard"
            fullWidth
            label="RepeatPassword"
            onChange={handleChange}
            value={passwordConfirm}
            required
            type="password"
            id="rePassword"
            name="passwordConfirm"
          />

              <br />

          <Button style={btnStyle} fullWidth type="submit" variant="contained" color="primary">
            Sign Up{' '}
          </Button>
          
          <Link to="/" style={{display:'flex'}}> 
            <ArrowBackIcon/>
            Back
          </Link>
        </form>
      </Paper>
    </Grid>
  );
};

export default NewRegister;
