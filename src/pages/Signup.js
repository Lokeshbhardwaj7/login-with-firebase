import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { googleSignInInitiate, loginInitiate } from '../redux/action';


const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/baseoptionchartstyle');
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStle = { margin: 0, fontSize: '25px', fontWeight: 'bold' };
  const avtarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };
  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    setState({ email: '', password: '' });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avtarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={headerStle}>Sign IN</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            fullWidth
            label="Email"
            onChange={handleChange}
            value={email}
            required
            type="email"
            id="inputEmail"
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
            name='password'
          />

          <FormControlLabel control={<Checkbox />} label="Remember Me" />
          <br />

          <Button style={btnStyle} fullWidth type="submit" variant="contained" color="primary">
            Sign In{' '}
          </Button>

          <Typography>
            <Link to="/#">Forgot Password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ? &nbsp;<Link to="/newregister">Sign Up</Link>
          </Typography>

          <Button variant="outlined" type="button" onClick={handleGoogleSignIn}>
            <GoogleIcon />
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
