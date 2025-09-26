// src/page/sign-in.jsx
import { useNavigate } from "react-router-dom";
import Login from "../component/login.jsx"; // attention : majuscule si ton fichier s'appelle Login.jsx
import useAuth from "../hooks/useAuth.js";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ ici, dans le composant

  async function handleSubmit({ username, password, remember }) {
    try {
      await login({ email: username, password, remember });
      navigate("/user");
    } catch (e) {
      console.error(e);
      alert("Échec de la connexion (email/mot de passe).");
    }
  }

  return <Login onSubmit={handleSubmit} />;
}
