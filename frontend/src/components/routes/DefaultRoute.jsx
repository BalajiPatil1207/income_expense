import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "../pages/auth/Register";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import IncomeCreate from "../pages/income/IncomeCreate";
import IncomeDetails from "../pages/income/IncomeDetails";
import IncomeUpdate from "../pages/income/IncomeUpdate";
import IncomeIndex from "../pages/income/IncomeIndex";
import ExpenseIndex from "../pages/expense/ExpenseIndex";
import ExpenseCreate from "../pages/expense/ExpenseCreate";
import ExpenseUpdate from "../pages/expense/ExpenseUpdate";
import Profile from "../pages/home/Profile";

const DefaultRoute = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dash");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Routes>

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="dash" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<IncomeIndex />} />
        <Route path="income/create" element={<IncomeCreate />} />
        <Route path="income/details" element={<IncomeDetails />} />
        <Route path="income/edit/:id" element={<IncomeUpdate />} />

        <Route path="expense" element={<ExpenseIndex/>}/>
        <Route path="expense/create" element={<ExpenseCreate/>}/>
        <Route path="expense/edit/:id" element={<ExpenseUpdate/>}/>

        <Route path="profile" element={<Profile/>}/>
      </Route>

      <Route path="*" element={<Navigate to={token ? "/dash" : "/login"} />} />
    </Routes>
  );
};

export default DefaultRoute;
