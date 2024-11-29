import { useState } from "react";
import SkillModel from "../../model/master/SkillModel";
import CityModel from "../../model/CityModel";
import { SelectChangeEvent } from "@mui/material";
import JobSearchModel from "../../model/job/JobSearchModel";
import { jobSearchAsync } from "../../services/job/JobSearchService";
import JobSearchResultModel from "../../model/job/JobSearchResultModel";
import { MultiValue } from "react-select";

//
const JobSearchUtility = () => {
  const experiances = [
    { value: 1, label: "Fresher" }, // "Fresh" item with a value of 1
    { value: 2, label: "1 year" },
    { value: 3, label: "2 years" },
    { value: 4, label: "3 years" },
    { value: 5, label: "4 years" },
    { value: 6, label: "5 years" },
    { value: 7, label: "6 years" },
    { value: 8, label: "7 years" },
    { value: 9, label: "8 years" },
    { value: 10, label: "9 years" },
    { value: 11, label: "10 years" },
    { value: 12, label: "More than 10 years" },
  ];
  const skills: SkillModel[] = [];
  const cities: CityModel[] = [];
  const [selectedSkills, setSelectedSkills] = useState<SkillModel[]>(skills);
  const [selectedCities, setSelectedCities] = useState<CityModel[]>(cities);

  //const[searchField, setSearchField] = useState<JobSearchModel>();
  const [jobSearchField, setJobSearchField] = useState<JobSearchModel>({
    skills: [],
    cities: [],
    designationId: 0,
    experienceId: 0,
    trainLineId: 0,
  });

  const [jobSearchResult, setJobSearchResult] =
    useState<JobSearchResultModel[]>();

    const onSkillChange = (
      newValue: MultiValue<SkillModel>,
      // actionMeta: ActionMeta<SkillModel>
    ) => {
      if (newValue) {
        // Convert MultiValue to a simple array, if necessary
        const selectedSkills = Array.isArray(newValue) ? [...newValue] : [];
    
        setSelectedSkills(selectedSkills);
    
        setJobSearchField((prevState) => ({
          ...prevState,
          skills: selectedSkills,
        }));
      }
    };
    

    const onCityChange = (
      newValue: MultiValue<CityModel>,
      // actionMeta: ActionMeta<SkillModel>
    ) => {
      if (newValue) {
        // Convert MultiValue to a simple array, if necessary
        const selectedCities = Array.isArray(newValue) ? [...newValue] : [];
    
        setSelectedCities(selectedCities);
    
        setJobSearchField((prevState) => ({
          ...prevState,
          cities: selectedCities,
        }));
      }
    };

  const onSelectFieldChanged = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setJobSearchField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const test = async () => {
    setJobSearchField((prevState) => ({
      ...prevState,
      skills: selectedSkills,
      cities: selectedCities,
    }));

    //alert(JSON.stringify(jobSearchField));

    let response = await jobSearchAsync(jobSearchField);
    //alert(JSON.stringify(response));
    //console.log(response);

    if (response.data != null) {
      setJobSearchResult(response.data);
    }
  };

  return {
    selectedSkills,
    onSkillChange,
    test,
    selectedCities,
    onCityChange,
    onSelectFieldChanged,
    experiances,
    jobSearchField,
    jobSearchResult,
  };
};
export default JobSearchUtility;
