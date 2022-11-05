import React from 'react';
import uppercase from '../helperFunc/uppercase';
import { useFireStore } from '../hooks/useFireStore';

export const Spending = ({ doc }) => {
  const { deleteDoc } = useFireStore('transactions');

  return (
    <div className="document">
      <h2>{uppercase(doc.name)}</h2>
      <h2>${doc.amount}</h2>
      <span
        className="material-symbols-outlined trash"
        onClick={() => deleteDoc(doc.id)}
      >
        delete_forever
      </span>
    </div>
  );
};
