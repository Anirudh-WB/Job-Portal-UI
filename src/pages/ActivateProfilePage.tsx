import React from "react";
import { Link } from "react-router-dom";
import ActivateProfileUtility from "../utilities/ActivateProfileUtility";
import { Bounce, ToastContainer } from "react-toastify";

type Props = {};

const ActivateProfilePage = (props: Props) => {
  const utility = ActivateProfileUtility();

  return (
    <div className="p-10">
      If you are not redirected automatically click on{" "}
      <Link to="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <ToastContainer
        // containerId="company__registration__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default ActivateProfilePage;
