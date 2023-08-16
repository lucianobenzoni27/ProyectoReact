
import CartWidget from "../CartWidget/CartWidget"
import "./NavBar.css";
import benfer from "./assets/benfer.jpg"
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="NavBar">
            <Link to="/">
                <img className="logo" src={benfer} alt="Logo Benfer" />
            </Link>
            <div className="Categories">
                <NavLink to={`/category/collares`} className={({ isActive }) => isActive ? "ActiveOption" : "Option"}>Collares</NavLink>
                <NavLink to={`/category/aros`} className={({ isActive }) => isActive ? "ActiveOption" : "Option"}>Aros</NavLink>
                <NavLink to={`/category/anillos`} className={({ isActive }) => isActive ? "ActiveOption" : "Option"}>Anillos</NavLink>
            </div>
            <CartWidget />
        </nav>
    )
}

export default NavBar