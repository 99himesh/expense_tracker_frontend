import axios from "axios";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomText from "../../ui/CustomText";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie"
import api from "../../../axios/axios";
import { toast } from "react-toastify";
const Login=()=>{
    const navigate=useNavigate()
    const [loginInput,setloginInput]=useState({
        email:"",
        password:""
    })
    

    const loginInputUpHandler=(e)=>{
        const {name,value}=e.target;
        
        setloginInput({...loginInput,[name]:value});

    }

    const loginHandler=async()=>{
         if(!loginInput.email || !loginInput.password){
           return toast.error("Please fill all fields")

        }
        const data={...loginInput};
       
        
        try {
            const res=await api.post("/users/login",data);
            if(res.data.success){
                console.log(res.data.token);
                Cookies.set("token",res.data.token)
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)

            
        }
    }
    return(
        <>
         <div className="w-[50%] h-screen m-auto flex justify-center items-center">
              <div className="flex flex-col gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"Login"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Email"}/>
                <CustomInput name="email" value={loginInput?.email} onchange={(e)=>{loginInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Password"}/>
                <CustomInput name="password" value={loginInput?.password} onchange={(e)=>{loginInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex justify-center pt-3">
                 <CustomButton onclick={()=>{loginHandler()}} value={"Log in"}/>
               </div>
               <div className="text-[#fff] flex justify-center">
               <Link to={"/signUp"}>Dont have Account? Sign Up</Link>
               </div>
               <div className="text-[#fff] flex justify-center">
               <Link to={"/forget-password"}>Forget Password ?</Link>
               </div>
               
         </div>
         </div>
        </>
    )
}
export default Login;