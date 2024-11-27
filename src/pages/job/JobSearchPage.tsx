import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LayoutComponent from "../../components/LayoutComponent";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SkillUtility from "../../utilities/master/SkillUtility";
import JobSearchUtility from "../../utilities/job/JobSearchUtility";
import CityUtility from "../../utilities/master/CityUtility";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DesignationUtility from "../../utilities/master/DesignationUtility";
import TrainLineUtility from "../../utilities/master/TrainLineUtility";
import SaveIcon from "@mui/icons-material/Save";
import "../../css/JobSearch.css";
import JobApplicationUtility from "../../utilities/job/JobApplicationUtility";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const JobSearchPage: React.FC = () => {
  const skillUtility = SkillUtility();
  const cityUtility = CityUtility();
  const designationUtility = DesignationUtility();
  const trainLineUtility = TrainLineUtility();
  const utility = JobSearchUtility();
  const jobApplicationRequest: JobApplicationRequest = {
    jobId: 0,
  };
  const jobApplicationUtility = JobApplicationUtility(jobApplicationRequest);

  return (
    <LayoutComponent>
      <h3 style={{ marginBottom: "0px" }}>Job Search Page</h3>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Search</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    multiple
                    id="checkboxes-skill"
                    options={skillUtility.jobSkill}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.skillName}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
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
                    value={utility.selectedSkills}
                    style={{ width: 500 }}
                    onChange={utility.onSkillChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skill"
                        placeholder="Skill"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={cityUtility.jobCities}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.cityName}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
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
                      <TextField {...params} label="City" placeholder="City" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="designationId">Designation</InputLabel>
                    <Select
                      labelId="designationId"
                      id="designationId"
                      name="designationId"
                      value={utility.jobSearchField.designationId.toString()}
                      label="Designation"
                      onChange={utility.onSelectFieldChanged}
                    >
                      <MenuItem key={0} value={0}>
                        Designation
                      </MenuItem>

                      {designationUtility.designations.map((designation) => (
                        <MenuItem key={designation.id} value={designation.id}>
                          {designation.designationName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="experienceId">Experience</InputLabel>
                    <Select
                      labelId="experienceId"
                      id="experienceId"
                      name="experienceId"
                      value={utility.jobSearchField.experienceId.toString()}
                      label="Designation"
                      onChange={utility.onSelectFieldChanged}
                    >
                      <MenuItem key={0} value={0}>
                        Experience
                      </MenuItem>
                      {utility.experiances.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <InputLabel id="trainLineId">Train Line</InputLabel>
                    <Select
                      labelId="trainLineId"
                      id="trainLineId"
                      name="trainLineId"
                      value={utility.jobSearchField.trainLineId.toString()}
                      label="Train Line"
                      onChange={utility.onSelectFieldChanged}
                    >
                      <MenuItem key={0} value={0}>
                        Train Line
                      </MenuItem>
                      {trainLineUtility.trainLines.map((trainLine) => (
                        <MenuItem key={trainLine.id} value={trainLine.id}>
                          {trainLine.trainLineName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon />}
                    onClick={utility.test}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

        {utility.jobSearchResult?.map((job, index) => (
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {job.jobTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                    ></div>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    {job.skills.toString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    {job.cities.toString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    Salary : {job.minimumSalary} To {job.maximumSalary}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    Designation : {job.designationName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 10, width: "90%" }}
                  >
                    Company Name : {job.companyName} {job.companyEmailAddress}{" "}
                    {job.companyMobileNo}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => jobApplicationUtility.onApplyJob(job.id)}
                  >
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    </LayoutComponent>
  );
};

export default JobSearchPage;
