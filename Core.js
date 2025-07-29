import { useSelector ,useDispatch } from "react-redux";
import { check } from "./src/authSlice";
import { useEffect } from "react";
import Finance from "./Finance";
import Details from "./src/componants/Details";
import SignUp from "./src/pages/signUp";
import Login from "./src/pages/login";
import {Routes,Route, Navigate} from "react-router";

function Core(){
    const dispatch=useDispatch();
    const {isAuthenticated}=useSelector(state=> state.auth);

    useEffect(()=>{
       dispatch(check);
    },[dispatch]);

    return(
        <Routes>
            <Route path="/signup" element={isAuthenticated?<Navigate to={"/"}></Navigate>:<SignUp></SignUp>}></Route>
            <Route path="/login" element={isAuthenticated?<Navigate to={"/"}></Navigate>:<Login></Login>}></Route>
            <Route path="/" element={isAuthenticated?<Finance></Finance>:<Navigate to={"/signup"}></Navigate>}></Route>
            <Route path="/Details/:month" element={<Details></Details>}></Route>
        </Routes>
    )
}

export default Core;