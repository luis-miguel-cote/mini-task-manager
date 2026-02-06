import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton";
import { fetchTasks, createTask, deleteTask, updateTask } from "./tasksSlice";



export default function Tasks() {
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("pending");
    const { items, status, error } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    const saveEdit = () => {
        dispatch(
            updateTask({
                id: editingId,
                data: {
                    title: editTitle,
                    description: editDescription,
                    status: editStatus,
                },
            })
        );

        setEditingId(null);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

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

    return (
        <div>
            <LogoutButton />
            <h2>My Tasks</h2>

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

            {/* LIST TASKS */}
            <ul>
                {items.map((task) => (
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

                                <button onClick={saveEdit} disabled={status === "loading"}>
                                    {status === "loading" ? "Saving..." : "Save"}
                                </button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <strong>{task.title}</strong> ({task.status})

                                {task.description && (
                                    <p style={{ fontStyle: "italic" }}>{task.description}</p>
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

