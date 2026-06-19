import { Navigate, useNavigate } from "react-router"
import Cookies from "js-cookie"
const Protected=({children})=>{
    const navigate=useNavigate();
    const token=Cookies.get("token")
    return token?children : <Navigate to="/login" replace />;
}

export default Protected;