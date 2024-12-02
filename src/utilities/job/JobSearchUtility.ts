import { useState } from "react";
import SkillModel from "../../model/master/SkillModel";
import CityModel from "../../model/CityModel";
import JobSearchModel from "../../model/job/JobSearchModel";
import { jobSearchAsync } from "../../services/job/JobSearchService";
import JobSearchResultModel from "../../model/job/JobSearchResultModel";
import DesignationModel from "../../model/master/DesignationModel";
import TrainLineModel from "../../model/TrainLineModel";

const JobSearchUtility = () => {
  const experiences = [
    { value: 1, label: "Fresher" },
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

  const [selectedSkills, setSelectedSkills] = useState<SkillModel[]>([]);
  const [selectedCities, setSelectedCities] = useState<CityModel[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<DesignationModel[]>([]);
  const [selectedTrainLine, setSelectedTrainLine] = useState<TrainLineModel[]>([]);
  
  const [jobSearchField, setJobSearchField] = useState<JobSearchModel>({
    skills: [],
    cities: [],
    designationId: 0,
    experienceId: 0,
    trainLineId: 0,
  });

  const [jobSearchResult, setJobSearchResult] = useState<JobSearchResultModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const onSkillChange = (selectedOptions: SkillModel[]) => setSelectedSkills(selectedOptions || []);
  const onCityChange = (selectedOptions: CityModel[]) => setSelectedCities(selectedOptions || []);
  const onDesignationChange = (selectedOption: DesignationModel[]) => setSelectedDesignation(selectedOption || []);
  const onTrainLineChange = (selectedOption: TrainLineModel[]) => setSelectedTrainLine(selectedOption || []);
  
  const onSelectFieldChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setJobSearchField((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    
    const updatedJobSearchField = {
      ...jobSearchField,
      skills: selectedSkills,
      cities: selectedCities,
      designationId: selectedDesignation.length > 0? selectedDesignation[0].id : 0,
      trainLineId: selectedTrainLine.length > 0? selectedTrainLine[0].id : 0,
    };

    try {
      const response = await jobSearchAsync(updatedJobSearchField);

      if (response.data) {
        setJobSearchResult(response.data);
      }
    } catch (error) {
      console.error("Error during job search", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedSkills,
    onSkillChange,
    selectedCities,
    onCityChange,
    selectedDesignation,
    onDesignationChange,
    selectedTrainLine,
    onTrainLineChange,
    onSelectFieldChanged,
    experiences,
    jobSearchField,
    jobSearchResult,
    loading, // Expose loading state to the component
    handleSearch,
  };
};

export default JobSearchUtility;
