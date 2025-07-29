import { createSlice } from "@reduxjs/toolkit";



const reactSlice=createSlice({
    name:"slice",
    initialState:{
        //dummyData:[],
        sum:[{month:"Jan",ttAmnt:0},{month:"Feb",ttAmnt:0},{month:"Mar",ttAmnt:0},{month:"Apr",ttAmnt:0}
             ,{month:"May",ttAmnt:0},{month:"Jun",ttAmnt:0},{month:"Jul",ttAmnt:0},{month:"Aug",ttAmnt:0},{month:"Sep",ttAmnt:0},{month:"Oct",ttAmnt:0}
             ,{month:"Nov",ttAmnt:0},{month:"Dec",ttAmnt:0}],
        dark:false
    },
    reducers:{
        // Push:(state,action)=>{
        //    state.dummyData=[...state.dummyData,action.payload];
        // },
        sumPush:(state,action)=>{
           state.sum=action.payload;
        },
        setDark:(state,action)=>{
           state.dark=action.payload;
        }
    }
});

export const {sumPush,setDark}=reactSlice.actions;
export default reactSlice.reducer;