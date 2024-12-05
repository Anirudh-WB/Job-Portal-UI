import React from "react";
import Select from "react-select";
import SkillUtility from "../../utilities/master/SkillUtility";
import JobSearchUtility from "../../utilities/job/JobSearchUtility";
import CityUtility from "../../utilities/master/CityUtility";
import DesignationUtility from "../../utilities/master/DesignationUtility";
import TrainLineUtility from "../../utilities/master/TrainLineUtility";
import JobCard from "./JobCard";
import "../../css/JobSearch.css";
import SkillModel from "../../model/master/SkillModel";
import CityModel from "../../model/CityModel";
import TrainLineModel from "../../model/TrainLineModel";

const JobSearchPage: React.FC = () => {
  const skillUtility = SkillUtility();
  const cityUtility = CityUtility();
  const designationUtility = DesignationUtility();
  const trainLineUtility = TrainLineUtility();
  const utility = JobSearchUtility();

  const selectStyles = {
    multiValueLabel: (base: any) => ({
      ...base,
      borderRadius: "999px",
    }),
    control: (base: any) => ({
      ...base,
      borderColor: "rgb(209, 213, 219)",
      boxShadow: "none",
      "&:hover": { borderColor: "rgb(156, 163, 175)" },
      padding: "5px",
    }),
    option: (base: any, { isSelected }: any) => ({
      ...base,
      backgroundColor: isSelected ? "rgb(96, 165, 250)" : "white",
      color: isSelected ? "white" : "black",
      cursor: "pointer",
      borderRadius: isSelected ? "5px" : "10px",
    }),
  };

  return (
    <div className="p-5 flex flex-col">
      {/* Search Filters Section */}
      <div className="flex flex-col gap-5 p-5 sticky top-0 bg-white z-10">
        <div className="flex gap-5">
          {/* Skills Multi-Select */}
          <Select
            id="skills"
            isMulti
            options={skillUtility.jobSkill}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No skills found"}
            value={utility.selectedSkills}
            getOptionLabel={(option) => option.skillName}
            getOptionValue={(option) => option.id.toString()}
            onChange={(selected) =>
              utility.onSkillChange(selected as SkillModel[])
            }
            placeholder="Add Skills..."
            className="w-full"
            styles={selectStyles}
          />

          {/* Cities Multi-Select */}
          <Select
            id="cities"
            isMulti
            options={cityUtility.jobCities}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No cities found"}
            value={utility.selectedCities}
            getOptionLabel={(option) => option.cityName}
            getOptionValue={(option) => option.id.toString()}
            onChange={(selected) =>
              utility.onCityChange(selected as CityModel[])
            }
            placeholder="Add City..."
            className="w-full"
            styles={selectStyles}
          />
        </div>

        <div className="flex gap-5">
          {/* Designation Dropdown */}
          <div className="w-full">
            <select
              id="designationId"
              name="designationId"
              value={utility.jobSearchField.designationId} // Bind to selected designation
              className="w-full px-2 py-2.5 border border-gray-300 bg-white text-gray-500 rounded-sm text-base"
              onChange={(e) => utility.onSelectFieldChanged(e)}
            >
              <option value="0" disabled>
                Select Designation...
              </option>
              {designationUtility.designations.map((designation) => (
                <option
                  key={designation.id}
                  value={designation.id}
                  className="text-black"
                >
                  {designation.designationName}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Dropdown */}
          <div className="w-full">
            <select
              id="experienceId"
              name="experienceId"
              value={utility.jobSearchField.experienceId}
              className="w-full px-2 py-2.5 border border-gray-300 bg-white text-gray-500 rounded-sm text-base"
              onChange={(e) => utility.onSelectFieldChanged(e)}
            >
              <option value="0" disabled>
                Select Experience...
              </option>
              {utility.experiences.map((experience) => (
                <option
                  key={experience.value}
                  value={experience.value}
                  className="text-black"
                >
                  {experience.label}
                </option>
              ))}
            </select>
          </div>

          {/* Trainline Dropdown */}
          <div className="w-full">
            <select
              id="trainLineId"
              name="trainLineId"
              value={utility.jobSearchField.trainLineId} // Bind to selected trainline
              className="w-full px-2 py-2.5 border border-gray-300 bg-white text-gray-500 rounded-sm text-base"
              onChange={(e) => utility.onSelectFieldChanged(e)}
            >
              <option value="0" disabled>
                Select Trainline...
              </option>
              {trainLineUtility.trainLines.map((trainLine) => (
                <option
                  key={trainLine.id}
                  value={trainLine.id}
                  className="text-black"
                >
                  {trainLine.trainLineName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Show Loading Indicator */}
      {utility.loading ? (
        <div className="py-32 px-2 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-solid"></div>
        </div>
      ) : (
        <div className="p-5 flex flex-col gap-5">
          {utility.jobSearchResult?.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
