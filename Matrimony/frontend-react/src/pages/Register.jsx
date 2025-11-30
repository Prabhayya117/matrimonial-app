import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      showToast("Account created successfully!", "success");
      navigate("/login");
    } else showToast(data.message, "error");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
