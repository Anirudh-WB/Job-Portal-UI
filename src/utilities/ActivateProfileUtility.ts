import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivateProfileAsync } from "../services/auth/ActivationService";
import { Bounce, toast } from "react-toastify";

const ActivateProfileUtility = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivateAccount = async (token: string) => {
      const response = await ActivateProfileAsync(token);

      if (response.status === 200) {
        toast.success(response.message, {
          draggable: true,
          closeOnClick: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error(response.message, {
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    };

    if (token) {
      fetchActivateAccount(token);
    }
  }, [token]);

  return;
};

export default ActivateProfileUtility;
