import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from "../../store/redux";
import Auth from "../Auth";
const Header = () => {
  const isAuth=useSelector(state=>(state.auth.isAuthenticated))
  const dispatch=useDispatch()
  const history = useHistory();
  const logoutClickHandler = (event) => {
     localStorage.removeItem("token");
    // // <Redirect to="/login" />
   
    event.preventDefault()
    dispatch(authActions.logout())
    history.replace("/auth");
  };
 
  return (
    <header className={classes.header}>
      <h1>Expense Tracker</h1>
     { isAuth && <h3 className={classes.h3}><Link to="/expense-tracker">Expense Details</Link></h3>}
  
      <nav>
        <ul>
        
        
          {isAuth && <li>
            <button onClick={logoutClickHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
