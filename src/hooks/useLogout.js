import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const { dispatch } = useAuth();

  const logout = async () => {
    if (!cancelled) {
      setError(null);
      setPending(true);
    }
    try {
      const response = await auth.signOut();
      console.log(response);
      dispatch({ type: 'LOGOUT' });
      if (!cancelled) {
        setError(null);
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

  return { error, pending, logout };
};
