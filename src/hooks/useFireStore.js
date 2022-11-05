import { useReducer, useEffect, useState } from 'react';
import { db, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const handleReduce = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: false, success: false, error: null };
    case 'ADDDOC':
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
      };
    case 'ERROR':
      return {
        error: action.payload,
        isPending: false,
        document: null,
        success: false,
      };
    case 'DELETE':
      return {
        error: null,
        isPending: false,
        document: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFireStore = (collection) => {
  const [response, dispatch] = useReducer(handleReduce, initialState);
  const [cancelled, setCancelled] = useState(false);

  const ref = db.collection(collection);

  const dispatchNotCancelled = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: 'isPending' });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchNotCancelled({ type: 'ADDDOC', payload: addedDoc });
    } catch (err) {
      dispatchNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };
  const deleteDoc = async (id) => {
    try {
      await ref.doc(id).delete();
      dispatchNotCancelled({ type: 'DELETE' });
    } catch (err) {
      console.error(err.message);
      dispatchNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    setCancelled(false);
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDoc, response };
};
