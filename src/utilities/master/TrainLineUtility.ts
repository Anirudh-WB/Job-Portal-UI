import { useEffect, useState } from "react";
import TrainLineModel from "../../model/TrainLineModel";
import { getTrainLines } from "../../services/TrainLineService";

const TrainLineUtility = () => {
  const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);

  useEffect(() => {
    fetchTrainLines();
  }, []);

  async function fetchTrainLines() {
    try {
      const response = await getTrainLines();
      if (response.status === 200 && response.data !== null) {
        setTrainLines(response.data);
      }
    } catch (error) {
      console.error("Error fetching trainlines:", error);
    }
  }

  return { trainLines };
};

export default TrainLineUtility;
