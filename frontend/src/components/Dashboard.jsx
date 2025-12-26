import { useState } from "react"
import API from "../api";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";

const Dashboard =()=>{

    const {logout} = useContext(AuthContext);

    const [tasks,setTasks] = useState([]);

    const [form,setForm] = useState({title:"",description:"",status:""});

    const [editId,setEditId] = useState(null);

    const loadTasks = async()=>{
        const res = await API.get("/tasks");
        setTasks(res.data);
    }

    useEffect(()=>{
        loadTasks();
    },[]);

    const submitTask = async()=>{
        if(editId){
            await API.put(`/tasks/${editId}`,form);
            setEditId(null);
        }else{
            await API.post('/tasks',form);
        }

        setForm({title:"",description:"",status:"pending"})
        loadTasks();
    }

    const editTask = (task)=>{
        setEditId(task._id);
        setForm({
            title:task.title,
            description:task.description,
            status:task.status
        });
    }

    const deleteTask = async(id)=>{
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks(); // ✅ refresh list
    } catch (error) {
      console.error(error);
    }
    }

    return (
        <div>
            <h3>My Tasks</h3>

            <button onClick = {logout} style={{float:"right"}}>Logout</button>
            <input 
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e)=>setForm({...form,title:e.target.value})
                }
            />

            <input 
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e)=>setForm({...form,description:e.target.value})
                }
            />

            <select 
            value={form.status}
            onChange={(e)=>setForm({...form,status:e.target.value})}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="not-completed">Not Completed</option>
            </select>

            <button onClick={submitTask}>{editId ? "Update Task": "Add Task"}</button>

            <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>{task.status}</p>

            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
        </div>
    )
}

export default Dashboard;
