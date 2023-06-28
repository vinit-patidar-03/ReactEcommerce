import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const {orders} = props;

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor:'cornflowerblue',fontFamily:'Belanosima'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand mx-4" to="/"  style={{color:'white'}}>AtoZ</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mx-4 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/"  style={{color:'white'}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders"  style={{color:'white'}}>Orders<span className={`badge bg-success ${orders.length===0?'d-none':''}`}>{orders.length}</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;