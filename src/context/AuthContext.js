import { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTHREADY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const Auth = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log('User State:', state);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTHREADY', payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
