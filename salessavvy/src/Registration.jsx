import React, { useState } from 'react';
import "./assets/style.css";

const Registration = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Require role
    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
    username,
    email,
    password,
    role: role?.toUpperCase()  
})
,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        window.location.href = "/login"; 
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className='page-container'>
        <div className="form-container">
          <h1 className="form-title">Register</h1>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignUp} className='form-content'>

            <div className="form-group">
              <label className='form-label' htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder='enter your name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='form-input'
              />
            </div>

            <div className="form-group">
              <label className='form-label' htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder='enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='form-input'
              />
            </div>

            <div className="form-group">
              <label className='form-label' htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder='enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='form-input'
              />
            </div>

            <div className="form-group">
              <label className='form-label' htmlFor="role">Role</label>
              <select
                className='form-select'
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>select your option</option>
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button type='submit' className='form-button'>SIGN UP</button>
          </form>

          <p className="form-footer">
            Already a user?{" "}
            <a href="/login" className='form-link'>login in here</a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Registration;
