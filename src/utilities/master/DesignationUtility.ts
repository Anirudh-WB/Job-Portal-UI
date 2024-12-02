import { useEffect, useState } from "react";
import DesignationModel from "../../model/master/DesignationModel";
import { getDesignations } from "../../services/master/DesignationService";

const DesignationUtility = () => {
  const [designations, setDesignations] = useState<DesignationModel[]>([]);

  useEffect(() => {
    fetchDesignations();
  }, []);

  async function fetchDesignations() {
    try {
      const response = await getDesignations();
      if (response.status === 200 && response.data !== null) {
        setDesignations(response.data);
      }
    } catch (error) {
      console.error("Error fetching designation:", error);
    }
  }

  return { designations };
};

export default DesignationUtility;
