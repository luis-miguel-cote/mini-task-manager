import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask } from "./tasksSlice";

export default function Tasks() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

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
                <button>Create</button>
            </form>

            {/* LIST TASKS */}
            <ul>
                {items.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong>
                        <br />
                        <small>{task.description}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

