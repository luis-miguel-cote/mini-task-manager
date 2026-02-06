import api from "./axios";

export const getTasks = () => api.get("/tasks");

// GET all tasks
export const getTasksRequest = () => api.get("/tasks");

// CREATE task
export const createTaskRequest = (task) =>
  api.post("/tasks", task);

// UPDATE task
export const updateTaskRequest = (id, task) =>
  api.put(`/tasks/${id}`, task);

// DELETE task
export const deleteTaskRequest = (id) =>
  api.delete(`/tasks/${id}`);



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);