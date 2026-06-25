import axios from "axios";
import CustomButton from "../../ui/CustomButton";
import CustomText from "../../ui/CustomText";
import { load } from "@cashfreepayments/cashfree-js";
import Cookies from "js-cookie"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import CustomTable from "../../ui/CustomTable";
import { Typography } from "antd";
import api from "../../../axios/axios";
import { formatDate } from "../../../constatnts/constants";
const LeaderBoard=({leaderBoardStatus})=>{
    const [leaderBoard,setLeaderBoard]=useState([])
    const [orderId,setOrderId]=useState(null);
    const navigate=useNavigate();
    const token=Cookies.get("token");
        let cashfree;
      const initializeSDK = async function () {          
        cashfree = await load({
            mode: "sandbox"
         });
       }
    initializeSDK();
    const doPayment = async () => {
     try {
            const res=await api.post("/payment/pay",{},{
                headers:{
                    "Authorization":token
                }
            });            
           const sessionId=res.data.paymentSessionId; 
           setOrderId(res.data.orderId);
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_self",
            };
          const result=await cashfree.checkout(checkoutOptions);
           
            } catch (error) {
              console.log({error:error});   
            }
    };


      
       const getLeaderBoard=async()=>{
          try {
             const res=await api.get("/users/leaderBoard",{
                headers:{
                    "authorization":token
                }
             });
            setLeaderBoard(res?.data?.user)
          } catch (error) {
            console.log(error);
            
          }
       }
      
     const leaderBoardColumn = [
        {
            title: <CustomText value={"Id"} />,
            dataIndex: 'expenseAmount',
            key: 'expenseAmount',
            width: 70,
            render: (_, text, idx) => <Typography.Text>{idx + 1}</Typography.Text>
        },
         {
            title: <CustomText value={"Name"} />,
            dataIndex: 'name',
            key: 'name',
            width:300,
            render: (_, text, idx) => <Typography.Text>{text?.name}</Typography.Text>
        },
        {
            title: <CustomText value={"Total Expense"} />,
            dataIndex: 'total_amount',
            key: 'total_amount',
            align:"start",
            width:300,
            render: (_, text) => <Typography.Text>Rs. {text?.total_amount}</Typography.Text>
        },
        {
            title: <CustomText value={"Date"} />,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align:"center",
            render: (_, text) => <Typography.Text>{formatDate(text.createdAt)}</Typography.Text>
        }
        
       

    ];
  useEffect(()=>{
             getLeaderBoard();


        },[])
    
    return(
        <div className="">
        {!leaderBoardStatus? 
       ( <div>
        <div className="flex justify-center  gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"Premium Membership"}/>
        </div>
        <div className="flex justify-center items-center pt-5">
            <CustomButton onclick={()=>{doPayment()}} value={"Buy Premium Membership"}/>
        </div>
        </div>)
        :(
            <div className="flex flex-col gap-3 mt-5">
                <CustomText className={"!text-[24px] "} value={"You are a premium user"}/>
                <div className="flex justify-center items-center ">
                    <CustomTable scroll={{ y:400 }} columns={leaderBoardColumn} dataSource={leaderBoard} />
                
                </div>
             </div>
        )}
        </div>
    )
}
export default LeaderBoard;