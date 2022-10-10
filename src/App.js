import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authActions } from "./Store/authSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "./Context/AuthContext";
function App() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (user) {
      dispatch(authActions.login({ user: user }));
    }
  }, [user, dispatch]);
  return (
    <div className="h-screen bg-cyan-900 flex justify-center items-center  py-20">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/" element={<Signup />} />
          <Route path="/user" element={isLoggedIn && "hi"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
