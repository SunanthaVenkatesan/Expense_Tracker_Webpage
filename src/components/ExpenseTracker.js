import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { expenseActions, themeActions } from "../store/redux/index";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import classes from "./ExpenseTracker.module.css";

const ExpenseTracker = () => {
  const [error, setError] = useState();
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  const dispatchExpenses = useSelector((state) => state.expense);

  const currentTheme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const history = useHistory();

  const enteredAmountInputRef = useRef();
  const enteredDescriptionInputRef = useRef();
  const selectedCategoryRef = useRef();

  const getExpenseData = () => {
    axios
      .get(`https://react-http-ba0c5-default-rtdb.firebaseio.com/expense.json`)
      .then((res) => {
        const data = res.data;

        let sumOfExpense = 0;

        Object.values(data).forEach((item) => {
          sumOfExpense += Number(item.amount);
        });

        console.log(sumOfExpense);
        setTotalExpense(sumOfExpense);
        dispatch(expenseActions.onAddOrGetExpense(data));
      });
  };
  useEffect(
    getExpenseData,

    [dispatch]
  );

  const onAddExpenseClickHandler = async () => {
    const enteredAmount = enteredAmountInputRef.current.value;
    const enteredDescription = enteredDescriptionInputRef.current.value;
    const selectdCategory = selectedCategoryRef.current.value;

    const expenseObj = {
      amount: enteredAmount,
      description: enteredDescription,
      category: selectdCategory,
    };

    try {
      const response = await axios.post(
        `https://react-http-ba0c5-default-rtdb.firebaseio.com/expense.json`,
        expenseObj
      );

      getExpenseData();
    } catch (error) {
      console.log(error);
    }
    enteredAmountInputRef.current.value = "";
    enteredDescriptionInputRef.current.value = "";
    selectedCategoryRef.current.value = "";
  };

  const onExpenseDeleteClickHandler = async (expenseId) => {
    alert("Are you sure in deleting the expense?");
    try {
      const response = await axios.delete(
        `https://react-http-ba0c5-default-rtdb.firebaseio.com//expense/${expenseId}.json`
      );
      getExpenseData();

      console.log(response);

      const expensesTemp = { ...expenses };

      delete expensesTemp[expenseId];

      setExpenses(expensesTemp);

      alert("Expense Successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const onEditExpenseClickHandler = async (expenseId) => {
    console.log(dispatchExpenses.expenses[expenseId].expenseId);
    enteredAmountInputRef.current.value =
      dispatchExpenses.expenses[expenseId].amount;
    enteredDescriptionInputRef.current.value =
      dispatchExpenses.expenses[expenseId].description;
    selectedCategoryRef.current.value =
      dispatchExpenses.expenses[expenseId].category;

    const expenseObj = {
      amount: enteredAmountInputRef.current.value,
      description: enteredDescriptionInputRef.current.value,
      category: selectedCategoryRef.current.value,
    };

    try {
      const response = await axios.put(
        `https://react-http-ba0c5-default-rtdb.firebaseio.com//expense/${expenseId}.json`,
        expenseObj
      );
      //getExpenseData();

      console.log(response.data);

      //   delete expensesTemp[expenseId];

      //   setExpenses(expensesTemp);

      //   //alert("Expense Successfully deleted");
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.delete(
        `https://react-http-ba0c5-default-rtdb.firebaseio.com//expense/${expenseId}.json`
      );
      getExpenseData();

      console.log(response);

      const expensesTemp = { ...expenses };

      delete expensesTemp[expenseId];

      setExpenses(expensesTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const onVerifyEmailClickHandler = (event) => {
    event.preventDefault();
    console.log(`inside verify email`);
    history.replace("/verify-email");

    <Redirect to="/verify-email" />;
  };

  const onDownloadClickHandler = () => {
    const csv = Object.entries(dispatchExpenses.expenses).map((expense) => {
      // return ["Col1", "Col2", "Col3"]
      console.log(expense[1].amount);
      return [expense[1].amount, expense[1].description, expense[1].category];
    });

    console.log(csv);
    const makeCSV = (rows) => {
      return rows.map((r) => r.join(",")).join("\n");
    };

    const blob1 = new Blob([makeCSV(csv)]);

    const temp = URL.createObjectURL(blob1);
    saveAs(temp, "expenses.txt");
  };

  return (
    <div style={{ backgroundColor: currentTheme.darkTheme ? "grey" : null }}>
      <section className={classes.starting}>
        <h1>Welcome to Expense Tracker</h1>

        <button className={classes.button} onClick={onVerifyEmailClickHandler}>
          Verify Email-Id
        </button>

        <p>
          Your profile is incomplete!
          <Link style={{ textDecoration: "none" }} to="/update-profile">
            Complete Now
          </Link>{" "}
        </p>
      </section>
      {error === "INVALID_ID_TOKEN" && (
        <p>
          The user's credential is no longer valid. The user must sign in again.
        </p>
      )}
      {error === "USER_NOT_FOUND" && (
        <p>
          There is no user record corresponding to this identifier. The user may
          have been deleted.
        </p>
      )}

      <section className={classes.expense}>
        <div className={classes.control}>
          <span>Amount: </span>
          <input type="number" ref={enteredAmountInputRef} required />
          <br />

          <span>Description</span>
          <input type="text" ref={enteredDescriptionInputRef} />
          <br />
          <span>Category: </span>
          <select ref={selectedCategoryRef} placeholder="select category">
            <option>Food</option>
            <option>Petrol</option>
            <option>Movie</option>
          </select>
        </div>

        <div className={classes.actions}>
          <button onClick={onAddExpenseClickHandler}>Add Expense</button>
        </div>
      </section>

      {totalExpense > 10000 && (
        <div className={classes.actions}>
          <button onClick={() => dispatch(themeActions.onThemeChange())}>
            Activate Premium
          </button>
        </div>
      )}
      <div className={classes.actions}>
        <button onClick={onDownloadClickHandler} download>
          Download
        </button>
      </div>
      <div>
        <ul>
          {Object.keys(dispatchExpenses.expenses).map((expense) => {
            return (
              <section className={classes.expenselist}>
                <li className={classes.list} key={expense}>
                  <h3>
                    {dispatchExpenses.expenses[expense].amount}---
                    {dispatchExpenses.expenses[expense].description}---
                    {dispatchExpenses.expenses[expense].category}
                    <button
                      style={{ margin: ".75rem" }}
                      onClick={() => onExpenseDeleteClickHandler(expense)}
                    >
                      Delete
                    </button>
                    <button onClick={() => onEditExpenseClickHandler(expense)}>
                      Edit
                    </button>
                  </h3>
                </li>
              </section>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
