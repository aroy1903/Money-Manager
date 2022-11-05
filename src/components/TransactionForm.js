import { useState, useEffect } from 'react';
import { useFireStore } from '../hooks/useFireStore';
import './Transaction.css';

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const { addDocument, response } = useFireStore('transactions');
  const { success } = response;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, amount, uid });
  };

  useEffect(() => {
    setCancelled(false);
    if (success && !cancelled) {
      setAmount(0);
      setName('');
    }

    return () => {
      setCancelled(true);
    };
  }, [success, cancelled]);

  return (
    <div className="tranForm">
      <form onSubmit={handleSubmit}>
        <h3>Add a Transaction</h3>
        <label>
          <span>Purchase Name:</span>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Purchase Amount:</span>
          <input
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button className="btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
