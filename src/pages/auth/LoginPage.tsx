import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Grid, Snackbar, TextField } from '@mui/material';
import logo from "../images/job.png";
import LoginUtility from '../../utilities/LoginUtility';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const utility = LoginUtility();
    const navigate  =  useNavigate();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="emailAddress"
                                name="emailAddress"
                                label="Email Address"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 100 }}
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "emailAddress"
                                    )?.errorMessage || ""
                                }
                                error={
                                    !!utility.errorInfo.find(
                                        (error) => error.fieldName === "emailAddress"
                                    )
                                }
                                value={utility.login.emailAddress}
                                onChange={utility.onTextFieldChanged}
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
                                helperText={
                                    utility.errorInfo.find(
                                        (error) => error.fieldName === "password"
                                    )?.errorMessage || ""
                                }
                                error={
                                    !!utility.errorInfo.find(
                                        (error) => error.fieldName === "password"
                                    )
                                }
                                value={utility.login.password}
                                onChange={utility.onTextFieldChanged}
                            />
                        </Grid>

                    </Grid>

                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                   
                    <div >
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate("/company-registration");
                            }}
                            sx={{ mr: 2 }}  // Add right margin to create space
                        >
                            Company
                        </Link>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate("/jobseeker-registration");
                            }}
                        >
                            Jobseeker
                        </Link>
                    </div>
                    <div>
                        <Button size="small" variant="contained" onClick={utility.onLogin} sx={{ mr: 1 }}>Login</Button>
                        <Button size="small" variant="contained">Text</Button>
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
    );
}
