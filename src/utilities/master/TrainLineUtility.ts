import { useEffect, useState } from "react";
import TrainLineModel from "../../model/TrainLineModel";
import { getTrainLines } from "../../services/TrainLineService";

const TrainLineUtility = () => {
    const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);

    useEffect(() => {
        fetchTrainLines();
    }, []);

    async function fetchTrainLines() {
        let response = await getTrainLines();

        if (response.status === 200) {
            if (response.data !== null) {
                setTrainLines(response.data);
            }
        } else {
            // alert(response.message);
        }
    }
   return {trainLines}
}
 
export default TrainLineUtility;