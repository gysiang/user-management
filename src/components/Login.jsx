import React, {useState} from "react"
import axios from "axios"

export default function Login() {

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const userEmailChange = (e) => {
    setUserEmail(e.target.value)
  };

  const userPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {
    let user;
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!userEmail || !userPassword){
      alert("Your email or password is empty!")
    } else if (!emailPattern.test(userEmail)){
      alert ("Invalid Email");
    } else {
      user = {
        email:userEmail,
        password: userPassword
      };
    }

    if (!user){
      axios
        .post("/login",user)
        .then((result) => {
          if (result.data.msg === "user is not found"){
            alert("User is not found")
          } else if (
            result.data.msg === "wrong password" 
          ) {
            alert("Unauthorized user!")
          }

          if (result.data.user){
            
          }


        })
    }

  }


  return(
        <div>
            <h5>Login</h5>
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
              onClick={handleLogin}
              className="form-control my-1"
            >
              LOGIN
            </button>
        </div>
  )

}