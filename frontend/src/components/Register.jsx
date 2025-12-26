import { useState } from "react";

import API from "../api";

const Register= ()=>{
    const [form,setForm] = useState({
        name:"",email:"",password:""
    })

    const submit = async(e)=>{
        e.preventDefault();
        try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
    }

    return(
        <form onSubmit={submit}>
            <h3>Register</h3>

            <input 
                type="text"
                placeholder="Name"
                onChange={(e)=>setForm({...form,name:e.target.value})}
            />

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

            <button type="submit">Register</button>
        </form>
    )
}

export default Register;