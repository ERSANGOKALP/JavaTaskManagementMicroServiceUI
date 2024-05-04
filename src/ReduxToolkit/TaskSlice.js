import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const fetchTask = createAsyncThunk("task/fetchTasks",
async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.get("/api/tasks",{
            params:{status}            
        });
        console.log("fetch task : ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks",
async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.get("/api/tasks/user",{
            params:{status}            
        });
        console.log("fetch users task : ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const fetchTasksById = createAsyncThunk("task/fetchTasksById",
async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.get(`/api/tasks/${taskId}`);
        console.log("fetch task by id : ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const createTask = createAsyncThunk("task/createTask",
async(taskData)=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.post(`/api/tasks`,taskData);
        console.log("created task: ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const updateTask = createAsyncThunk("task/updateTask",
async({id,updatedTaskData})=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.put(`/api/tasks/${id}`,updatedTaskData);
        console.log("updated task: ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser",
async({taskId,userId})=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
        console.log("assigned task: ",data)
        return data;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

export const deleteTask = createAsyncThunk("task/deleteTask",
async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"),api);

    try {
        const {data} = await api.delete(`/api/tasks/${taskId}`);
        console.log("task delete succesfully");
        return taskId;
    } catch (error) {
        console.log("error ",error)
        throw Error(error.response.data.error)
    }
});

const taskSlice = createSlice({
    name:"task",
    initialState:{
        tasks:[],
        loading:false,
        error:null,
        taskDetails:null,
        usersTask:[]
    },
    reducer:{},
    extraReducer:(builder)=>{
        builder
        .addCase(fetchTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchTask.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks=action.payload
        })
        .addCase(fetchTask.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        .addCase(fetchUsersTasks.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUsersTasks.fulfilled,(state,action)=>{
            state.loading=false
            state.usersTask=action.payload
        })       
        .addCase(fetchUsersTasks.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        .addCase(fetchTasksById.fulfilled,(state,action)=>{
            state.loading=false
            state.taskDetails=action.payload
        })
        .addCase(createTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })        
        .addCase(updateTask.fulfilled,(state,action)=>{
            const updatedTask= action.payload
            state.loading=false
            state.tasks= state.tasks.map((task)=>
              task.id === updatedTask.id ? {...task,...updatedTask} : task
            );
        })
        .addCase(assignedTaskToUser.fulfilled,(state,action)=>{
            const updatedTask= action.payload
            state.loading=false
            state.tasks= state.tasks.map((task)=>
              task.id === updatedTask.id ? {...task,...updatedTask} : task
            );
        })  
        .addCase(deleteTask.fulfilled,(state,action)=>{            
            state.loading=false
            state.tasks = state.tasks.filter((task)=>task.id!==action.payload)
        })            
    }
});

export default taskSlice.reducer;

    
        


