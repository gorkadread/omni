import './App.css';
import React, { useState } from "react";
import SubmitTransaction from "./SubmitTransaction";
import TransactionHistory from "./TransactionHistory";
import io from 'socket.io-client';

export const socket = io('http://127.0.0.1:5000');


function App() {
  return (
    <div className="bank">
      <header className="bank-header">
        <p>The Bank</p>
      </header>
      <div className="flex-parent">
        <div className="flex-child bank-left-side"><SubmitTransaction /></div>
        <div className="flex-child bank-right-side"><TransactionHistory /></div>
      </div>
    </div>
  );
}

export default App;