import { createSlice } from "@reduxjs/toolkit";

const reactSlice=createSlice({
    name:"slice0",
    initialState:{
        sumTemp:[{m:"Jan",ttAmnt:0},{m:"Feb",ttAmnt:0},{m:"Mar",ttAmnt:0},{m:"Apr",ttAmnt:0}
             ,{m:"May",ttAmnt:0},{m:"Jun",ttAmnt:0},{m:"Jul",ttAmnt:0},{m:"Aug",ttAmnt:0},{m:"Sep",ttAmnt:0},{m:"Oct",ttAmnt:0}
             ,{m:"Nov",ttAmnt:0},{m:"Dec",ttAmnt:0}],
        filter:false
    },
    reducers:{
        sumTempPush:(state,action)=>{
           state.sumTemp=action.payload;
        },
        setFilter:(state,action)=>{
            state.filter=action.payload;
        }
    }
});

export const {tempDataPush,sumTempPush,setFilter}=reactSlice.actions;
export default reactSlice.reducer;