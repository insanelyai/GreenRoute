import React from 'react'
import { AiOutlineCheck } from "react-icons/ai";

const PaymentSuccess = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <div className='w-96 h-96 flex justify-center items-center flex-col text-green-600 border-1px border rounded-2xl border-green-700'>
    <p className='text-3xl'> Payment Successful </p>
    <AiOutlineCheck className='text-4xl'/>

    </div>
    
      
    </div>
  )
}

export default PaymentSuccess
