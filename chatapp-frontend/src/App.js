import {
  Routes, Route
} from "react-router-dom";
import io from "socket.io-client";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Chat from "./Components/Chat";

import UserContext from "./Context/UserContext";
import useFindUser from "./Hooks/useFindUser";

import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
// import { useState } from "react";

const socket=io.connect("http://localhost:4000")

function App() {
  const [user, setUser, loading] = useFindUser();
 
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      <div className="App">
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            {/* <Route path="/chat" element={<Chat />} /> */}
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
