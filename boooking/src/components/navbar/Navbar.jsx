import { useContext } from "react"
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contex/authContex"
export const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)
  const handlelogout = (e) => {
    e.preventDefault();

    dispatch({ type: "logout" });
    navigate('/login')
  }
  //data.preventDefault();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}><label className="logo">
          Boookit.
        </label></Link>

        {!user ? <div className="navItems">
          <button onClick={() => navigate('/register')} className="navButton">Register</button>
          <button onClick={() => navigate('/login')} className="navButton">Login</button>
        </div> : <><span style={{ fontSize: '26px' }}>{user.username}</span><button onClick={handlelogout} className="logoutButton">Logout</button></>}
      </div>
    </div>
  )
}
