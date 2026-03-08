import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

const Register = () => {
  
  const [user, setUser] = useState({
    status: "Admin",
  });
  console.log(user);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <div>
        <Link to={"/"}>Back</Link>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="first_name">
              <p>First name</p>
              <input
                type="text"
                name="first_name"
                value={user.first_name || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              <p>Last name</p>
              <input
                type="text"
                name="last_name"
                value={user.last_name || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <p>First name</p>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <p>First name</p>
              <input
                type="password"
                name="password"
                value={user.password || ""}
                onChange={inputHandler}
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
