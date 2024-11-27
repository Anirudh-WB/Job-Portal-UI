import { Alert, Autocomplete, Box, Button, Checkbox, Grid, Snackbar, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import JobSkillUtility from "../../utilities/job/JobSkillUtility";
import SaveIcon from "@mui/icons-material/Save";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//const PreferredSkillPage = () => {
const PreferredSkillPage: React.FC<{ parentJobId: number }> = ({ parentJobId }) => {
    const utility = JobSkillUtility(parentJobId);




    return (<>

        <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={utility.jobSkill}
            disableCloseOnSelect
            getOptionLabel={(option) => option.skillName}
            isOptionEqualToValue={(option, value) => option.id === value.id}

            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                    />
                    {option.skillName}
                </li>
            )}

            //defaultValue={utility.selectedSkills}
            value={utility.selectedSkills}
            style={{ width: 500 }}
            onChange={utility.onSkillChange}
            renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
            )}
        />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "right" }}>
                    <Button
                      disabled={parentJobId === 0}
                        variant="contained"
                        endIcon={<SaveIcon />}
                        onClick={utility.onJobSkillSave}
                     
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

        
    </>);
}

export default PreferredSkillPage;