import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem("access_token", data.access_token);
      dispatch({ type: "SET_TOKEN", payload: data.access_token });
      navigate("/private");
    } else alert("Credenciales inválidas");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
