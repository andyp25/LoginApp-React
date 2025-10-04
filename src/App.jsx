import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard" 
import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated')== "true");
  let [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  
  // console.log("usuario logueado" + isAuthenticated);

  useEffect(()=>{
    localStorage.setItem('isAuthenticated', isAuthenticated)
    localStorage.setItem('userName', userName);
  }, [isAuthenticated, userName]);

  let handleLogin = (userName)=>{
    setIsAuthenticated(true);
    setUserName(userName);
  };

  let handleLogout = ()=>{
     setIsAuthenticated(false);
     setUserName('');
     localStorage.removeItem('isAuthenticated');
     localStorage.removeItem('userName');
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/Dashboard"/> : < Login onLogin={handleLogin}/> }/>
        <Route path="/Register" element={isAuthenticated ? <Navigate to="/Dashboard"/> : < Register/> }/>
        <Route path="/Dashboard" element={isAuthenticated ? <Dashboard user={userName} onLogout={handleLogout} /> : <Navigate to="/login"/>} />
        <Route path="/*" element={< Login onLogin={handleLogin} /> }/>
      </Routes>
    </> 
  )
}

export default App
