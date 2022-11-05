import React from 'react';
import '../home/Home.css';
import TransactionForm from '../../components/TransactionForm';
import { useAuth } from '../../hooks/useAuth';
import { useCollection } from '../../hooks/useCollection';
import { Spending } from '../../components/Spending';

export default function Home() {
  const { user } = useAuth();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className="container">
      <div className="main">
        <div className="data">
          <div className="listContainer">
            <h2>All Transactions</h2>
            {error && <p className="error">{error}</p>}
            {documents?.map((doc) => (
              <Spending key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
