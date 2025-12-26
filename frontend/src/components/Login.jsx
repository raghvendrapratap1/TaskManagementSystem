import { useState } from "react";

import API from "../api";
import { useContext } from "react";
import { AuthContext } from "../context";

const Login= ()=>{

    const { login } = useContext(AuthContext);

    const [form,setForm] = useState({
        email:"",password:""
    })

    const submit = async(e)=>{
        e.preventDefault();
        try {
      const res = await API.post("/auth/login", form);
      login(res.data); // ✅ now defined
      alert("Login successful");
      
    } catch (error) {
        console.log(error);
      alert("Login failed");
    }
    }

    return(
        <form onSubmit={submit}>
            <h3>Login</h3>

            <input 
                type="email"
                placeholder="Email"
                onChange={(e)=>setForm({...form,email:e.target.value})}
            />

            <input 
                type="password"
                placeholder="password"
                onChange={(e)=>setForm({...form,password:e.target.value})}
            />

            <button type="submit">Login</button>
        </form>
    )
}

export default Login;