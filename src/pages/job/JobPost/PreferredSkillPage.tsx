import JobSkillUtility from "../../../utilities/job/JobSkillUtility";
import Select from "react-select";
import SkillModel from "../../../model/master/SkillModel";
import { Bounce, ToastContainer } from "react-toastify";

const PreferredSkillPage: React.FC<{ parentJobId: number }> = ({
  parentJobId,
}) => {
  const utility = JobSkillUtility(parentJobId);

  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="careers">
            Add Preferred Skill
          </h2>
        </div>

        {/* <div className="flex flex-col gap-1 w-full">
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
      </div> */}

        <div className="flex flex-col gap-1 w-full">
          <Select
            id="skills"
            isMulti
            options={utility.jobSkill}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No skills found"}
            value={utility.selectedSkills}
            getOptionLabel={(option: SkillModel) => option.skillName}
            isOptionSelected={(
              option: SkillModel,
              value: readonly SkillModel[]
            ) => {
              return value.some(
                (selectedOption) => selectedOption.id === option.id
              );
            }}
            onChange={utility.onSkillChange}
            placeholder="Add Skills"
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "rgb(209, 213, 219)",
                boxShadow: "none",
                "&:hover": { borderColor: "rgb(156, 163, 175)" },
                padding: "5px",
              }),
              option: (base, { isSelected }) => ({
                ...base,
                backgroundColor: isSelected ? "rgb(96, 165, 250)" : "white",
                color: isSelected ? "white" : "black",
                cursor: "pointer",
                borderRadius: isSelected ? "5px" : "10px",
              }),
            }}
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobSkillSave}
          >
            Apply
          </button>
        </div>
      </div>
      <ToastContainer
        // containerId="company__registration__toast"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default PreferredSkillPage;
