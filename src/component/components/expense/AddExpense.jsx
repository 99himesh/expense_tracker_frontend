import { Popover, Typography } from "antd";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomSelect from "../../ui/CustomSelect";
import CustomText from "../../ui/CustomText";
import {CloseOutlined} from '@ant-design/icons';
import { RiRefreshLine } from "react-icons/ri";
import api from "../../../axios/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const AddExpense=({addExpenseHandler,setExpenseInput,expenseInput,expenseInputHandler,setAddExpenseModel})=>{
  const token=Cookies.get("token");
     const generateCategoryWithAiHandler=async()=>{
        if(!expenseInput.description) return toast.error("Please enter description before generating ategory with Ai")
        const data={question:expenseInput.description}
          try {
             const res=await api.post("/ai/generateCategory",data,{
                 headers:{
                     "Authorization":token
                }
             });
             if(res?.data?.success){
                setExpenseInput({...expenseInput,category: res?.data?.category})
            }
          } catch (error) {
            console.log(error);
            
          }
      }
     
    
    return(
        <div className="relative">
         <div className="flex flex-col items-center bg-[#000] gap-4 p-5 rounded-md ">
                            <CustomText className={"!text-[30px] text-center"} value={"Add Expense"} />
                            <div className="flex flex-col gap-2">
                                <CustomText value={"ExpenseAmount"} />
                                <CustomInput name="expenseAmount" value={expenseInput?.expenseAmount} onchange={(e) => { expenseInputHandler(e) }} className={"!w-[300px]"} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <CustomText value={"Description"} />
                                <CustomInput name="description" value={expenseInput?.description} onchange={(e) => { expenseInputHandler(e) }} className={"!w-[300px]"} />
                            </div>
                            <div className=" relative flex flex-col gap-2">
                                <CustomText value={"Category"} />
                                {/* <CustomInput name="category" value={expenseInput?.category} onchange={(e)=>{expenseInputHandler(e)}} className={"!w-[300px]"} /> */}
                                
                                <CustomSelect
                                     mode={"tags"}
                                    className="!w-[300px] !h-[40px]"
                                    defaultValue={"Food"}
                                    onchange={(e) => { setExpenseInput({ ...expenseInput, category: e[0] }) }}
                                    value={expenseInput.category}
                                    options={[
                                        { label: "Food", value: "food" },
                                        { label: "Groceries", value: "groceries" },
                                        { label: "Rent", value: "rent" },
                                    ]} />
                            <Popover content={"Generate category with AI"}>
                                    <div className="absolute -right-13 top-7.5">
                                <CustomButton className={"!py-5"} onclick={()=>{generateCategoryWithAiHandler()}}  value={<RiRefreshLine />}/>
                                </div>
                            </Popover>

                            </div>
                            <div className="flex justify-center pt-3">
                                <CustomButton onclick={() => { addExpenseHandler() }} value={"Add Expense"} />
                            </div>
                        </div>
                        <div className="absolute -top-5 -right-3 cursor-pointer" onClick={()=>{setAddExpenseModel(false)}}>
                      
                        <CloseOutlined style={{fontSize:"16px"}}/>
                        </div>
        
        </div>
    )
}
export default AddExpense;