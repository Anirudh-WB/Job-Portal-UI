import React from "react";
import JobSkillUtility from "../../../utilities/job/JobSkillUtility";
import Select from "react-select";
import SkillModel from "../../../model/master/SkillModel";
import { ToastContainer, Bounce } from "react-toastify";

const PreferredSkillPage: React.FC<{ parentJobId: number }> = ({ parentJobId }) => {
  const utility = JobSkillUtility(parentJobId);

  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Add Preferred Skill</h2>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Select
            id="skills"
            isMulti
            options={utility.jobSkill}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No skills found"}
            value={utility.selectedSkills}
            getOptionLabel={(option) => option.skillName}
            getOptionValue={(option) => option.id.toString()}
            onChange={(selected) => utility.onSkillChange(selected as SkillModel[])}
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
      <ToastContainer position="top-right" autoClose={5000} theme="colored" transition={Bounce} />
    </>
  );
};

export default PreferredSkillPage;
