import { useState } from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './component/pages/SignUpPage'
import LoginPage from './component/pages/LoginPage'
import ExpensePage from './component/pages/ExpensePage'
import PaymentStatus from './component/components/expense/PaymentStatus'
import { ToastContainer } from 'react-toastify';
function App() {
  

  return (
    <>
     <ToastContainer />
    <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ExpensePage />} />  
        <Route path="/payment-status/:id" element={<PaymentStatus />} />  
           
      </Routes>

     
    </>
  )
}

export default App
