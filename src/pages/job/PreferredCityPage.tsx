import { Alert, Autocomplete, Box, Button, Checkbox, Grid, Snackbar, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import JobCityUtility from "../../utilities/job/JobCityUtility";
import SaveIcon from "@mui/icons-material/Save";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//const PreferredCityPage = () => {
const PreferredCityPage: React.FC<{ parentJobId: number }> = ({ parentJobId }) => {

    const utility = JobCityUtility(parentJobId);
    return (<>
        <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={utility.jobCities}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.cityName}
                        isOptionEqualToValue={(option, value) => option.id === value.id}

                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}

                                />
                                {option.cityName}
                            </li>
                        )}

                        //defaultValue={utility.selectedSkills}
                        value={utility.selectedCities}
                        style={{ width: 500 }}
                        onChange={utility.onCityChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "right" }}>
                    <Button disabled={parentJobId === 0}
                        variant="contained"
                        endIcon={<SaveIcon />}
                        onClick={utility.onJobCitySave}
                     
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

export default PreferredCityPage;