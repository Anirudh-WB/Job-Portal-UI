import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PersonalInfoUtility from "../../utilities/profile/PersonalInfoUtility";
import { Check, SaveAlt, SaveAltSharp } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import PersonalInfoModel from "../../model/profile/PersonalInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import { useEffect, useState } from "react";
import {
  createPersonalInfoAsync,
  getPersonalInfoByUserIdAsync,
} from "../../services/profile/PersonalInfoService";
import { isValidEmailAddress } from "../../common/CommonFunctions";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExperienceInfoUtility from "../../utilities/profile/ExperienceInfoUtility";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";


const ExperienceInfoPage: React.FC<{ loginUserId: number }> = ({ loginUserId }) => {
//const ExperienceInfoPage = () => {
  const utility = ExperienceInfoUtility(loginUserId);

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="companyName"
              name="companyName"
              label="Company Name"
              variant="outlined"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 50 }}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "companyName"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "companyName"
                )
              }
              value={utility.experienceInfo.companyName}
              onChange={utility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                  slotProps={{ textField: { fullWidth: true } }}
                  format="DD/MM/YYYY"
                  label="Start Date"
                  value={dayjs(utility.experienceInfo.startDate)}
                  onChange={(newValue) =>
                    utility.onDateFieldChanged(
                      "startDate",
                      dayjs(newValue).toDate()
                    )
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                disabled = {utility.experienceInfo.isCurrentlyWorking ? true :false}
                  slotProps={{ textField: { fullWidth: true } }}
                  label="End Date"
                  format="DD/MM/YYYY"
                 // value={dayjs(utility.experienceInfo.endDate)}
                 value={utility.experienceInfo.isCurrentlyWorking ? null :dayjs(utility.experienceInfo.endDate)}
                  onChange={(newValue) =>
                    utility.onDateFieldChanged(
                      "endDate",
                      dayjs(newValue).toDate()
                    )
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
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
                value={utility.experienceInfo.designationId.toString()}
                label="Designation"
                onChange={utility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select State</MenuItem>
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

          <Grid item xs={1}>
            <FormControlLabel
              name="isCurrentlyWorking"
              control={
                <Checkbox checked={utility.experienceInfo.isCurrentlyWorking} />
              }
              label="Current Company"
              onChange={utility.onCheckBoxFieldChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              autoComplete="off"
              multiline
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              rows={4}
              helperText={
                utility.errorInfo.find(
                  (error) => error.fieldName === "description"
                )?.errorMessage || ""
              }
              error={
                !!utility.errorInfo.find(
                  (error) => error.fieldName === "description"
                )
              }
              value={utility.experienceInfo.description}
              onChange={utility.onTextAreaChanged}
            />
          </Grid>

          <Grid item xs={6} style={{ textAlign: "left" }}>
            {/* New Button aligned to the left */}
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={utility.onAddExperienceInfo}
            >
              Add New
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            {/* Existing Button aligned to the right */}
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={utility.onExperienceInfoSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Box height={30} />
        <Divider />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Current Company</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {utility.experienceInfos.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.companyName}
                      </TableCell>
                      <TableCell>{dayjs(row.startDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{row.isCurrentlyWorking ? '' : dayjs(row.endDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{row.isCurrentlyWorking == true?  "Yes" : "No"}</TableCell>
                      <TableCell>{row.designationName}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => utility.onExperienceInfoEdit(row.id)}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => utility.onExperienceInfoDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default ExperienceInfoPage;
