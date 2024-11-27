import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { getSessionValue } from "../../utilities/SessionStorageUtility";

interface RoleProps {
  //role: string | null;
  allowedRoles: string[];
}

const PrivateRoutes: React.FC<RoleProps> = ({  allowedRoles = [] }) => {

  const auth = { token: true }; // Using token from localStorage
  //const storedRole = localStorage.getItem('userRole');
  const storedRole: string = getSessionValue("userRole") ?? "";
 //alert(JSON.stringify(auth));

  if (!auth.token || storedRole === null || !allowedRoles.some(allowedRole => allowedRole === storedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }


  return <Outlet />;
};

export default PrivateRoutes;
