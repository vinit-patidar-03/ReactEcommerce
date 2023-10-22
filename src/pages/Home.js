import React, { useState } from 'react'
import Items from '../api/itemsAPI'
import Item from '../components/Item'

const Home = (props) => {
  //Creating Unique list of Categories.
  const uniquelist = [...new Set(Items.map((elem) => {
    return elem.category;
  }))];

  //Managing items using Set State.
  const [items, setItems] = useState(Items);
  const [filter, setFilter] = useState(0);
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(1);

  //Function for Filter Items.
  const filterItems = () => {
    setPage(1);
    if (!price) {
      setItems(Items.filter((elem) => {
        return (elem.category === filter);
      }))
    }
    else if (!filter) {
      setItems(Items.filter((elem) => {
        return (parseInt(elem.price) <= price);
      }))
    }
    else {
      setItems(Items.filter((elem) => {
        return (elem.category === filter) && (parseInt(elem.price) <= price);
      }))
    }
  }

  //Function to Clear Filters.
  const clearfilter = () => {
    setItems(Items);
    setFilter(0)
    setPrice(0)
  }

  const pageHandle = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(items.length / 8) && selectedPage !== page)
      setPage(selectedPage);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'cornflowerblue'}}>
        <div className="container-fluid">
          <select className="form-select" aria-label="Default select example" value={filter} onChange={(event) => {
            setFilter(event.target.value)
          }}>
            <option value={0}>Select Category</option>
            {
              uniquelist.map((elem) => {
                return <option value={elem} key={elem}>{elem}</option>
              })
            }
          </select>
        </div>
        <div className="container-fluid my-2">
          <select className="form-select" aria-label="Default select example" value={price} onChange={(event) => {
            setPrice(event.target.value)
          }}>
            <option value={0}>Select Price Range</option>
            <option value="300">Under 300</option>
            <option value="500">Under 500</option>
            <option value="900">Under 900</option>
            <option value="800">Under 800</option>
            <option value="2000">Under 2000</option>
          </select>
        </div>
        <button className="btn btn-success mx-2 my-2" disabled={(filter === 0 && price === 0) ? true : false} onClick={filterItems}>Filter</button>
        <button className="btn btn-success mx-2 my-2" disabled={(filter === 0 && price === 0) ? true : false} onClick={clearfilter}>clear</button>
      </nav>
      <div className='d-flex flex-wrap w-100 justify-content-center'>
        {items.slice(page * 8 - 8, page * 8).map((elem) => {
          return <Item key={elem.id} image={elem.image} description={elem.description} setOrders={props.setOrders} orders={props.orders} price={elem.price} category={elem.category} id={elem.id} btn={'Order Now'} />;
        })}
        {items.length > 0 ? '' : <h3>No items Exist with Provided Filter</h3>}
      </div>
      {
        items&&
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item page-link" onClick={() => { pageHandle(page - 1) }} >
              <span aria-hidden="true" style={{ cursor: 'pointer' }}>&laquo;</span>
            </li>
            {
              [...Array(Math.ceil(items.length / 8))].map((_, i) => {
                return <li className="page-item page-link" key={i + 1} style={{ cursor: 'pointer', backgroundColor: `${page === (i + 1) ? '#0d6efd' : ''}`, color: `${page !== (i + 1) ? '#0d6efd' : 'white'}` }} onClick={() => { pageHandle(i + 1) }}>{i + 1}</li>;
              })
            }
            <li className="page-item page-link" style={{ cursor: 'pointer' }} onClick={() => { pageHandle(page + 1) }}>
              <span aria-hidden="true">&raquo;</span>
            </li>
          </ul>
        </nav>
      }
    </>
  );
}

export default Home