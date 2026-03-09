import { ArrowLeft, Link } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { useEffect } from "react";

const ExpenseIndex = () => {
  const [expense, setExpense] = useState([]);

  const fetchExpense = async () => {
      try {
        const res = await api.get("/expense");
        setExpense(res.data.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

  const deleteHandler = async (id) =>{
    try {
      await api.get(`expense/delete/${id}`);
      fetchExpense();
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    fetchExpense();
  });

  return (
    <div>
      <h1>Expense details</h1>
      <Link to={"/dash"}>
        <ArrowLeft />
      </Link>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Source</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expense.map((exp, idx) => (
              <tr key={exp.expense_id}>
                <td>{idx + 1}</td>
                <td>{exp.source}</td>
                <td>{exp.amount}</td>
                <td>{exp.date}</td>
                <td>{exp.time}</td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/dash/income/edit/${exp.expense_id}`}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(exp.expense_id)}
                      className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseIndex;
