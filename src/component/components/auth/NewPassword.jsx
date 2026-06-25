import axios from "axios";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomText from "../../ui/CustomText";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Cookies from "js-cookie"
import api from "../../../axios/axios";
import { toast } from "react-toastify";
const NewPassword=()=>{
    const {id}=useParams()
    const navigate=useNavigate()
    const [newPasswordInput,setNewPasswordInput]=useState({
        password:"",
        retypePassword:""
    })
    

    const newPasswordInputHandler=(e)=>{
        const {name,value}=e.target;
        
        setNewPasswordInput({...newPasswordInput,[name]:value});

    }

    const newPasswordHandler=async()=>{
          if(!newPasswordInput.password || !newPasswordInput.retypePassword){
                   return toast.error("Please fill all fields")
                }
                if(newPasswordInput.password !== newPasswordInput.retypePassword){
                   return toast.error("Password are mismatch");
                   setNewPasswordInput({...newPasswordInput,retypePassword:""})
                }
        
        const data={password:newPasswordInput.password}
         try {
            const res=await api.post("users/set-new-password",data,{
                headers:{
                    "token":id
                }
            });
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
                <CustomText className={"!text-[30px] text-center"} value={"New Password"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Password"}/>
                <CustomInput name="password" value={newPasswordInput?.password} onchange={(e)=>{newPasswordInputHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Retype Password"}/>
                <CustomInput name="retypePassword" value={newPasswordInput?.retypePassword} onchange={(e)=>{newPasswordInputHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex justify-center pt-3">
                 <CustomButton onclick={()=>{newPasswordHandler()}} value={"Send Link"}/>
               </div>       
           </div>
         </div>
        </>
    )
}
export default NewPassword;