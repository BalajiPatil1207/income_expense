import { useState } from "react";
import { Link } from "react-router-dom";
import { api, storeData } from "../../../services/api";

const LoginPage = () => {
  const [user, setUser] = useState({});

  const inputHandler = () => {};

  const submitHandler = async () => {
    try {
      const res = await api.post("/user/login",user);
      if (res.data && res.data.success) {
        const token = res.data.token || "temp_token";
        const userData = res.data.data;
        storeData(token, userData);
      }
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <p>Password</p>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
