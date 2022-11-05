import { auth } from '../firebase/config';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useSignup = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const { dispatch } = useAuth();

  const signup = async (email, password, displayName) => {
    setError(null);
    setPending(true);

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error('Could not complete signup');
      }
      await response.user.updateProfile({ displayName });

      dispatch({ type: 'LOGIN', payload: response.user });

      console.log(cancelled);
      if (!cancelled) {
        setPending(false);
      }
    } catch (err) {
      if (!cancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  return { error, pending, signup };
};
