import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) navigate("/login");
    else alert("Error al crear usuario");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  );
}
