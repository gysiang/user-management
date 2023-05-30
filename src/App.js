import React, { useState }  from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home'
import './App.css';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [displaySignupPage, setDisplaySignupPage] = useState(false)
  return (
    <div className="App">
      {isLoggedIn ? (
        <Home/>
      ) : !displaySignupPage ? (
        <Login 
          setIsLoggedIn={setIsLoggedIn}
          setDisplaySignupPage={setDisplaySignupPage}
          />
      ) : (
        <SignUp
         setDisplaySignupPage={setDisplaySignupPage}
         />
      )}
    </div>
  );
}

export default App;
