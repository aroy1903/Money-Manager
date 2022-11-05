import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setPending(true);
    setError(null);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN', payload: response.user });
      console.log(response.user);

      if (!cancelled) {
        setPending(false);
      }
    } catch (err) {
      if (!cancelled) {
        console.log(err.message);
        setPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  return { error, pending, login };
};
