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
        <div className="flex flex-col gap-1 w-full">
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
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobCitySave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default PreferredCityPage;
