import { useEffect, useState } from "react";
import CityModel from "../../model/master/CityModel";
import { getCitiesAsync } from "../../services/master/CityService";
import { SnackbarOrigin } from "@mui/material";
import JobCityModel from "../../model/job/JobCityModel";
import { createJobInfoAsync } from "../../services/job/JobInfoService";
import { createJobCityAsync, getJobCityByJobIdAsync } from "../../services/job/JobCityService";

const JobCityUtility = (jobId: number) => {


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] =
    useState<SnackbarOrigin>({
      vertical: "top",
      horizontal: "center",
    });
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >();

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const onJobCitySave = async () => {

    // Loop through selectedCitys and assign values to JobCityModel
    const jobCities: JobCityModel[] = selectedCities.map((selectedCity, index) => ({
      id: 0, // You can set the id as per your requirements
      jobId: jobId,
      cityId: selectedCity.id, // Assuming selectedCity has an id property representing skillId
      cityName: ""
    }));


    //alert(JSON.stringify(jobCitys));

    let response = await createJobCityAsync(jobCities);
    //alert(JSON.stringify(response));
    if (response.data != null) {
      const snackbarSeverity = response.status === 200 ? "success" : "error";
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity(snackbarSeverity);
    } else {
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    }


  }

  const cities: CityModel[] = [

  ];

  const [jobCities, setjobCities] = useState<CityModel[]>([]);
  const [selectedCities, setSelectedCities] = useState<CityModel[]>(cities);

  useEffect(() => {
    if (jobId > 0) {
      fetchJobCityByJobId();
    }

    fetchJobCityAsync();
  }, []);


  useEffect(() => {
    setSelectedCities(selectedCities);
  }, [selectedCities]);

  async function fetchJobCityAsync() {
    try {
      const response = await getCitiesAsync();
      if (response.status === 200 && response.data !== null) {
        setjobCities(response.data);
      }
    } catch (error) {
      console.error("Error fetching job cities:", error);
    }
  }
  async function fetchJobCityByJobId() {
    let response = await getJobCityByJobIdAsync(jobId);
    // alert(JSON.stringify(response));

   // console.log(response);
    if (response.status === 200) {
      if (response.data != null) {
       // const selectedJobCitys: JobCityModel[] = Array.isArray(response.data) ? response.data : [response.data];
       const selectedJobCitys: JobCityModel[] = response.data ? response.data : [response.data];
        // Loop through selectedCitys and assign values to JobCityModel
        const jobCitys: CityModel[] = selectedJobCitys.map((selectedCity, index) => ({
          id: selectedCity.cityId, // You can set the id as per your requirements
          cityName: selectedCity.cityName
        }));

        // alert(JSON.stringify(jobCitys));
        setSelectedCities(jobCitys);
      }
    }
  }


  const onCityChange = (event: React.SyntheticEvent<Element, Event>, newValue: CityModel[] | null) => {
    if (newValue) {
      setSelectedCities(newValue);
    }
  };



  return {
    jobCities, onCityChange, selectedCities

    , onJobCitySave
    , snackbarOpen,
    handleSnackbarClose,
    snackbarMessage,
    snackbarPosition,
    snackbarSeverity,
  };
}
export default JobCityUtility;