import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./auth.jsx";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Hydrate au démarrage
  useEffect(() => {
    (async () => {
      try {
        const savedToken =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) {
          setToken(savedToken);

          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            const prof = await axios.post(
              `${API}/api/v1/user/profile`,
              {},
              { headers: { Authorization: `Bearer ${savedToken}` } }
            );
            const profile = prof.data?.body ?? null;
            setUser(profile);
            if (profile) {
              localStorage.setItem("user", JSON.stringify(profile));
            }
          }
        }
      } catch (e) {
        console.error("Auth hydrate failed:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  async function login({ email, password, remember }) {
    const { data } = await axios.post(`${API}/api/v1/user/login`, {
      email,
      password,
    });
    const t = data?.body?.token;
    if (!t) throw new Error("Token missing");

    (remember ? localStorage : sessionStorage).setItem("token", t);
    setToken(t);

    const prof = await axios.post(
      `${API}/api/v1/user/profile`,
      {},
      { headers: { Authorization: `Bearer ${t}` } }
    );
    const profile = prof.data?.body ?? null;
    setUser(profile);
    if (profile) localStorage.setItem("user", JSON.stringify(profile));
    return profile;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  // 🔹 Nouveau : updateProfile
  async function updateProfile({ firstName, lastName }) {
    if (!token) return;
    const res = await axios.put(
      `${API}/api/v1/user/profile`,
      { firstName, lastName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updated = res.data?.body;
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    return updated;
  }

  const value = { token, user, initializing, login, logout, updateProfile };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
