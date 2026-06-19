import axios from "axios";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomText from "../../ui/CustomText";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Cookies from "js-cookie"
import api from "../../../axios/axios";
const NewPassword=()=>{
    const {id}=useParams()
  console.log(id);
  
    const [newPasswordInput,setNewPasswordInput]=useState({
        password:"",
        retypePassword:""
    })
    

    const newPasswordInputHandler=(e)=>{
        const {name,value}=e.target;
        
        setNewPasswordInput({...newPasswordInput,[name]:value});

    }

    const newPasswordHandler=async()=>{
        const data={password:newPasswordInput.password}
         try {
            const res=await api.post("users/set-new-password",data,{
                headers:{
                    "token":id
                }
            });
            
         } catch (error) {
            console.log(error);
            
         }
         
    }

   
    return(
        <>
          <div className="w-[50%] h-screen m-auto flex justify-center items-center">
              <div className="flex flex-col gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"New Password"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Pawword"}/>
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