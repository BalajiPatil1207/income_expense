import { useState } from 'react'
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const IncomeUpdate = () => {
   const [income, setIncome] = useState({});
    const navigate = useNavigate();
  
    const inputHandler = (e) => {
      setIncome({
        ...income,
        [e.target.name]: e.target.value,
      });
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await api.put(`/income/update/${id}`, income);
        navigate("/dash");
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <div>
      <h1>Income</h1>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="userID">
              <p>User ID</p>
              <input
                type="text"
                id="userID"
                name="user_ID"
                required
                value={income.user_ID || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="source">
              <p>Source</p>
              <input
                type="text"
                id="source"
                name="source"
                required
                value={income.source || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="amount">
              <p>Amount</p>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                value={income.amount || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="date">
              <p>Date</p>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={income.date || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="time">
              <p>Time</p>
              <input
                type="time"
                id="time"
                name="time"
                required
                value={income.time || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <button type="submit">Update Income</button>
            <Link to={"/dash"}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IncomeUpdate