import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleCred = (value) => {
    return setUserCred((cred) => {
      return { ...cred, ...value };
    });
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signin`,
        userCred,
        { withCredentials: true }
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <h3>User Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userCred.email}
            placeholder="Enter email"
            onChange={(e) => handleCred({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={userCred.password}
            placeholder="Password"
            onChange={(e) => handleCred({ password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div>
        <a href="/forgotPassword">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
