import React, { useState } from 'react';
import './App.css';
import "./bootstrap.css";
import LoginForm from "./components/LoginForm"

function App() {

  const [users, setUsers] = useState([])

  return (
    <div className="App container">
      <LoginForm users={users} setUsers={setUsers}/>
    </div>
  );
}

export default App;
