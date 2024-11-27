import { useEffect, useState } from "react";
import DesignationModel from "../../model/master/DesignationModel";
import { getDesignations } from "../../services/master/DesignationService";

const DesignationUtility = () => {
    const [designations, setDesignations] = useState<DesignationModel[]>([]);

    useEffect(() => {
        fetchDesignations();
    }, []);

    async function fetchDesignations() {
        let response = await getDesignations();
        if (response.status === 200) {
            if (response.data !== null) {
                setDesignations(response.data);
            }
        } else {
            // alert(response.message);
        }
    }

    return {designations}
}

export default DesignationUtility;