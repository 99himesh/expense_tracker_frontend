import { Input } from "antd";
import CustomText from "../../ui/CustomText";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";
import axios from "axios";
import Cookies from "js-cookie"
import { useState } from "react";
import Loader from "../loader/loader";
import api from "../../../axios/axios.jsx";
const CreateYourOwnCategory=()=>{
    const token=Cookies.get("token");
    const [aiInput,setAiInput]=useState("");
    const [loading,setIsloading]=useState(false);
    const [answer,setAnswer]=useState("");
     const [error,setError]=useState("")
    const aicategoryHandler=async()=>{
        setError("")
        setIsloading(true)
        try {
            const data={question:aiInput}
            const res=await api.post("/ai",data,{
                headers:{
                     "Authorization":token
                }
            });

            if(res?.data?.success){
                setIsloading(false);
                setAiInput("");
                setError("")
                setAnswer(res?.data?.answer)

            }
            console.log(res,"sdjdsjfbj");
            
        } catch (error) {
            setIsloading(false)
            console.log(error);
             setError(error)
        }
    }

    console.log(error);
    
    return(
        <>

        <div className="flex flex-col justify-center  pb-10">
            <CustomText className={"!text-[30px] text-center"} value={"Create your own Category with AI"}/>
            <div className="w-[50%] mx-auto py-3 flex items-center gap-3">
                <CustomInput value={aiInput} onchange={(e)=>{setAiInput(e.target.value)}} placeholder={"Ask your category with ai"}/>
                <CustomButton onclick={aicategoryHandler} className={"h-[40px]"} value={"Submit"}/>
            </div>
            <div className="flex justify-center  w-[50%] mx-auto max-h-[200px] overflow-auto ">
               {loading && !error ?<Loader/>: <CustomText className={"!text-[14px] text-justify"} value={answer}/>}
               {error && <CustomText value={`Gemini 2.5-flash server  is not working properly, Please try again after some time ,sorry for enconvience.${error.message} , `} className={"!text-yellow-500"}/>}
            </div>
        </div>
        </>
    )
}
export default CreateYourOwnCategory;