import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";
import React, { useState } from "react";
import "../../css/Richtexteditor.css";
import SaveIcon from "@mui/icons-material/Save";
import JobInfoUtility from "../../utilities/job/JobInfoUtility";

/*
interface JobInfoProps {
    parentJobId: number;
    onUpdateJobId: (newJobId: number) => void;
}
*/
const JobInfoPage: React.FC<{
  parentJobId: number;
  onUpdateJobId: (newJobId: number) => void;
}> = ({ parentJobId, onUpdateJobId }) => {
  const utility = JobInfoUtility(parentJobId, onUpdateJobId);
  const [editorContent, setEditorContent] = useState("");

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              fullWidth
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              variant="outlined"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 200 }}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "jobTitle"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "jobTitle"
                )
              }
              value={utility.jobInfo.jobTitle}
              onChange={utility.onTextFieldChanged}
            />
          </Grid>

          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <TextField
              type="number"
              fullWidth
              id="minimumSalary"
              name="minimumSalary"
              label="Minimum  Salary"
              variant="outlined"
              inputProps={{ maxLength: 200 }}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "minimumSalary"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "minimumSalary"
                )
              }
              value={utility.jobInfo.minimumSalary}
              onChange={utility.onTextFieldChanged}
            />
          </Grid>

          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <TextField
              fullWidth
              id="maximumSalary"
              name="maximumSalary"
              label="Maximum  Salary"
              variant="outlined"
              inputProps={{ maxLength: 200 }}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "maximumSalary"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "maximumSalary"
                )
              }
              value={utility.jobInfo.maximumSalary}
              onChange={utility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <FormControl
              fullWidth
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "designationId"
                )
              }
            >
              <InputLabel id="designationId">Designation</InputLabel>
              <Select
                labelId="designationId"
                id="designationId"
                name="designationId"
                value={utility.jobInfo.designationId.toString()}
                label="Designation"
                onChange={utility.onSelectFieldChanged}
              >
                {utility.designations.map((designation) => (
                  <MenuItem key={designation.id} value={designation.id}>
                    {designation.designationName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {utility.errorInfo.find(
                  (error) => error.fieldName === "designationId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <FormControl
              fullWidth
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "trainLineId"
                )
              }
            >
              <InputLabel id="trainLineId">Train Line</InputLabel>
              <Select
                labelId="trainLineId"
                id="trainLineId"
                name="trainLineId"
                value={utility.jobInfo.trainLineId.toString()}
                label="Train Line"
                onChange={utility.onSelectFieldChanged}
              >
                {utility.trainLines.map((trainLine) => (
                  <MenuItem key={trainLine.id} value={trainLine.id}>
                    {trainLine.trainLineName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {utility.errorInfo.find(
                  (error) => error.fieldName === "trainLineId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RichTextEditorProvider editor={utility.editor}>
              <RichTextField
                controls={
                  <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    {/* Add more controls of your choosing here */}
                  </MenuControlsContainer>
                }
              />
            </RichTextEditorProvider>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={utility.onJobInfoSave}
              // onClick={() => {
              //     const tempUtility = await utility.onJobInfoSave()
              //         .then((d) => {
              //             onUpdateJobId(utility.jobInfo.id)
              //         });
              // }}
              // onClick={async () => {
              //     const tempUtility = await utility.onJobInfoSave();
              //     onUpdateJobId(utility.jobInfo.id);
              // }}
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
        anchorOrigin={utility.snackbarPosition}
      >
        <Alert
          onClose={utility.handleSnackbarClose}
          severity={utility.snackbarSeverity}
        >
          {utility.snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobInfoPage;
