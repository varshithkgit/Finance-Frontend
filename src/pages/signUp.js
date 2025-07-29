import { useForm } from "react-hook-form";
import { useDispatch , useSelector } from "react-redux";
import { registerUser } from "../authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";

const userSchema=z.object({
     userName:z.string().min(3),
     emailId:z.string().email(),
     password:z.string().min(8)
})

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:zodResolver(userSchema)});

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector(state=> state.auth);

  const onSubmit = (data) => {
     console.log(data);
    dispatch(registerUser(data));
  };

  useEffect(()=>{
     if(isAuthenticated){
          navigate("/",{replace:true});
     }
  },[isAuthenticated,navigate]);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="signup-title">Create an Account</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register("userName", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error">{errors.userName.message}</p>
          )}
        </div>

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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;