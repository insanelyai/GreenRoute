import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";

const PaymentSuccess = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <div className='w-96 h-96 flex justify-center items-center flex-col text-red-600 border-1px border rounded-2xl border-red-700'>
    <p className='text-3xl'> Payment Cancelled </p>
    <AiOutlineCloseCircle className='text-4xl'/>

    </div>
    
      
    </div>
  )
}

export default PaymentSuccess
