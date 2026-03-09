import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "../pages/auth/Register";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import Home from "../pages/home/Home";
import IncomeCreate from "../pages/income/IncomeCreate";

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
        <Route path="home" element={<Home />} />
        <Route path="income/create" element={<IncomeCreate />} />
        <Route path="expense/create" element={<Home />} />

      </Route>

      <Route path="*" element={<Navigate to={token ? "/private" : "/login"} />} />
    </Routes>
  );
};

export default DefaultRoute;
