import {createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import aClient from "./utils/axiosClient";

export const registerUser= createAsyncThunk(
    "auth/register",
    async (userData,{rejectedWithValue})=>{
        try{
            const {data}= await aClient.post("/user/register",userData);
            return data.user;
        }
        catch(e){
            return rejectedWithValue({
                message:e.message,
                code:e.code,
                isAxiosError:e.isAxiosError
            })
        }
    }
)

export const login= createAsyncThunk(
    "auth/login",
    async (userData,{rejectedWithValue})=>{
        try{
            const {data}= await aClient.post("/user/login",userData);
            return data.user;
        }
        catch(e){
            return rejectedWithValue({
                message:e.message,
                code:e.code,
                isAxiosError:e.isAxiosError
            })
        }
    }
)

export const logout= createAsyncThunk(
    "auth/logout",
    async (_,{rejectedWithValue})=>{
        try{
            await aClient.post("/user/logout");
            return;
        }
        catch(e){
            return rejectedWithValue({
                message:e.message,
                code:e.code,
                isAxiosError:e.isAxiosError
            })
        }
    }
)

export const check= createAsyncThunk(
    "auth/check",
    async (_,{rejectedWithValue})=>{
        try{
            const {data}= aClient.post("/user/check");
            return data.user;
        }
        catch(e){
            return rejectedWithValue({
                message:e.message,
                code:e.code,
                isAxiosError:e.isAxiosError
            })
        }
    }
)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        error:null,
        data:null,
        isAuthenticated:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=!!action.payload;
            state.error=null;
            state.loading=false;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action?.payload?.message|| "Something went wrong";
            state.isAuthenticated=false;
            state.data=null
        })
         .addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=!!action.payload;
            state.error=null;
            state.loading=false;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message|| "Something went wrong";
            state.isAuthenticated=false;
            state.data=null  
        })
         .addCase(logout.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=!!action.payload;
            state.error=null;
            state.loading=false;
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message|| "Something went wrong";
            state.isAuthenticated=false;
            state.data=null
        })
         .addCase(check.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(check.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.isAuthenticated=!!action.payload;
            state.error=null;
            state.loading=false;
        })
        .addCase(check.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message|| "Something went wrong";
            state.isAuthenticated=false;
            state.data=null
        })
    }
});

export default authSlice.reducer;