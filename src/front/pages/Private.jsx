import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Private() {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = store.token || sessionStorage.getItem("access_token");
    if (!token) return navigate("/login");
    if (!store.token) dispatch({ type: "SET_TOKEN", payload: token });

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error("Token inválido");
      return res.json();
    })
    .then(data => setUser(data.user))
    .catch(() => {
      sessionStorage.removeItem("access_token");
      dispatch({ type: "SET_TOKEN", payload: null });
      navigate("/login");
    });
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido {user.email}</h1>
      <button onClick={() => {
        sessionStorage.removeItem("access_token");
        dispatch({ type: "SET_TOKEN", payload: null });
        navigate("/login");
      }}>
        Cerrar Sesión
      </button>
    </div>
  );
}
