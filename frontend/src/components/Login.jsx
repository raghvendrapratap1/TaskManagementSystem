import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      alert("Login successful");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px" }}>
      <form onSubmit={submit}>
        <h3>Login</h3>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
