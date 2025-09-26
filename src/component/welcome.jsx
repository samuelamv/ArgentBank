import { useState } from "react";
import "../style/welcome.css";
import useAuth from "../hooks/useAuth.js";

function Welcome() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  async function handleSave(e) {
    e.preventDefault();
    try {
      await updateProfile({ firstName, lastName });
      setEditing(false);
    } catch (err) {
      console.error("Erreur mise à jour profil :", err);
    }
  }

  return (
    <section className="welcome">
      {editing ? (
        <form onSubmit={handleSave} className="welcome-form">
          <div className="input-group">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="welcome-button">
              Save
            </button>
            <button
              type="button"
              className="welcome-button cancel"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            <span className="welcome-name">
              {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </span>
          </h1>
          <button className="welcome-button" onClick={() => setEditing(true)}>
            Edit Name
          </button>
        </>
      )}
    </section>
  );
}

export default Welcome;
