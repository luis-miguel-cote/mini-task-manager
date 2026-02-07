import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import { fetchTasks, createTask, deleteTask, updateTask, clearMessage } from "./tasksSlice";




export default function Tasks() {
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("pending");
    const { items, status, error, message } = useSelector((state) => state.tasks);
    const [filter, setFilter] = useState("all");


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const saveEdit = async () => {
        await dispatch(
            updateTask({
                id: editingId,
                data: {
                    title: editTitle,
                    description: editDescription,
                    status: editStatus,
                },
            })
        ).unwrap();

        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);


    const startEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditStatus(task.status);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            createTask({
                title,
                description,
            })
        );

        setTitle("");
        setDescription("");
    };

    if (status === "loading") return <p>Loading tasks...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    const filteredTasks =
        filter === "all"
            ? items
            : items.filter((task) => task.status === filter);
    return (

        <div className="container" >
            <Header />
            <h2>My Tasks</h2>
            {message && (
                <div
                    style={{
                        background: "#e6fffa",
                        border: "1px solid #38b2ac",
                        padding: "8px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                    }}
                >
                    {message}
                </div>
            )}
            {/* CREATE TASK */}
            <form className="card" onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn-primary" disabled={status === "loading"}>
                    {status === "loading" ? "Creating..." : "Create"}
                </button>
            </form>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: "10px" }}
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>


            {/* LIST TASKS */}

            {/* LIST TASKS */}
            <div className="card">
                <ul>
                    {filteredTasks.map((task) => (
                        <li key={task.id} style={{ marginBottom: "1rem" }}>
                            <div className={`task-edit ${editingId === task.id ? "active" : ""}`}>
  {editingId === task.id ? (
                                <div className="edit-form">
                                    <label>
                                        <span>Title</span>
                                        <input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Task title"
                                            required
                                        />
                                    </label>

                                    <label>
                                        <span>Description</span>
                                        <input
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            placeholder="Task description"
                                        />
                                    </label>

                                    <label>
                                        <span>Status</span>
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </label>

                                    <div style={{ marginTop: "8px" }}>
                                        <button className="btn-success" onClick={saveEdit}>
                                            Save
                                        </button>
                                        <button className="btn-secondary" onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* TÍTULO */}
                                    <strong>{task.title}</strong>
                                    <span className={`badge ${task.status}`} style={{ marginLeft: "8px" }}>
                                        {task.status}
                                    </span>

                                    {/* DESCRIPCIÓN */}
                                    {task.description && (
                                        <p style={{ fontStyle: "italic", marginTop: "4px" }}>
                                            {task.description}
                                        </p>
                                    )}

                                    {/* ACCIONES */}
                                    <button className="btn-secondary" onClick={() => startEdit(task)}>Edit</button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this task?")) {
                                                dispatch(deleteTask(task.id));
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

