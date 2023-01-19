import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [userCred, setUserCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
    const handleCred = value => {
        return setUserCred(cred => {
            return { ...cred, ...value }
        })
    }

    
const handleLogin = async (event) => {
    try {
        event.preventDefault();
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`,{...userCred},{withCredentials:true})
      if (response) {
        navigate('/chat');
    }
    } catch (error) {
        console.log('Error: ', error);
    }
    }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={userCred.email}
            onChange={(e) => handleCred({ email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={userCred.password}
            onChange={(e) => handleCred({ password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
