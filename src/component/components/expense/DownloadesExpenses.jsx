

import axios from "axios";
import CustomTable from "../../ui/CustomTable";
import Cookies from "js-cookie"
import { useState } from "react";
import CustomText from "../../ui/CustomText";
import { Typography } from "antd";
import {
    DeleteOutlined,
    FileOutlined
} from '@ant-design/icons';
import { useEffect } from "react";
import CustomSelect from "../../ui/CustomSelect";
import CustomPagination from "../../ui/CustomPagination";
import api from "../../../axios/axios";
import { formatDate } from "../../../constatnts/constants";
import Loader from "../loader/Loader";
const DownloadedExpenses = ({expense,setExpense,totalExpense,setTotalExpense,leaderBoardStatus}) => {
     const token = Cookies.get("token");
     const [loading,setIsloading]=useState(false);
     const [downloadExpense,setDownloadExpense]=useState([])
      const downloadedExpense=async(text)=>{
       try {
        setIsloading(true)
        const link = document.createElement("a");
        link.href = text.file;
        link.download = `${new Date()}/expenses.txt`; // May be ignored for cross-origin URLs
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
                
       } catch (error) {
        console.log(error);
        
       }finally{
        setIsloading(false)
       }
    }
    const expenseColumn = [
        {
            title: <CustomText value={"Id"} />,
            dataIndex: 'id',
            key: 'id',
            width:70,
            render: (_, text, idx) => <Typography.Text>{idx + 1}</Typography.Text>
        },
        {
            title: <CustomText value={"Downloaded File"} />,
            dataIndex: 'file',
            key: 'file',
            align:"center",
            width:180,

            render: (_, text) =><div className="cursor-pointer" onClick={()=>{downloadedExpense(text)}}><FileOutlined /></div> 
        },
        {
            title: <CustomText value={"Date"} />,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align:"center",
            render: (_, text) => <Typography.Text>{formatDate(text.createdAt)}</Typography.Text>
        }
    ];

    const getExpense = async () => {
        try {
            setIsloading(true)
            const res = await api.get("/expense/getDownloadExpense", {
                headers: {
                    "Authorization": token
                }
            })
            
            setDownloadExpense(res?.data?.downloadedExpense);


        } catch (error) {
            console.log(error);

        }finally{
            setIsloading(false)
        }
    }
    useEffect(() => {
        getExpense();
    }, []);
    if(loading) return <Loader/>
    return (
        <>
            <div className="flex flex-col gap-3  mx-auto  rounded-t-2xl mt-5 ">
                <div className="flex justify-between ">
                  <CustomText className={"!text-[24px] "} value={"Latest Downloaded Expense"}/>
                
                </div>
               {!leaderBoardStatus ?
               <Typography.Text  className={"!text-[16px] !text-[#fff]"} >Buy a premium membership to see Downloaded Expense </Typography.Text>:

               <CustomTable  scroll={{ y: 400  }} columns={expenseColumn} dataSource={downloadExpense} />
               }
            </div>
        </>
    )
}
export default DownloadedExpenses;