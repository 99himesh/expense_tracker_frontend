import axios from "axios";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomText from "../../ui/CustomText";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie"
import api from "../../../axios/axios";
import { toast } from "react-toastify";
const ForgetPassword=()=>{
    const navigate=useNavigate()
  
    const [forgetPassswordinput,setForgetPasswordInput]=useState({
        email:""
    })
    

        const forgetPasswordInputHandler=(e)=>{
            const {name,value}=e.target;
            
            setForgetPasswordInput({...forgetPassswordinput,[name]:value});

        }

        const forgetPasswordHandler=async()=>{
            if(!forgetPassswordinput.email ){
               return toast.error("Please fill all fields")
              }
            try {const data={...forgetPassswordinput}
                const res=await api.post("/users/send-forget-password-link",data);
                if(res.data.success){
                    toast.success(res.data.message);
                    navigate("/login")
                }
            } catch (error) {
                console.log(error); 
                    toast.error(error.message)

            }
        }

   
    return(
        <>
         <div className="w-[50%] h-screen m-auto flex justify-center items-center">
              <div className="flex flex-col gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"Forget Password"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Email"}/>
                <CustomInput name="email" value={forgetPassswordinput?.email} onchange={(e)=>{forgetPasswordInputHandler(e)}} className={"!w-[300px]"} />
               </div>
              
               <div className="flex justify-center pt-3">
                 <CustomButton onclick={()=>{forgetPasswordHandler()}} value={"Send Link"}/>
               </div>
               <div className="text-[#fff] flex justify-center">
               <Link to={"/login"}>have you remember password ? Login</Link>
               </div>
               
               
         </div>
         </div>
        </>
    )
}
export default ForgetPassword;