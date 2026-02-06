import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./tasksSlice";

export default function Tasks() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") return <p>Loading tasks...</p>;

  return (
    <div>
      <h2>My Tasks</h2>

      <ul>
        {items.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
