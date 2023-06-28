import React from 'react'
import Item from '../components/Item'

const Orders = (props) => {
  const { orders, setOrders } = props;

  let sum = 0;
  const deleteOrder = (id) => {
    setOrders(orders.filter((elem) => {
      return elem.id !== id;
    }))
  }
  return (
    <>
      <div className='d-flex flex-wrap w-100 justify-content-center'>
        {orders.length !== 0 &&
          orders.map((elem) => {
            return <Item key={elem.id} image={elem.image} description={elem.description} price={elem.price} deleteOrder={deleteOrder} category={elem.category} id={elem.id} btn={'Buy'} />
          })
        }
        {
          orders.length === 0 ? <h3 className='my-3'>No Orders Placed</h3> : ''
        }
      </div>
      <div className='w-100'>
        {orders.length && <div className="card w-75 m-auto">
          <div className="card-header text-center">
            Order Details
          </div>
          <div className="card-body  d-flex align-items-center flex-column">
            <h5 className="card-title">Total Price: {
              orders.map((elem, index) => {
                sum = sum + parseInt(elem.price)

                return index === orders.length - 1 && sum;
              })
            }/-</h5>
            <div className="d-flex my-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Apply Coupon Code" aria-label="Search" />
              <button className="btn btn-success" type="submit">Apply</button>
            </div>
            <button className="btn btn-primary w-100">Pay Using UPI</button>
          </div>
        </div>}
      </div>
    </>
  )
}

export default Orders