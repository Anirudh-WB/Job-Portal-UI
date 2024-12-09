import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/LayoutComponent";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import useGenericHandleFieldChange from "../hooks/useGenericHandleFieldChange";
import MemberUtility from "../utilities/memberUtility";
import { getGendersAsync } from "../services/GenderService";
import GenderModel from "../model/GenderModel";

const MemberPage: React.FC = () => {
  const { member, setMember, errors, setErrors, handleSave } = MemberUtility(); // Use the utility to get member state and setter

  const {
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleDateFieldChange,
  } = useGenericHandleFieldChange({
    state: member,
    setState: setMember,
    setErrors: setErrors,
  });

  const [genders, setGenders] = useState<GenderModel[]>([]);

  useEffect(() => {
    //var genders = await getGendersAsync();
    const getGenders = async () => {
      var genders = await getGendersAsync();
      setGenders(genders);
      // alert(JSON.stringify(genders));
    };
    getGenders();
  }, []);

  return (
    <LayoutComponent>
      <h1>Member</h1>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <TextField
              fullWidth
              name="firstName"
              id="firstName"
              label="First Name"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={member.firstName}
              error={!!errors.firstName}
              helperText={errors.firstName || ""}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <TextField
              fullWidth
              name="lastName"
              id="lastName"
              label="Last Name"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={member.lastName}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <TextField
              fullWidth
              name="emailAddress"
              id="emailAddress"
              label="Email Address"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={member.emailAddress}
              error={!!errors.emailAddress}
              helperText={errors.emailAddress || ""}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <TextField
              fullWidth
              name="mobileNumber"
              id="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={member.mobileNumber}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber || ""}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <TextField
              fullWidth
              name="address"
              id="address"
              label="Address"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={member.address}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            {/* <TextField
              fullWidth
              name="dob"
              id="dob"
              label="Date of birth"
              variant="outlined"
              autoComplete="off"
              onChange={handleInputChange}
              value={formState.dob}
            /> */}
            {/* <DateField
              label="Dash separator"
              // value={value}
              //onChange={(newValue) => setValue(newValue)}
              format="MM-DD-YYYY"
            /> */}

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                  label="DOB"
                  // value={value}
                  //onChange={(newValue) => setValue(newValue)}
                  format="DD/MM/YYYY"
                  value={member.dob}
                  onChange={(newValue) =>
                    handleDateFieldChange("dob", dayjs(newValue))
                  }
                />
              </DemoContainer>
            </LocalizationProvider> */}
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <FormControl fullWidth>
              <InputLabel id="genderId">Gender</InputLabel>
              <Select
                labelId="genderId"
                id="genderId"
                name="genderId"
                value={member.genderId}
                label="Gender"
                onChange={(event) =>
                  handleSelectChange("genderId", event.target.value)
                }
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                {genders.map((gender) => (
                  <MenuItem value={gender.id}>{gender.genderName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <FormControlLabel
              id="isActive"
              name="isActive"
              control={
                <Checkbox
                  checked={member.isActive}
                  onChange={(event) =>
                    handleCheckboxChange("isActive", event.target.checked)
                  }
                />
              }
              label="Is Active"
            />
          </Grid>

          <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
            <Button variant="contained" onClick={handleSave}>
              Contained
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LayoutComponent>
  );
};

export default MemberPage;
