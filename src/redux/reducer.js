import * as types from './actionTypes';

const initialState = {
  loading: false,
  currentUser: localStorage.getItem('currentUser') || null,
  error: null,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
    case types.GOOGLE_SIGN_IN_START:

      return {
        ...state,
        loading: true,
      };

    case types.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: JSON.stringify(action.payload),
      };

    case types.LOGOUT_SUCCESS:
      localStorage.removeItem('currentUser');
      return {
        ...state,
        currentUser: null,
      };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.GOOGLE_SIGN_IN_SUCCESS:
      localStorage.setItem('currentUser', JSON.stringify(action.payload) || null);
      return {
        ...state,
        loading: false,
        currentUser: JSON.stringify(action.payload),
      };

    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_FAIL:
    case types.GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
