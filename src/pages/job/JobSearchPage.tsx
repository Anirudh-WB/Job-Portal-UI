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
import { LuBrainCircuit } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { GrUserManager } from "react-icons/gr";
import "../../css/JobSearch.css";
import JobApplicationUtility from "../../utilities/job/JobApplicationUtility";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const JobSearchPage: React.FC = () => {
  console.log("JobSearchPage");
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
    <>
      <div className="p-5 flex flex-col">
        <h1 className="text-2xl font-bold">Search for Jobs</h1>
        <div className="flex flex-col gap-5 p-5 sticky top-0 bg-white z-10">
          <div className="flex gap-5">
            <Autocomplete
              multiple
              id="checkboxes-skill"
              options={skillUtility.jobSkill}
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
              value={utility.selectedSkills}
              style={{ width: 500 }}
              onChange={utility.onSkillChange}
              renderInput={(params) => (
                <TextField {...params} label="Skill" placeholder="Skill" />
              )}
            />
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={cityUtility.jobCities}
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
                <TextField {...params} label="City" placeholder="City" />
              )}
            />
          </div>
          <div className="flex gap-5">
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
          </div>
          <div className="flex">
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={utility.test}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
          {utility.jobSearchResult?.map((job, index) => (
            <div
              key={index}
              className="flex flex-col gap-2.5 bg-white text-sm border shadow p-3 rounded"
            >
              <h2 className="font-semibold text-base">{job.jobTitle}</h2>
              <p dangerouslySetInnerHTML={{ __html: job.jobDescription }}></p>
              <p className="flex gap-2">
                <span className="flex items-center gap-1">
                  <LuBrainCircuit className="text-gray-700" />
                  {job.skills.join(", ")}
                </span>
                |
                <span className="flex items-center gap-1">
                  <GiMoneyStack className="text-gray-700" />
                  {job.minimumSalary} - {job.maximumSalary}
                </span>
                |
                <span className="flex items-center gap-1">
                  <GrUserManager className="text-gray-700" />
                  {job.designationName}
                </span>
              </p>
              <p className="flex gap-2">
                <span className="flex items-center gap-1">
                  <FaMapLocationDot className="text-gray-700" />
                  {job.cities.join(", ")}
                </span>
                |
                <span className="flex items-center gap-1">
                  <HiBuildingOffice2 className="text-gray-700" />
                  {job.companyName}; {job.companyEmailAddress};{" "}
                  {job.companyMobileNo}
                </span>
              </p>
              <button
                className="bg-blue-500 p-2 text-white font-semibold rounded-md shadow hover:bg-blue-700"
                onClick={() => jobApplicationUtility.onApplyJob(job.id)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobSearchPage;
