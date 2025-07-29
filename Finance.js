import React, { useState } from "react";
import Render from "./src/componants/Render";
import { sumPush , setDark } from "./src/componants/slice";
import { useSelector,useDispatch } from "react-redux";
import { sumTempPush ,setFilter } from "./src/componants/slice0";
import aClient from "./src/utils/axiosClient";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const categories = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Other"];

function Finance() {
  const [date, setDate] = useState(new Date());
  const [amount,setAmount]=useState("");
  const [description,setDescription]=useState("");
  const [category,setCategory]=useState("");
  const [summery,setSummery]=useState(true);
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  

  const dispatch=useDispatch();
  const sum=useSelector(state=>state.slice.sum);
  const dark=useSelector(state=> state.slice.dark);
  const dummyData=useSelector(state=> state.slice.dummyData);
  const {filter}=useSelector(state=> state.slice0);
  

  function handleFilter(){
     if(!startDate||!endDate){
      alert("Please select both start and end dates.")
      return;
     }
//  m-1 :error free
// const startDate = new Date(startDate);
// const endDate = new Date(endDate);

// const arr = dummyData.filter(({ date }) => {
//   const d = new Date(date);
//   return d >= start && d <= end;
// });


    //  m-2 :brute force
     const sa=startDate.split("-").map(n=> Number(n));
     const ea=endDate.split("-").map(n=> Number(n));
     let arr=[];
      
      if(sa[1]<ea[1]){
        arr=dummyData.filter(({date})=>{
           const fa=date.split("-").map(n=> Number(n));
           if(fa[1]==sa[1] && fa[2]>=sa[2]){
            return true
           }

           if(fa[1]==ea[1] && fa[2]<=ea[2]){
            return true
           }

           return ((sa[1]<=fa[1])&&(fa[1]<=ea[1]))
         })
         
      }else if(sa[1]==ea[1]){
        arr=dummyData.filter(({date})=>{
           const fa=date.split("-").map(n=> Number(n));
           return((fa[1]==sa[1])&&((sa[2]<=fa[2]) &&(fa[2]<=ea[2])));
         })
         
      }else{
        alert("StartDatee should be less than endDate");
        return;
      }
     
      dispatch(setFilter(true));

      let sendTemp=[{m:"Jan",ttAmnt:0},{m:"Feb",ttAmnt:0},{m:"Mar",ttAmnt:0},{m:"Apr",ttAmnt:0}
             ,{m:"May",ttAmnt:0},{m:"Jun",ttAmnt:0},{m:"Jul",ttAmnt:0},{m:"Aug",ttAmnt:0},{m:"Sep",ttAmnt:0},{m:"Oct",ttAmnt:0}
             ,{m:"Nov",ttAmnt:0},{m:"Dec",ttAmnt:0}];

      for(let {month,amount} of arr){
         sendTemp=sendTemp.map(({m,ttAmnt})=>{
            if(m==month){
               ttAmnt+=parseFloat(amount);
            }
            return {m,ttAmnt}
         })
      }
      sendTemp=sendTemp.filter(({ttAmnt})=> parseFloat(ttAmnt)>0);
      dispatch(sumTempPush(sendTemp));
  }

  const handleAdd= async ()=>{
    try{
      await aClient.post("/tracker/finance",{date:date.getTime(),amount:parseFloat(amount),description:description,category:category});
      return true;
    }
    catch(e){
      alert("Error: "+e);
      return false;
    }
  }

  async function Add(){
   if(amount&&description&&date&&category){
     
   //dispatch(Push({date:date.getTime(),amount:parseFloat(amount),description:description,category:category}));
 
   const bool=await handleAdd()
  if(bool){     
   const m=monthNames[date.getMonth()];
   
   const n=sum.map(({month,ttAmnt})=>{
      if(m==month){
        ttAmnt+=parseFloat(amount);
      }

      return {month,ttAmnt};
   });

    dispatch(sumPush(n));
    setAmount("");
    setCategory("");
    setDate(new Date());
    setDescription("");
  }
    }
    else{
       alert("All the fields should be filled after expanse can be added");
    }
  }

 
  return (
    <div className={dark?"d-ancestor dark-mode":"ancestor"}>
    <div className="finance-tracker">
      <h1 className="title">Personal Finance Tracker</h1>

      <button className="dark-toggle-btn" onClick={() =>{dispatch(setDark(!dark))}}>
         {dark ? "☀" : "🌙"}
      </button>
      <div className="card">
        <div className="form-grid">
          <input type="number" placeholder="Amount" className="input"  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
          <input type="text" placeholder="Description" className="input" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>

          <select className="input" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="" disabled>
              Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            max={`${date.toISOString().split("T")[0].slice(0,4)}-12-31`}
            min={`${date.toISOString().split("T")[0].slice(0,4)}-01-01`}
            className="input"
            value={date!="Invalid Date"?date.toISOString().split("T")[0]:""}
            onChange={(e) => setDate(new Date(e.target.value))}
          />

          <button className="btn" onClick={Add}>Add Expense</button>
        </div>
      </div>

      <div className="tabs">
        <button className={summery?"tab active":"tab"} onClick={()=>{setSummery(true)}}>Monthly Summary</button>
        <button className={summery?"tab":"tab active"} onClick={()=>{setSummery(false)}}>Chart</button>
      </div>

        <div className="date-filter">

     <input
       type="date"
       className="input"
       value={startDate}
       min={`${date.toISOString().split("T")[0].slice(0,4)}-01-01`}
       max={`${date.toISOString().split("T")[0].slice(0,4)}-12-31`}
       onChange={(e) => setStartDate(e.target.value)}
     />
     <input
       type="date"
       className="input"
       value={endDate}
       min={`${date.toISOString().split("T")[0].slice(0,4)}-01-01`}
       max={`${date.toISOString().split("T")[0].slice(0,4)}-12-31`}
       onChange={(e) => setEndDate(e.target.value)}
     />
     <button className="btn filter-btn" onClick={handleFilter}>
       Apply Filter
     </button>
     {
        filter?(
        <div className={dark?"d-box box":"box"} onClick={()=>{dispatch(setFilter(false));}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
        </div>
         ):""
      }
      </div>

      <Render b={summery}></Render>
    </div>
    </div>
  );
}

export default Finance;