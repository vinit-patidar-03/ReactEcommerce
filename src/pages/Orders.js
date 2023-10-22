import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = (props) => {
  const Navigate = useNavigate('');
  const { orders, setOrders } = props;
  const [amount, setAmount] = useState(0);
  const deleteOrder = (id) => {
    setOrders(orders.filter((elem) => {
      return elem.id !== id;
    }))
  }

  const totalPrice = () => {
    let sum = 0;
    orders.forEach(element => {
      sum = sum + parseInt(element.price);
    });
    return sum;
  }

  useEffect(() => {
    setAmount(totalPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  const createOrderandPay = async () => {
    const { data: { key } } = await axios.get('https://paymentintegration.vercel.app/getKey');
    const { data: { order } } = await axios.post('https://paymentintegration.vercel.app/payment/v1/createOrder', {
      amount
    });

    var options = {
      "key": key,
      "amount": order.amount,
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/117593724?v=4",
      "order_id": order.id,
      "callback_url": "https://paymentintegration.vercel.app/payment/v1/paymentVerify",
      "prefill": {
        "name": "Vinit Patidar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var razor = new window.Razorpay(options);

    razor.open();

  }

  return (
    <>
      {
        orders.length !== 0 ?
          <div className='w-100'>
            <div className='d-flex flex-wrap w-100 justify-content-center'>
              {
                orders.map((elem) => {
                  return <Item key={elem.id} image={elem.image} description={elem.description} price={elem.price} deleteOrder={deleteOrder} category={elem.category} id={elem.id} btn={'Buy'} />
                })
              }
            </div>
            <div className="card w-75 m-auto">
              <div className="card-header text-center">Order Details</div>
              <div className="card-body  d-flex align-items-center flex-column">
                <h5 className="card-title">Total Price: {
                  amount
                }/-
                </h5>
                <div className="d-flex my-3" role="search">
                  <input className="form-control me-2" type="search" placeholder="Apply Coupon Code" aria-label="Search" />
                  <button className="btn btn-success" type="submit">Apply</button>
                </div>
                <button className="btn btn-primary w-100" onClick={createOrderandPay}>Pay Using Razorpay</button>
              </div>
            </div>
          </div>
          :
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '90vh' }}>
            <i className="fa-solid fa-cart-shopping fa-2xl mb-4" style={{color: '#0d6efd'}}></i>
            <h5>Empty Cart</h5>
            <button className="btn btn-primary my-2" onClick={()=>{Navigate('/')}}>Continue Shopping</button>
          </div>
      }
    </>
  )
}

export default Orders