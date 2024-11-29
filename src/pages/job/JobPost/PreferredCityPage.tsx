import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import JobCityUtility from "../../../utilities/job/JobCityUtility";
import SaveIcon from "@mui/icons-material/Save";
import CityModel from "../../../model/master/CityModel";
import Select from "react-select";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//const PreferredCityPage = () => {
const PreferredCityPage: React.FC<{ parentJobId: number }> = ({
  parentJobId,
}) => {
  const utility = JobCityUtility(parentJobId);
  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="careers">
            Add Preferred Location
          </h2>
        </div>

        {/* Autocomplete Input Section */}
        {/* <div className="flex flex-col gap-1 w-full">
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
            value={utility.selectedCities}
            style={{ width: "100%" }}
            onChange={utility.onCityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                placeholder="Select a city"
              />
            )}
          />
        </div> */}

        <div className="flex flex-col gap-1 w-full">
        <Select
          id="skills"
          isMulti
          options={utility.jobCities}
          closeMenuOnSelect={false}
          value={utility.selectedCities}
          getOptionLabel={(option: CityModel) => option.cityName}
          isOptionSelected={(option: CityModel, value: readonly CityModel[]) => {
            return value.some((selectedOption) => selectedOption.id === option.id);
          }}
          onChange={utility.onCityChange}
          placeholder="Add Location"
          className="w-full"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "rgb(209, 213, 219)", // Tailwind gray-300
              boxShadow: "none",
              "&:hover": { borderColor: "rgb(156, 163, 175)" }, // Tailwind gray-500
              padding: "5px",
            }),
            option: (base, { isSelected }) => ({
              ...base,
              backgroundColor: isSelected ? "rgb(96, 165, 250)" : "white", // Tailwind blue-500
              color: isSelected ? "white" : "black",
              cursor: "pointer",
              borderRadius: isSelected ? "5px" : "10px"
            }),
          }}
        />
      </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobCitySave}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default PreferredCityPage;
