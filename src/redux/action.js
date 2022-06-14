import * as types from './actionTypes';
import { auth, googleAuthProvider } from './firebase';

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSucces = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
   type: types.LOGIN_START,
 });
 
 const loginSucces = (user) => ({
   type: types.LOGIN_SUCCESS,
   payload: user,
 });
 
 const loginFail = (error) => ({
   type: types.LOGIN_FAIL,
   payload: error,
 });

 const logoutStart = () => ({
   type: types.LOGOUT_START,
 });
 
 const logoutSucces = (user) => ({
   type: types.LOGOUT_SUCCESS,
   payload: user,
 });
 
 const logoutFail = (error) => ({
   type: types.LOGOUT_FAIL,
   payload: error,
 });

 export const setUser = (user) => ({
   type: types.SET_USER,
   payload: user, 
 })

 const googleSignInStart = () => ({
  type: types.GOOGLE_SIGN_IN_START,
});

const googleSignInSucces = (user) => ({
  type: types.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

const googleSignInFail = (error) => ({
  type: types.GOOGLE_SIGN_IN_FAIL,
  payload: error,
});

export const registerInitiate = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart());
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
    user.updateProfile({
      displayName,
    });
    dispatch(registerSucces(user));
  })
  .catch((error) => dispatch(registerFail(error.message)));
};
};

export const loginInitiate = (email, password) => {
   return function (dispatch) {
     dispatch(loginStart());
     auth
     .signInWithEmailAndPassword(email, password)
     .then(({ user }) => {
     dispatch(loginSucces(user));
   })
   .catch((error) => dispatch(loginFail(error.message)));
 };
 };

 export const logoutInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
    .signOut()
    .then((resp) => dispatch(logoutSucces()))
    .catch((error) => dispatch(logoutFail(error.message)));
};
};

 export const googleSignInInitiate = () => {
  return function (dispatch) {
    dispatch(loginStart());
    auth
    .signInWithPopup(googleAuthProvider)
    .then(({ user }) => {
    dispatch(loginSucces(user));
  })
  .catch((error) => dispatch(loginFail(error.message)));
};
};
