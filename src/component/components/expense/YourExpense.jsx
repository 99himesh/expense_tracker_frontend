import axios from "axios";
import CustomTable from "../../ui/CustomTable";
import Cookies from "js-cookie"
import { useState } from "react";
import CustomText from "../../ui/CustomText";
import { Skeleton, Typography } from "antd";
import {
    DeleteOutlined
} from '@ant-design/icons';
import { useEffect } from "react";
import CustomSelect from "../../ui/CustomSelect";
import CustomPagination from "../../ui/CustomPagination";
import api from "../../../axios/axios";
import { formatDate } from "../../../constatnts/constants";
import CustomButton from "../../ui/CustomButton";
import CustomModal from "../../ui/CustomModal";
import AddExpense from "./AddExpense";
import CustomDate from "../../ui/CustomDate";
import Loader from "../loader/Loader";
const YourExpense = ({expense,setExpense,totalExpense,setTotalExpense,expenseInputHandler,expenseInput,setExpenseInput,addExpenseHandler,setAddExpenseModel,addExpenseModel}) => {
    const token = Cookies.get("token");
    const [pageSize,setPageSize]=useState(5);
    const [page,setPage]=useState(1);
    const [loading,setIsLoading]=useState(false)
    const expenseColumn = [
        {
            title: <CustomText value={"Id"} />,
            dataIndex: 'expenseAmount',
            key: 'expenseAmount',
            width: 100,
            render: (_, text, idx) => <Typography.Text>{idx + 1}</Typography.Text>
        },
        {
            title: <CustomText value={"Expense Amount"} />,
            dataIndex: 'expenseAmount',
            key: 'expenseAmount',
            render: (_, text) => <Typography.Text>Rs. {text.expenseAmount}</Typography.Text>
        },
        {
            title: <CustomText value={"Category"} />,
            dataIndex: 'category',
            key: 'category',
            render: (_, text) => <Typography.Text>{text.category}</Typography.Text>
        },
        {
            title: <CustomText value={"Description"} />,
            dataIndex: 'description',
            key: 'description',
            render: (_, text) => <Typography.Text>{text.description ?text.description:  "-"}</Typography.Text>
        },
        
            {
            title: <CustomText value={"Date"} />,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align:"center",
            render: (_, text) => <Typography.Text>{formatDate(text.createdAt)}</Typography.Text>
        },
        {
            title: <CustomText value={"Action"} />,
            dataIndex: 'description',
            key: 'description',
            align: "center",
            render: (_, text) => {
                return <div className="cursor-pointer" onClick={() => { expenseDeleteHandler(text) }} >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                </div>
            }
        }

    ];

    const getExpense = async () => {
        try {
            setIsLoading(true)
            const res = await api.get("/expense/getExpense", {
                headers: {
                    "Authorization": token
                },
                params:{
                    page:page,
                    limit:pageSize
                }
            })
            setExpense(res?.data?.expenses);
            setTotalExpense(res?.data?.total);


        } catch (error) {
            console.log(error);

        }finally{
            setIsLoading(false)
        }
    }

    const expenseDeleteHandler = async (item) => {
        try {
            setIsLoading(true)
             const res = await api.delete(`/expense/deleteExpense/${item?._id}`, {
                headers: {
                    "Authorization": token
                }
            })
            if (res?.data?.success) {
                getExpense();
            }
        } catch (error) {
            console.log(error);

        }finally{
            setIsLoading(false)
        }

    }
  
    useEffect(() => {
        getExpense();
    }, [page,pageSize]);
    return (
        <>
            <div className="flex flex-col gap-3  mx-auto pt-5  rounded-t-2xl mt-5 ">
                <div className="flex justify-between px-3">
                  <CustomText className={"!text-[24px]"} value={"Your Expense"}/>
                  <div className="flex gap-3 items-center">
                  <CustomButton onclick={()=>{setAddExpenseModel(true)}} value={"Add Expense"}/>
                  </div>
                </div>
                {<CustomTable scroll={{ y: 400 }} columns={expenseColumn} dataSource={expense} />}
                <CustomPagination pageSize={pageSize} setPageSize={setPageSize} onchange={(e)=>{setPage(e)}} total={totalExpense} defaultCurrent={page}/>
            </div>
            <CustomModal closeIcon={false} open={addExpenseModel} setOpen={setAddExpenseModel} modalBody={<AddExpense setAddExpenseModel={setAddExpenseModel}  expenseInputHandler={expenseInputHandler} expenseInput={expenseInput} setExpenseInput={setExpenseInput}  addExpenseHandler={addExpenseHandler}/>}/>
        </>
    )
}
export default YourExpense;