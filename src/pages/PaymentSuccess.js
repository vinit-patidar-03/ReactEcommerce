import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const Navigate = useNavigate('');
  const searchQuery = useSearchParams()[0];
  const refernceId = searchQuery.get('reference')

  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '90vh' }}>
        <i className="fa-solid fa-circle-check fa-2xl mb-4" style={{ color: "green" }}></i>
        <h1 className='text-lg font-bold'>Payment Successful</h1>
        <p className='text-xs'>reference id: {refernceId}</p>
        <button className="btn btn-primary my-2" onClick={() => { Navigate('/') }}>Continue Shopping</button>
      </div>
    </div>
  )
}

export default PaymentSuccess