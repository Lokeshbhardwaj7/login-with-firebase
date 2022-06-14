import { useDispatch, useSelector } from 'react-redux';
// routes
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Router from './routes';
// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Link,
//   Routes
// } from "react-router-dom";
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useEffect, useState } from 'react';
import { fetchToken, onMessageListener } from './redux/firebase';
import { setUser } from './redux/action';
import Login from './pages/Login';
// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const user = localStorage.getItem('currentUser'); 
  const navigate = useNavigate();
  const checkSession = () =>{
    if(!currentUser){
      navigate('/login');
    }
  }
  useEffect(() => {
    console.log(fetchToken());
  })

  useEffect(() => {
    checkSession();
    console.log('sdsdsdsd2');
  }, [currentUser]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
