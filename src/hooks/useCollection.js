import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const order = useRef(_orderBy).current;

  useEffect(() => {
    let ref = db.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (order) {
      ref = ref.orderBy(...order);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (err) => setError(err.message)
    );

    return () => unsub();
  }, [collection, query, order]);

  return { documents, error };
};
