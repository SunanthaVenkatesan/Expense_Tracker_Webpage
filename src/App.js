import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import ExpenseTracker from "./components/ExpenseTracker";
import Auth from "./components/Auth";

import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import { useSelector } from "react-redux";
import Layout from "./components/Header/Layout";
import VerifyEmail from "./components/VerifyEmail";
import ExactPage from "./components/ExactPage";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      <Switch>
      
        <Route path="/" exact >
          {!isAuth && <ExactPage />}
          {isAuth && <Redirect to="/expense-tracker" />}
          </Route>

        {!isAuth && (
          <Route path="/auth" >
            <Auth />
          </Route>
        )}

        <Route path="/expense-tracker">
          {isAuth && <ExpenseTracker />}
          {!isAuth && <Redirect to="/" />}
        </Route>

        <Route path="/update-profile">
          {isAuth && <UpdateProfile />}
          {!isAuth && <Redirect to="/" />}
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword/>
        </Route>

        <Route path="/verify-email">
          {isAuth && <VerifyEmail />}
          {!isAuth && <Redirect to="/" />}
        </Route>
        <Route path='*'>
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
