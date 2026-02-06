import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../../api/tasks.api";

// async thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await getTasksRequest();
    return res.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (task) => {
    const res = await createTaskRequest(task);
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, task }) => {
    const res = await updateTaskRequest(id, task);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id) => {
    await deleteTaskRequest(id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // create
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default tasksSlice.reducer;
