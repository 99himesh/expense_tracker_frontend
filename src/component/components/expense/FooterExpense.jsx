import { Button, Popover } from "antd";
import {
    ArrowDownOutlined,
    
    LoginOutlined
} from '@ant-design/icons';
import Cookies from "js-cookie"
import { useNavigate } from "react-router";
import api from "../../../axios/axios";
const FooterExpense=({leaderBoardStatus})=>{
    const token=Cookies.get("token");
    const navigate=useNavigate();
     const logoutHandler=()=>{
        Cookies.remove("token")
        navigate("/login")
    }
    const downloadExpense=async()=>{
       try {
        const res=await api.get("/expense/download-expense",{
            headers:{
                "Authorization":token
            }
        });
        const link = document.createElement("a");
        link.href = res.data.fileUrl;
        link.download = `${new Date()}/expenses.txt`; // May be ignored for cross-origin URLs
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
                
       } catch (error) {
        console.log(error);
        
       }
    }
    return(
        <>
         <div className="absolute bottom-5 right-32">
                <div className="flex  gap-2">
                <Popover content="Logout">
               <Button onClick={()=>{logoutHandler()}}  className="!bg-red-400 !border-none !h-[40px] !w-[40px] !rounded-full rotate-[90deg] " ><LoginOutlined style={{color:"white",fontSize:"18px"}}/></Button>
              </Popover>
               <Popover content={leaderBoardStatus?"Download expense":"Buy a premium membership to download your expenses."}>
            <Button disabled={!leaderBoardStatus?true:false}  onClick={()=>{downloadExpense()}}  className="!bg-green-600 !border-none !h-[40px] !w-[40px] !rounded-full  " ><ArrowDownOutlined style={{color:"white",fontSize:"18px"}}/></Button>
           </Popover>
             </div>
            </div>
        </>
    )
}

export default FooterExpense;