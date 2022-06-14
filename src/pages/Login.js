import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// @mui
import { styled } from '@mui/material/styles';
import {
  IconButton,
  InputAdornment,
  TextField,
  Divider,
  Stack,
  Checkbox,
  Button,
  Card,
  Link,
  Container,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/Logo';
import Iconify from '../components/Iconify';
// sections
import { googleSignInInitiate, loginInitiate } from '../redux/action';

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

const Login = () => {
  //get data from signup page
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = state;

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    // const currentUser = localStorage.getItem('email'); 
    if (currentUser) {
      navigate('/dashboard/app');
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

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

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <form onSubmit={handleSubmit}>
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleGoogleSignIn}
                fullWidth
                size="large"
                color="inherit"
                type="button"
                variant="outlined"
              >
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
           
              <TextField
                variant='outlined'
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                name="email"
                id="inputEmail"
                
              />

              <TextField
                variant="outlined"
                fullWidth
                style={{
                  marginTop: '10px',
                }}
                label="Password"
                onChange={handleChange}
                value={password}
                required
                type="password"
                id="inputPassword"
                name='password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
               
              />
               <LoadingButton  style={{
                  marginTop: '10px',
                }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Login{' '}
            </LoadingButton>
            

            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <FormControlLabel
                control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                label="Remember me"
              />

              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Forgot password?
              </Link>
            </Stack> */}

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )} */}
           
          </ContentStyle>
        </Container>
      </RootStyle>
    </form>
  );
};

export default Login;
