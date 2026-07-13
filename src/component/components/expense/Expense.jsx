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
import FooterExpense from "./FooterExpense"
import DownloadedExpense from "./DownloadesExpenses"
import DownloadedExpenses from "./DownloadesExpenses"
import AddExpense from "./AddExpense"
const Expense = () => {
    const [leaderBoardStatus,setLeaderBoardStatus]=useState(false);
    const [addExpenseModel,setAddExpenseModel]=useState(false)
    const navigate=useNavigate();
    const token = Cookies.get("token");
    const [expenseInput, setExpenseInput] = useState({
        expenseAmount: null,
        description: "",
        category: "food"
    });

    const [expense, setExpense] = useState([]);
    const [totalExpense,setTotalExpense]=useState(null)

    const expenseInputHandler = (e) => {

        const { name, value } = e.target;
        setExpenseInput({ ...expenseInput, [name]: value })
    }
 const cheackLeaderBoardStatus=async()=>{
          try {
             const res=await api.get(`/payment/getOrder-status`,{
                headers:{
                    "authorization":token
                }
             });
             console.log(res,"hhgfh");
             
             if(res?.data?.user?.isPremiorUser){
                
             setLeaderBoardStatus(true)
               
             }
          
            
          } catch (error) {
            console.log(error);
            
          }
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
        if(!expenseInput.expenseAmount || !expenseInput.category){
            return toast.error("Please fill all fields")
        }
        const data = { ...expenseInput }
        try {
            const res = await api.post("/expense/addExpense", data, {
                headers: {
                    "Authorization": token
                }
            })


            if (res?.data?.success) {
                getExpense();
                setExpenseInput({
                    expenseAmount: null,
                    description: "",
                    category: ""
                });
                setAddExpenseModel(false)
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
                toast.error(error.message)


        }
    }
    
console.log(leaderBoardStatus,"dsfsdfsd");

  

useEffect(()=>{
    cheackLeaderBoardStatus();
},[])

   
    return (
        <div className="relative">
        <div className="h-screen overflow-auto  py-10  ">
            {/* <div className="w-[50%]  m-auto flex justify-center items-center"> */}
            <div className="container mx-auto">
                <Row>
                    <Col span={24}>
                    <CreateYourOwnCategory leaderBoardStatus={leaderBoardStatus}/>
                    </Col>
                </Row>
                <Row gutter={[20,20]} >
                    <Col span={8}>
                    <DownloadedExpense leaderBoardStatus={leaderBoardStatus}/>
                        {/* <AddExpense expenseInputHandler={expenseInputHandler} expenseInput={expenseInput} setExpenseInput={setExpenseInput}  addExpenseHandler={addExpenseHandler}/> */}
                    </Col>
                   
                    <Col span={16}>
                        <LeaderBoard leaderBoardStatus={leaderBoardStatus} />
                    </Col>
                </Row>
               <YourExpense setAddExpenseModel={setAddExpenseModel} addExpenseModel={addExpenseModel} expenseInputHandler={expenseInputHandler} expenseInput={expenseInput} setExpenseInput={setExpenseInput}  addExpenseHandler={addExpenseHandler}  setExpense={setExpense} expense={expense} totalExpense={totalExpense} setTotalExpense={setTotalExpense}/>
                     
           
            </div>
            
            <FooterExpense leaderBoardStatus={leaderBoardStatus}/>
            
        </div>
       
</div>



    )
}
export default Expense;