import "./App.css";
import {
  Routes, Route
} from "react-router-dom";
import io from "socket.io-client";

import Login from "./Components/Login";
import Register from "./Components/Register";
import JoinChat from "./Components/JoinChat";

import UserContext from "./Context/UserContext";
import useFindUser from "./Hooks/useFindUser";

import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Header from "./Components/Header";
// import { useState } from "react";

const socket=io.connect("http://localhost:4000")

function App() {
  const [user, setUser, loading] = useFindUser();

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      <div>
        <Header />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<JoinChat socket={socket} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/passwordReset" element={<ResetPassword />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            {/* <Route path='/chat' element={<Chat />}/> */}
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
