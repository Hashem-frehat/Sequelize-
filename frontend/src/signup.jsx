import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      email,
      password,
    });
  };
  return (
    <form onSubmit={handlesubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="password"
        required
      />
      <button type="submit">signup</button>
    </form>
  );
}
export default Signup;
