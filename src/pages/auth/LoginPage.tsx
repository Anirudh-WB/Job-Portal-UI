import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Snackbar, TextField } from "@mui/material";
import logo from "../images/job.png";
import LoginUtility from "../../utilities/LoginUtility";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import LoginInfo from "./LoginInfo";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const utility = LoginUtility();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center px-40 py-10">
        <LoginInfo />
        <LoginForm />
      </div>
    </>
  );
}
