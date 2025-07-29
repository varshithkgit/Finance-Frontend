import { useParams } from "react-router";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import aClient from "../utils/axiosClient";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#FE7743", "#273F4F", "#E8C999", "#8E1616"];

function Details() {
  const { month } = useParams();
  // const dummyData = useSelector((state) => state.slice.dummyData);
  const [dummyData,setDummyData]=useState([]);
  const dark = useSelector((state) => state.slice.dark);
  const [showChart, setShowChart] = useState(false);
  const d=new Date();

  useEffect(()=>{
    const getExpanses= async () => {
      try{
        const {data}=await aClient.get("/tracker/getExpanses");
        setDummyData(data);
      }catch(e){
        console.log(e);
      }
    }

    getExpanses();
  },[month]);

  let pieData = [
    { c: "Food", a: 0 },
    { c: "Transport", a: 0 },
    { c: "Rent", a: 0 },
    { c: "Utilities", a: 0 },
    { c: "Entertainment", a: 0 },
    { c: "Other", a: 0 },
  ];
 
  for(let  {category,amount} of dummyData){
    pieData=pieData.map(({c,a})=>{
        if(c==category){
        a+=Number(amount);
        }
        return {c,a};
    })
      
  }

  return (
    <div className={dark ? "dark-mode" : ""}>
      <div className="details-container">
        <div className="header">
        <h1 className="details-heading">Expense Details - {month} {d.getFullYear()}</h1>
        <button className="btn toggle-chart-btn" onClick={() => setShowChart(!showChart)}>
          {showChart ? "Table" : "Chart"}
        </button>
         </div>
        {showChart ? (
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="a"
              nameKey="c"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {dummyData.map((entry, index) => (
                <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <div className="details-card">
            <table className="details-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {dummyData?.map((obj, i) => {
                  let dateObj=new Date(obj.date);
                  if (monthNames[dateObj?.getMonth()] === month)
                    return (
                      <tr key={obj.month + `${i}`}>
                        <td>{dateObj.toISOString().split("T")[0]}</td>
                        <td>{obj.description}</td>
                        <td>{obj.category}</td>
                        <td>₹{obj.amount}</td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
