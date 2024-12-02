import { useEffect, useState } from "react";
import CityModel from "../../model/master/CityModel";
import { getCitiesAsync } from "../../services/master/CityService";
import JobCityModel from "../../model/job/JobCityModel";
import {
  createJobCityAsync,
  getJobCityByJobIdAsync,
} from "../../services/job/JobCityService";
import { Bounce, toast } from "react-toastify";

const JobCityUtility = (jobId: number) => {
  const [jobCity, setJobCity] = useState<CityModel[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityModel[]>([]);

  useEffect(() => {
    if (jobId > 0) {
      fetchJobCityByJobId();
    }
    fetchJobCityAsync();
  }, []);

  async function fetchJobCityAsync() {
    try {
      const response = await getCitiesAsync();
      if (response.status === 200 && response.data !== null) {
        setJobCity(response.data);
      }
    } catch (error) {
      console.error("Error fetching job skills:", error);
    }
  }

  async function fetchJobCityByJobId() {
    try {
      const response = await getJobCityByJobIdAsync(jobId);
      if (response.status === 200 && response.data !== null) {
        const selectedJobCity: CityModel[] = response.data.map(
          (selectedCity: JobCityModel) => ({
            id: selectedCity.cityId,
            cityName: selectedCity.cityName,
          })
        );
        setSelectedCity(selectedJobCity);
      }
    } catch (error) {
      console.error("Error fetching job city by city ID:", error);
    }
  }

  const onCityChange = (selectedOptions: CityModel[]) => {
    setSelectedCity(selectedOptions || []);
  };

  const onJobCitySave = async () => {
    const jobcities: JobCityModel[] = selectedCity.map((selectedCity) => ({
      id: 0,
      jobId: jobId,
      cityId: selectedCity.id,
      cityName: "",
    }));

    try {
      const response = await createJobCityAsync(jobcities);
      if (response.status === 200) {
        toast.success(response.message, {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error saving job skills", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return {
    jobCity,
    selectedCity,
    onCityChange,
    onJobCitySave,
  };
};
export default JobCityUtility;
