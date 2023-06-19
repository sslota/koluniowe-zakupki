import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ element: Element }) => {
  const isAuth = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate])

  if (!isAuth) {
    return null;
  }

  return <Element />;
};

export default AuthGuard;
