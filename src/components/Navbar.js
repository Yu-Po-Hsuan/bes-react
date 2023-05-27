import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{'backgroundColor': '#e3f2fd'}}>
            <div className="container-fluid">
                <span className="navbar-brand">Battary Exchange System</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/receive-request'>回覆請求</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/send-request'>查看請求</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/map'>地圖</NavLink>
                        </li>
                    </ul>                 
                        <NavLink className="nav-link" to='/login'>
                            <button className="btn btn-outline-success">登出</button>
                        </NavLink>                            
                </div>
            </div>
        </nav>
    )
}

export default Navbar;