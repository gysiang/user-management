import React, {useState} from 'react';
import axios from 'axios';

export default function SignUp({
  setDisplaySignupPage
}) {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const userEmailChange = (e) => {
    setUserEmail(e.target.value);
  }

   const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  }

  const handleSignup = () => {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let newUser;
    if (!userName || !userEmail || !userPassword) {
      alert("Please fill all the fields");
    } else if (!userEmail.match(emailPattern)) {
      alert("Please enter a valid email");
    } else {
      newUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
      
      }
    }

    if (newUser){
      axios
      .post("/signup", newUser)
      .then((res) => {
         if (res.data.msg === "User signup error.") {
          setDisplaySignupPage(false);
          alert("User already signed up.");
          return;
          }
    })
    .catch((error)=>{
      console.log('error: ', error)
    })

    setUserName("");
    setUserEmail("");
    setUserPassword("");
  }
};
  
  const handleSignin = () => {
    setDisplaySignupPage(false);
  };

    return (
        <div>
            <h5>Sign Up</h5>
            <input 
              type='text'
              value={userName}
              onChange={userNameChange}
              placeholder='Enter your name'
              className="form-control my-1"
              required='required'
            />
            <input 
              type='text'
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={userEmail}
              onChange={userEmailChange} 
              placeholder='Enter your email'
              className="form-control my-1"
              required='required'
            />
            <input 
              type='password' 
              value={userPassword}
              onChange={userPasswordChange}
              placeholder='Enter your password'
              className="form-control my-1"
              required='required'
            />
            <button
              type="button"
              onClick={handleSignup}
              className="form-control my-1"
            >
              SIGN UP
            </button>
            <button
              type="button"
              onClick={handleSignin}
              className="form-control bg-info my-1"
            >
              SIGN IN
            </button>
        </div>
    )
}