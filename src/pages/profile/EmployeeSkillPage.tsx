import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import SkillInfoUtility from "../../utilities/profile/SkillInfoUtility";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeSkillPage: React.FC<{ loginUserId: number }> = ({
  loginUserId,
}) => {
  //const EmployeeSkillPage = () => {
  const utility = SkillInfoUtility(loginUserId);
  //alert(utility.employmentInfo.noticePeriodId.toString());
  // Assuming you have an array of items to render Autocomplete components
  const numberOfAutocompletes = 4; // Change this to the number of Autocomplete components you want to render
  const autoCompleteData = Array.from({ length: numberOfAutocompletes });

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  /// alert(utility.selectedSkillDetails[0]?.expertLevelId.toString())

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <>
            <Grid item xs={6}>
              <Autocomplete
                options={utility.searchSkills}
                getOptionLabel={(option) => option.skillName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    name="skillName"
                    helperText={
                      utility.errorInfo.find(
                        (error) => error.fieldName === "skillName"
                      )?.errorMessage || ""
                    }
                    error={
                      !!utility.errorInfo.find(
                        (error) => error.fieldName === "skillName"
                      )
                    }
                  />
                )}
                onInputChange={utility.onSkillInputChange}
                onChange={utility.onSkillChange()}
                // isOptionEqualToValue={(option, value) => option.id === utility.skillInfo.skillId}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl
                fullWidth
                error={
                  !!utility.errorInfo.find(
                    (error) => error.fieldName === "expertLevelId"
                  )
                }
              >
                <InputLabel id={`expertLevelId`}>Expert Level</InputLabel>
                <Select
                  labelId={`expertLevelId`}
                  id={`expertLevelId`}
                  // value={
                  //   utility.selectedSkillDetails?.expertLevelId.toString() || ""
                  // }
                  name="expertLevelId"
                  value={utility.skillInfo.expertLevelId.toString()}
                  label="Expert Level"
                  onChange={utility.onSelectFieldChanged}
                >
                  <MenuItem value={0}>Select</MenuItem>
                  {utility.exportLevels.map((exportLevel) => (
                    <MenuItem key={exportLevel.id} value={exportLevel.id}>
                      {exportLevel.exportLevelName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {utility.errorInfo.find(
                    (error) => error.fieldName === "expertLevelId"
                  )?.errorMessage || ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={utility.onSkillInfoSave}
              >
                Save
              </Button>
            </Grid>
          </>

          {/* 
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={utility.onSkillInfoSave}
            >
              Save
            </Button>
          </Grid> */}
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
                    <TableCell>Skill</TableCell>
                    <TableCell>Expert level</TableCell>

                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {utility.skillInfoViewModel.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.skillName}
                      </TableCell>

                      <TableCell> {row.expertLevelName}</TableCell>

                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => utility.onSkillInfoDelete(row.id)}
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

export default EmployeeSkillPage;
