import { useState } from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './component/pages/SignUpPage'
import LoginPage from './component/pages/LoginPage'
import ExpensePage from './component/pages/ExpensePage'
import PaymentStatus from './component/components/expense/PaymentStatus'
import { ToastContainer } from 'react-toastify';
import Protected from './component/protected/Protected'
import ForgetPasswordPage from './component/pages/ForgetPasswordPage'
import NewPasswordPage from './component/pages/NewPasswordPage'
function App() {
  

  return (
    <>
     <ToastContainer />
    <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/new-password/:id" element={<NewPasswordPage />} />
        <Route path="*" element={<LoginPage />} />
        
        
        <Route path="*" element={<Protected><ExpensePage /></Protected>} />  
        <Route path="/" element={<Protected><ExpensePage /></Protected>} />  
        <Route path="https://expensetracker-sharpner.netlify.app/payment-status/:id" element={<Protected><PaymentStatus /></Protected>} />  
           
      </Routes>

     
    </>
  )
}

export default App
