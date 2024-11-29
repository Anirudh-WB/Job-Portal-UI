import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import JobSkillUtility from "../../../utilities/job/JobSkillUtility";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//const PreferredSkillPage = () => {
const PreferredSkillPage: React.FC<{ parentJobId: number }> = ({
  parentJobId,
}) => {
  const utility = JobSkillUtility(parentJobId);

  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="careers">
            Add Prefer Skill
          </h2>
        </div>

        {/* Autocomplete Section */}
        <div className="flex flex-col gap-1 w-full">
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            className="w-full"
            options={utility.jobSkill}
            disableCloseOnSelect
            getOptionLabel={(option) => option.skillName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  className="mr-2"
                  checked={selected}
                />
                {option.skillName}
              </li>
            )}
            value={utility.selectedSkills}
            onChange={utility.onSkillChange}
            renderInput={(params) => (
              <TextField
                className="w-full"
                {...params}
                label="Skills"
                placeholder="Add Skills"
              />
            )}
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobSkillSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default PreferredSkillPage;
