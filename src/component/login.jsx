// src/component/Login.jsx
import { useState } from "react";
import "../style/login.css";

export default function Login({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ username, password, remember });
  }

  return (
    <section className="login">
      <div className="login-card">
        <div className="login-icon" aria-hidden="true">
          <i className="fa-regular fa-user-circle" />
        </div>

        <h1 className="login-title">Sign In</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <label className="login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
