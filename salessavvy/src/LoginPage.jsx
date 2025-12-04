import React, { useState } from 'react'
import './assets/style.css'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [error,seterror] = useState("");
    const[username ,setusername]=useState("");
    const[password ,setpassword]=useState("");
    const navigate = useNavigate();

 const handlesignin = async (e) => {
 e.preventDefault();
 seterror("");

try {
 const response = await fetch('http://localhost:9090/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',  
  body: JSON.stringify({ username, password })
});





 if (response.ok) {
  const data=  await response.json();
    console.log("User logged in successfully:", data);

   
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    if (data.role === "CUSTOMER") {
        navigate("/customerhome");
    } else if (data.role === "ADMIN") {
        navigate("/adminhome");
    } else {
        throw new Error(data.error || "Login failed");
    }
}



}catch(err) {
    seterror(err.message);
}



 };


  return (
    <>
      <div className="page-container">
        <div className="form-container">
            <h1 className="form-title">Login</h1>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handlesignin} className='form-content'>
               <div className="form-group">
<label htmlFor="username" className='form-label'></label>
<input type="text" id='username' placeholder='enter your username' value={username} onChange={(e)=> setusername(e.target.value)} required className='form-input' />
               </div>
               <div className='form-group'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" placeholder='enter your password ' value={password} onChange={(e)=>{setpassword(e.target.value)}} required className='form-input' />
               </div>
               <button type='submit' className='form-button' >Sign in</button>
            </form>
            <div className="form-footer">
                <a href="/register" className='form-link'> new User? sign up here</a>
            </div>
        </div>
      </div>
    </>

  )
}

export default LoginPage
