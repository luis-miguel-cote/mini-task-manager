import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton";
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

        <div>
            <LogoutButton />
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
            <form onSubmit={handleSubmit}>
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
                <button disabled={status === "loading"}>
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
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id} style={{ marginBottom: "1rem" }}>
                        {editingId === task.id ? (
                            <>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Title"
                                    required
                                />

                                <input
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Description"
                                />

                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>

                                <button onClick={saveEdit}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <strong>{task.title}</strong> ({task.status})

                                {task.description && (
                                    <p style={{ fontStyle: "italic" }}>
                                        {task.description}
                                    </p>
                                )}

                                <button onClick={() => startEdit(task)}>Edit</button>
                                <button onClick={() => dispatch(deleteTask(task.id))}>
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

