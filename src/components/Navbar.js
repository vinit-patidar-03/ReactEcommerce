import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const { orders } = props;

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'cornflowerblue' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand mx-4 fw-bold" to="/" style={{ color: 'white' }}>AtoZ</Link>
                    <div>
                        <ul className='list-unstyled d-flex mb-0'>
                            <li>
                                <Link aria-current="page" to="/" style={{ color: 'white' }}><i className="fa-solid fa-house"></i></Link>
                            </li>
                            <li>
                                <Link to="/orders" className=' ms-5 me-2' style={{ color: 'white' }}><i className="fa-solid fa-cart-shopping"></i><span className={`badge bg-success ${orders.length === 0 ? 'd-none' : ''}`}>{orders.length}</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;