import { useForm } from "react-hook-form";
import { login } from "../authSlice";
import { useDispatch ,useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";

const userSchema=z.object({
     username:z.string().min(3),
     emailId:z.string().email(),
     password:z.string().min(8)
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch=useDispatch();
  const {isAuthenticated}=useSelector(state=>state.auth);
  const navigate=useNavigate({resolver:zodResolver(userSchema)});

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(()=>{
    if(isAuthenticated){
        navigate("/",{replace:true});
    }
  },[isAuthenticated,navigate]);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="signup-title">Login to Account</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("emailId", { required: "Email is required" })}
          />
          {errors.emailId && (
            <p className="error">{errors.emailId.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="signup-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;