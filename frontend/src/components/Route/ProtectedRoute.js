import React, {Fragment} from "react";
import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({isAdmin=false}) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {
        loading === false &&
        (isAuthenticated === false || (isAdmin === true && user.role !== "admin"))
        ? <Navigate to="/login" replace={true} /> : <Outlet />
      }
    </Fragment>
  );
}

export default ProtectedRoute;
