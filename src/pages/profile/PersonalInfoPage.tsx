import { Alert, Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import PersonalInfoUtility from "../../utilities/profile/PersonalInfoUtility";
import { SaveAlt, SaveAltSharp } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { useEffect, useState } from "react";
import {
  createPersonalInfoAsync,
  getPersonalInfoByUserIdAsync,
} from "../../services/profile/PersonalInfoService";
import { isValidEmailAddress } from "../../common/CommonFunctions";


const PersonalInfoPage: React.FC<{ loginUserId: number }> = ({ loginUserId }) => {
  const personalInfoUtility = PersonalInfoUtility(loginUserId);
 // alert(loginUserId);
 
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 50 }}
              helperText={
                personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "firstName"
                )?.errorMessage || ""
              }
              error={
                !!personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "firstName"
                )
              }
              value={personalInfoUtility.personalInfo.firstName}
              onChange={personalInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              autoComplete="off"
              value={personalInfoUtility.personalInfo.lastName || ""}
              onChange={personalInfoUtility.onTextFieldChanged}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              variant="outlined"
              autoComplete="off"
              value={personalInfoUtility.personalInfo.emailAddress || ""}
              onChange={personalInfoUtility.onTextFieldChanged}
              helperText={
                personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "emailAddress"
                )?.errorMessage || ""
              }
              error={
                !!personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "emailAddress"
                )
              }
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile No"
              variant="outlined"
              value={personalInfoUtility.personalInfo.mobileNumber || ""}
              onChange={personalInfoUtility.onTextFieldChanged}
              helperText={
                personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "mobileNumber"
                )?.errorMessage || ""
              }
              error={
                !!personalInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "mobileNumber"
                )
              }
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Describe your self"
              variant="outlined"
              multiline
              rows={4}
              value={personalInfoUtility.personalInfo.description || ""}
              onChange={personalInfoUtility.onTextFieldChanged}
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={personalInfoUtility.onPersonalInfoSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={personalInfoUtility.snackbarOpen}
        autoHideDuration={6000}
        onClose={personalInfoUtility.handleSnackbarClose}
        message={personalInfoUtility.snackbarMessage}
        anchorOrigin={personalInfoUtility.snackbarPosition}>
        <Alert onClose={personalInfoUtility.handleSnackbarClose} severity={personalInfoUtility.snackbarSeverity}>
        {personalInfoUtility.snackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
};

export default PersonalInfoPage;
