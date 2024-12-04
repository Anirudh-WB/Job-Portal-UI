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
import SaveIcon from "@mui/icons-material/Save";
import AddressInfoUtility from "../../utilities/profile/AddressInfoUtility";
const AddressInfoPage: React.FC<{ loginUserId: number }> = ({
  loginUserId,
}) => {
  //const AddressInfoPage = () => {
  const addressInfoUtility = AddressInfoUtility(loginUserId);
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              autoComplete="off"
              helperText={
                addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "address"
                )?.errorMessage || ""
              }
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "address"
                )
              }
              value={addressInfoUtility.addressInfo.address}
              onChange={addressInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: 6 }}
              helperText={
                addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "postalCode"
                )?.errorMessage || ""
              }
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "postalCode"
                )
              }
              value={addressInfoUtility.addressInfo.postalCode}
              onChange={addressInfoUtility.onTextFieldChanged}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl
              fullWidth
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "countryId"
                )
              }
            >
              <InputLabel id="countryId">Country</InputLabel>
              <Select
                labelId="countryId"
                id="countryId"
                name="countryId"
                value={addressInfoUtility.addressInfo.countryId.toString()}
                label="Country"
                // onChange={addressInfoUtility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select</MenuItem>
                {addressInfoUtility.countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.countryName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "countryId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl
              fullWidth
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "stateId"
                )
              }
            >
              <InputLabel id="stateId">State</InputLabel>
              <Select
                labelId="stateId"
                id="stateId"
                name="stateId"
                value={addressInfoUtility.addressInfo.stateId.toString()}
                label="State"
                // onChange={addressInfoUtility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select</MenuItem>
                {addressInfoUtility.states.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "stateId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl
              fullWidth
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "cityId"
                )
              }
            >
              <InputLabel id="cityId">City</InputLabel>
              <Select
                labelId="cityId"
                id="cityId"
                name="cityId"
                value={addressInfoUtility.addressInfo.cityId.toString()}
                label="City"
                // onChange={addressInfoUtility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select</MenuItem>
                {addressInfoUtility.cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.cityName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "cityId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl
              fullWidth
              error={
                !!addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "trainLineId"
                )
              }
            >
              <InputLabel id="trainLineId">Train Line</InputLabel>
              <Select
                labelId="trainLineId"
                id="trainLineId"
                name="trainLineId"
                value={addressInfoUtility.addressInfo.trainLineId.toString()}
                label="Train Line"
                // onChange={addressInfoUtility.onSelectFieldChanged}
              >
                <MenuItem value={0}>Select Train line</MenuItem>
                {addressInfoUtility.trainLines.map((train) => (
                  <MenuItem key={train.id} value={train.id}>
                    {train.trainLineName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {addressInfoUtility.errorInfo.find(
                  (error) => error.fieldName === "trainLineId"
                )?.errorMessage || ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={addressInfoUtility.onAddressInfoSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={addressInfoUtility.snackbarOpen}
        autoHideDuration={6000}
        onClose={addressInfoUtility.handleSnackbarClose}
        message={addressInfoUtility.snackbarMessage}
        anchorOrigin={addressInfoUtility.snackbarPosition}
      >
        <Alert
          onClose={addressInfoUtility.handleSnackbarClose}
          severity={addressInfoUtility.snackbarSeverity}
        >
          {addressInfoUtility.snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AddressInfoPage;
