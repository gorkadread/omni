import React, { useState } from "react";
import { socket } from './App'

const SubmitTransaction = () => {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch('/transactions', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'account_id': accountId,
          'amount': transactionAmount
        }),
      }).then(response => response.json()
        .then(data => {
          // Trigger a realtime socket-call instead of this nasty props-business
          socket.emit('TransactionAdded', { 'data': { data } });

          setAccountId("");
          setTransactionAmount("");
        })
      );
    } catch (err) {
      setError('Something went wrong. Please check your inputs!');
    }
  };

  return <div>
    <header className="bank-child-header">Submit new transaction</header>

    <div className="error">{error}</div>
    <form onSubmit={onSubmit}>
      <label>
        Account ID:
        <br />
        <input data-type="account-id" onChange={(e) => {
          setAccountId(e.target.value);
          setError('');
        }}
          value={accountId}
          placeholder="Enter account ID"
        />
      </label>
      <br />
      <label>
        Amount:
        <br />
        <input data-type="amount" onChange={(e) => {
          setTransactionAmount(e.target.value);
          setError('');
        }}
          value={transactionAmount}
          placeholder="Enter transfer amount"
        />
      </label>
      <br />
      <input data-type="transaction-submit" type="submit" />
    </form>
  </div>
};

export default SubmitTransaction;