import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/ToDoItem";
import { Navigate } from "react-router-dom";

const Home = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { isAuthenticated } = useContext(Context);

    const updateHandler= async (id) => {
        try {
            await axios.put(`${server}/task/${id}`,{},{
                withCredentials: true,
            })
            toast.success("Task updated");
            setRefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const deleteHandler= async (id) => {
        try {
            await axios.delete(`${server}/task/${id}`,{
                withCredentials: true,
            })
            toast.success("Task deleted");
            setRefresh(prev=>!prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const submitHandler= async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await axios.post(`${server}/task/new`, {
                title,
                description,
            }, {
                withCredentials: true,
                headers:{
                    "Content-Type": "application/json"
                }
            });
            setTitle("");
            setDescription("");
            toast.success("Task added");
            setLoading(false);
            setRefresh(prev=>!prev);
        } catch (error) {
            toast.success(error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get(`${server}/task/my`, {
            withCredentials: true,
        }).then(res => {
            setTasks(res.data.tasks);
        }).catch(e => {
            toast.error(e.response.data.message);
        })
    }, [refresh]);

    if(!isAuthenticated) return <Navigate to={"/login"} />

    return <div className="container">
        <section className="todosContainer">
                <form onSubmit={submitHandler}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" placeholder="Title"/>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} required type="text" placeholder="Description"/>
                    <button disabled={loading} type="submit">Add task</button>
                </form>
        </section>
        <section className="todosContainer">
            {
                tasks.map(i=>(
                    <TodoItem title={i.title} description={i.description} isCompleted={i.isCompleted} id={i._id} key={i._id} updateHandler={updateHandler} deleteHandler={deleteHandler} />
                ))
            }
        </section>
    </div>
}
 
export default Home;