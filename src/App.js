import logo from './logo.svg';
import './App.css';
import { useContext, useState } from "react"
import { UserContext } from "../src/context/UserContext"

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, setUser, handleLogin, handleRegister} = useContext(UserContext)
  return (
    <div className="App">
      <input value={username} onChange={(e)=> setUsername(e.target.value)}></input>
      <input value={password} onChange={(e)=> setPassword(e.target.value)}></input>

      <button onClick={()=> handleLogin(email, password)}>Login</button>
      <button onClick={()=> handleRegister(email, password)}>Password</button>
    </div>
  );
}

export default App;
