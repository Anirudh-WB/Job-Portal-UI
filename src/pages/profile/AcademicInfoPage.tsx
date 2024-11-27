import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
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
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//const AcademicInfoPage = () => {
const AcademicInfoPage: React.FC<{ loginUserId: number }> = ({
  loginUserId,
}) => {
  const academicInfoUtility = AcademicInfoUtility(loginUserId);

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="institutionName"
              name="institutionName"
              label="Institution Name"
              variant="outlined"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 50 }}
              helperText={
                academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "institutionName"
                )?.errorMessage || ""
              }
              error={
                !!academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "institutionName"
                )
              }
              value={academicInfoUtility.academicInfo.institutionName}
              onChange={academicInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="degree"
              name="degree"
              label="Degree"
              variant="outlined"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 50 }}
              helperText={
                academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "degree"
                )?.errorMessage || ""
              }
              error={
                !!academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "degree"
                )
              }
              value={academicInfoUtility.academicInfo.degree}
              onChange={academicInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="startYear"
              name="startYear"
              label="Start Year"
              variant="outlined"
              autoComplete="off"
              type="number"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 4 }}
              helperText={
                academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "startYear"
                )?.errorMessage || ""
              }
              error={
                !!academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "startYear"
                )
              }
              value={academicInfoUtility.academicInfo.startYear}
              onChange={academicInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="endYear"
              name="endYear"
              label="End Year"
              variant="outlined"
              type="number"
              autoComplete="off"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 4 }}
              helperText={
                academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "endYear"
                )?.errorMessage || ""
              }
              error={
                !!academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "endYear"
                )
              }
              value={academicInfoUtility.academicInfo.endYear}
              onChange={academicInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="percentage"
              name="percentage"
              label="Percentage"
              variant="outlined"
              autoComplete="off"
              type="number"
              //InputLabelProps={{ shrink: personalInfoUtility.personalInfo.firstName !==""? true:false }}
              inputProps={{ maxLength: 5 }}
              helperText={
                academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "percentage"
                )?.errorMessage || ""
              }
              error={
                !!academicInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "percentage"
                )
              }
              value={academicInfoUtility.academicInfo.percentage}
              onChange={academicInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={6} style={{ textAlign: "left" }}>
            {/* New Button aligned to the left */}
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={academicInfoUtility.onAddAcademicInfo}
            >
              Add New
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            {/* Existing Button aligned to the right */}
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={academicInfoUtility.onAcademicInfoSave}
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
                    <TableCell>Institution Name</TableCell>
                    <TableCell>Degree</TableCell>
                    <TableCell>Start Year</TableCell>
                    <TableCell>End Year</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {academicInfoUtility.academicInfos.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.institutionName}
                      </TableCell>
                      <TableCell>{row.degree}</TableCell>
                      <TableCell>{row.startYear}</TableCell>
                      <TableCell>{row.endYear}</TableCell>
                      <TableCell>{row.percentage}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            academicInfoUtility.onAcademicInfoEdit(row.id)
                          }
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            academicInfoUtility.onAcademicInfoDelete(row.id)
                          }
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
        open={academicInfoUtility.snackbarOpen}
        autoHideDuration={6000}
        onClose={academicInfoUtility.handleSnackbarClose}
        message={academicInfoUtility.snackbarMessage}
        anchorOrigin={academicInfoUtility.snackbarPosition}
      >
        <Alert
          onClose={academicInfoUtility.handleSnackbarClose}
          severity={academicInfoUtility.snackbarSeverity}
        >
          {academicInfoUtility.snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AcademicInfoPage;
