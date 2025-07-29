import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Render({b}){
  const sum=useSelector(state=>state.slice.sum);
  const dark=useSelector(state=> state.slice.dark);
  const {sumTemp}=useSelector(state=> state.slice0);
  const {filter}=useSelector(state=> state.slice0);

    if(b){
        return(
            <div className="summary">
        {
          (filter?sumTemp:sum).map((obj)=>{
            return(
             <div className="summary-row" key={filter?obj.m:obj.month}>
               <span>{filter?obj.m:obj.month}</span>
               <div>
               <span>₹{obj.ttAmnt}</span>
               <Link to={`/Details/${filter?obj.m:obj.month}`} key={filter?obj.m:obj.month}><button className="d-btn">Details</button></Link>
               </div>
             </div>
            )
          })
        }
        
      </div>
        )
    }else{
      return(
         <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={(filter?sumTemp:sum)}>
            <XAxis dataKey={filter?"m":"month"} stroke={dark?"#ffffff":"#1F2937"}
             interval={0}
             angle={0}
             textAnchor="middle"/>
            <YAxis  dataKey="ttAmnt" stroke={dark?"#ffffff":"#1F2937"}/>
            <Bar dataKey="ttAmnt" fill={dark?"#FE7743":"#3B82F6"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      )
    }
}

export default Render;