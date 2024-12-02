import { useEffect, useState } from "react";
import CityModel from "../../model/CityModel";
import { getCitiesAsync } from "../../services/master/CityService";

const CityUtility = () => {

  const [jobCities, setjobCities] = useState<CityModel[]>([]);

  useEffect(() => {
    fetchJobCityAsync();
  }, []);
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
  return { jobCities};
};
export default CityUtility;
