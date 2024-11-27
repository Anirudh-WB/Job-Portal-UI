import { Alert, Button, Card, CardActions, CardContent, Grid, Link, Snackbar, TextField } from "@mui/material";
import JobseekerRegistrationUtility from "../../utilities/auth/JobseekerRegistrationUtility";
import { useNavigate } from "react-router-dom";

const JobseekerRegistration = () => {

    const utility = JobseekerRegistrationUtility();
    const navigate  =  useNavigate();
    return (<>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 500 }}>
                {/* <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={logo}
                /> */}
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.firstName}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "firstName"
                                    )?.errorMessage || ""
                                }
                                error={
                                    utility.errorInfo.find((error) => error.fieldName === "firstName")
                                      ? true
                                      : false
                                  }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.lastName}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "lastName"
                                    )?.errorMessage || ""
                                }
                                error={
                                    utility.errorInfo.find((error) => error.fieldName === "lastName")
                                      ? true
                                      : false
                                  }
                            />

                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                id="emailAddress"
                                name="emailAddress"
                                label="Email Address"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.emailAddress}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "emailAddress"
                                    )?.errorMessage || ""
                                }
                                error={
                                    utility.errorInfo.find((error) => error.fieldName === "emailAddress")
                                      ? true
                                      : false
                                  }
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                id="mobileNo"
                                name="mobileNo"
                                label="Mobile No"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.mobileNo}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "mobileNo"
                                    )?.errorMessage || ""
                                }
                                error={
                                    utility.errorInfo.find((error) => error.fieldName === "mobileNo")
                                      ? true
                                      : false
                                  }
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.password}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "password"
                                    )?.errorMessage || ""
                                }
                                error={
                                    utility.errorInfo.find((error) => error.fieldName === "password")
                                      ? true
                                      : false
                                  }
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                onChange={utility.onTextFieldChange}
                                value={utility.jobseekerRegistration.confirmPassword}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "confirmPassword"
                                    )?.errorMessage || ""
                                }
                                error={
                                    !!utility.errorInfo.find(
                                        (error) => error.fieldName === "confirmPassword"
                                    )
                                }
                            />
                        </Grid>

                    </Grid>

                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <Button size="small" variant="contained" onClick={utility.onJobseekerRegistration} >Registration</Button> */}

                    {/* <div>
                        <Button size="small" variant="contained" onClick={utility.onLogin} sx={{ mr: 1 }}>Login</Button>
                        <Button size="small" variant="contained">Text</Button>
                    </div> */}

<div>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                           Login
                        </Link>
                    </div>
                    <div>
                        <Button size="small" variant="contained" onClick={utility.onJobseekerRegistration} sx={{ mr: 1 }}>Registration</Button>
                      
                    </div>
                </CardActions>

            </Card>
         
          
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
        </div>

    </>);
}

export default JobseekerRegistration;