import { useEffect, useState } from "react"
import CustomButton from "../../ui/CustomButton"
import CustomInput from "../../ui/CustomInput"
import CustomText from "../../ui/CustomText"
import axios from "axios"
import CustomSelect from "../../ui/CustomSelect"
import CustomTable from "../../ui/CustomTable"
import { Button, Col, Popover, Row, Typography } from "antd"
import Cookies from "js-cookie"
import {
    ArrowDownOutlined,
    DeleteOutlined,
    LoginOutlined
} from '@ant-design/icons';
import LeaderBoard from "./LeaderBoard"
import YourExpense from "./YourExpense"
import CreateYourOwnCategory from "./createYourOwnCategory"
import api from "../../../axios/axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
const Expense = () => {
    const navigate=useNavigate();
    const token = Cookies.get("token");
    const [expenseInput, setExpenseInput] = useState({
        expenseAmount: null,
        description: "",
        category: ""
    });

    const [expense, setExpense] = useState([]);
    const [totalExpense,setTotalExpense]=useState(null)

    const expenseInputHandler = (e) => {
        const { name, value } = e.target;
        setExpenseInput({ ...expenseInput, [name]: value })
    }

    const logoutHandler=()=>{
        Cookies.remove("token")
        navigate("/login")
    }
    const getExpense = async () => {
        try {
            const res = await api.get("/expense/getExpense", {
                headers: {
                    "Authorization": token
                },
                 params:{
                    page:1,
                    limit:5
                }
            });
            setExpense(res?.data?.expenses);
            setTotalExpense(res?.data?.total);
            


        } catch (error) {
            console.log(error);

        }
    }
    const addExpenseHandler = async () => {
        const data = { ...expenseInput }
        try {
            const res = await api.post("/expense/addExpense", data, {
                headers: {
                    "Authorization": token
                }
            })

console.log(res,"vjbdfvjhb");

            if (res?.data?.success) {
                getExpense();
                setExpenseInput({
                    expenseAmount: null,
                    description: "",
                    category: ""
                });
                toast.success(res.message)
            }
        } catch (error) {
            console.log(error);

        }
    }
    

  



   
    return (
        <div className="relative">
        <div className="h-screen overflow-auto  py-10  ">
            {/* <div className="w-[50%]  m-auto flex justify-center items-center"> */}
            <div className="container mx-auto">
                <Row>
                    <Col span={24}>
                    <CreateYourOwnCategory/>
                    </Col>
                </Row>
                <Row  >
                    <Col span={10}>
                        <div className="flex flex-col items-center  gap-4">
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
                                    className="!w-[300px]"
                                    onchange={(e) => { setExpenseInput({ ...expenseInput, category: e }) }}
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
                    </Col>
                   
                    <Col span={14}>
                        <LeaderBoard />
                    </Col>
                </Row>
                 <YourExpense  setExpense={setExpense} expense={expense} totalExpense={totalExpense} setTotalExpense={setTotalExpense}/>
            </div>
            
            
        </div>
        <div className="absolute bottom-5 right-32">
                <div className="flex  gap-2">
                <Popover content="Logout">
               <Button onClick={()=>{logoutHandler()}}  className="!bg-red-400 !border-none !h-[40px] !w-[40px] !rounded-full rotate-[90deg] " ><LoginOutlined style={{color:"white",fontSize:"18px"}}/></Button>
              </Popover>
               <Popover content="Download expense">
            <Button  className="!bg-green-600 !border-none !h-[40px] !w-[40px] !rounded-full  " ><ArrowDownOutlined style={{color:"white",fontSize:"18px"}}/></Button>
           </Popover>
             </div>
            </div>
</div>



    )
}
export default Expense;