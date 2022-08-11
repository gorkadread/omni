import React, { useState, useEffect } from "react";
import { socket } from './App'

const TransactionHistory = () => {
  const [transactionsState, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Compiles the friendly message of transactions performed
  const messageHandler = (transactions) => {
    for (var i = 0; i < transactions.length; i++) {
      let toFrom = transactions[i].amount > 0 ? 'to' : 'from';
      transactions[i].fMessage = `Transferred ${transactions[i].amount}$ ${toFrom} account ${transactions[i].account_id}.`;
    }

    setTransactions(transactions);
    setLoading(false);
  };

  useEffect(() => {
    // Subscribe to the added transactions socket
    // This way we save a couple of rerenders and the code is much cleaner
    socket.on('transactionAddedResponse', (resp) => {
      let updatedTransactions = resp.data;
      messageHandler(updatedTransactions);
    })

    fetch("/transactions/")
      .then(response => response.json()
        .then(data => {
          messageHandler(data)
        })
      )
  }, []);

  if (loading) {
    return <div>
      <header className="bank-child-header">Transaction history</header>
      'Loading transactions...'</div>
  } else {
    if (transactionsState.length > 0) {
      return <div>
        <header className="bank-child-header">Transaction history</header>
        {transactionsState.map((transaction) => (
          <div className="transaction" key={transaction.transaction_id}
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={transaction.balance_after}>
            {transaction.fMessage}
            < br />
            The current account balance is {transaction.balance_after}$.
          </div>
        ))}

      </div >
    } else {
      return <div>No transactions yet.</div>
    }
  }
};

export default TransactionHistory;