import { Typography } from "antd";
import CustomButton from "../../ui/CustomButton";
import CustomInput from "../../ui/CustomInput";
import CustomSelect from "../../ui/CustomSelect";
import CustomText from "../../ui/CustomText";
import {CloseOutlined} from '@ant-design/icons';
const AddExpense=({addExpenseHandler,setExpenseInput,expenseInput,expenseInputHandler,setAddExpenseModel})=>{

     
    
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
                            <div className="flex flex-col gap-2">
                                <CustomText value={"Category"} />
                                {/* <CustomInput name="category" value={expenseInput?.category} onchange={(e)=>{expenseInputHandler(e)}} className={"!w-[300px]"} /> */}
                                <CustomSelect
                                     mode={"tags"}
                                    className="!w-[300px]"
                                    defaultValue={"Food"}
                                    onchange={(e) => { setExpenseInput({ ...expenseInput, category: e[0] }) }}
                                    value={expenseInput.category}
                                    options={[
                                        { label: "Food", value: "food" },
                                        { label: "Groceries", value: "groceries" },
                                        { label: "Rent", value: "rent" },
                                        { label: "Water bill", value: "water bill" }
                                    ]} />
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