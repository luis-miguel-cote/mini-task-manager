import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getTasksRequest,
    createTaskRequest,
    updateTaskRequest,
    deleteTaskRequest,
} from "../../api/tasks.api";

// =======================
// Async thunks
// =======================

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
    async ({ id, data }) => {
        const res = await updateTaskRequest(id, data);
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

// =======================
// Slice
// =======================

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
        status: "idle",
        error: null,
        message: null,
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ---------- FETCH ----------
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

            // ---------- CREATE ----------
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })

            // ---------- UPDATE ----------
            .addCase(updateTask.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = "Task updated";

                const index = state.items.findIndex(
                    (task) => task.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(updateTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // ---------- DELETE ----------
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (task) => task.id !== action.payload
                );
            });
    },
});

export const { clearMessage } = tasksSlice.actions;
export default tasksSlice.reducer;
