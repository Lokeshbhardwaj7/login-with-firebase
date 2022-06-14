import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, TextField, Card, Container, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { LoadingButton } from '@mui/lab';
import { registerInitiate } from '../redux/action';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Register = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password, displayName, passwordConfirm } = state;

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(registerInitiate(email, password, displayName));
    setState({ email: '', displayName: '', password: '', passwordConfirm: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <form onSubmit={handleSubmit}>
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="login">
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Manage the job more effectively with Minimal
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Free forever. No credit card needed.</Typography>

            <TextField
              variant="standard"
              fullWidth
              label="Full Name"
              onChange={handleChange}
              value={displayName}
              required
              type="text"
              id="displayname"
              name="displayName"
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
              name="email"
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

            <Button fullWidth type="submit" variant="contained" color="primary">
              Sign Up{' '}
            </Button>

            <Link to="/" style={{ display: 'flex' }}>
              Back
            </Link>
          </ContentStyle>
        </Container>
      </RootStyle>
    </form>
  );
};

export default Register;
