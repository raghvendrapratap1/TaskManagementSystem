import { useState } from "react";
import API from "../api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px" }}>
      <form onSubmit={submit}>
        <h3>Register</h3>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
