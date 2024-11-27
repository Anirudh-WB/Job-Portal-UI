import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
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
import EmploymentInfoUtility from "../../utilities/profile/EmploymentInfoUtility";

const EmploymentInfoPage: React.FC<{ loginUserId: number }> = ({ loginUserId }) => {
//const EmploymentInfoPage = () => {
  const utility= EmploymentInfoUtility(loginUserId);
 //alert(utility.employmentInfo.noticePeriodId.toString());
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="currentCTC"
              name="currentCTC"
              label="Current CTC"
              variant="outlined"
              autoComplete="off"
              type="number"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 10 }}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "currentCTC"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "currentCTC"
                )
              }
              value={utility.employmentInfo.currentCTC}
              onChange={utility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="expectedCTC"
              name="expectedCTC"
              label="Expected CTC"
              variant="outlined"
              autoComplete="off"
              type="number"
              value={utility.employmentInfo.expectedCTC || ""}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "expectedCTC"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "expectedCTC"
                )
              }
          
              onChange={utility.onTextFieldChanged}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={3}>
          <FormControl
              fullWidth
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "noticePeriodId"
                )
              }
            >
              <InputLabel id="noticePeriodId">Notice Period</InputLabel>
              <Select
                labelId="noticePeriodId"
                id="noticePeriodId"
                name="noticePeriodId"
                value={utility.employmentInfo.noticePeriodId.toString()}
                label="Notice Period"
                onChange={utility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select State</MenuItem>
                {utility.noticePeriods.map((noticePeriod) => (
                  <MenuItem key={noticePeriod.id} value={noticePeriod.id}>
                    {noticePeriod.noticePeriodName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {utility.errorInfo.find(
                  (error) => error.fieldName === "noticePeriodId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={utility.onEmploymentInfoSave}
            >
              Save
            </Button>
          </Grid>
       
        </Grid>
      </Box>
      <Snackbar
        open={utility.snackbarOpen}
        autoHideDuration={6000}
        onClose={utility.handleSnackbarClose}
        message={utility.snackbarMessage}
        anchorOrigin={utility.snackbarPosition}>
        <Alert onClose={utility.handleSnackbarClose} severity={utility.snackbarSeverity}>
        {utility.snackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
};

export default EmploymentInfoPage;
