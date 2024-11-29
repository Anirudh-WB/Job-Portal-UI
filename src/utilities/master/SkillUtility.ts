import { useEffect, useState } from "react";
import SkillModel from "../../model/master/SkillModel";
import { getSkillsAsync } from "../../services/master/SkillService";

const SkillUtility = () => {
    console.log("Skill utility logged")

    const [jobSkill, setJobSkill] = useState<SkillModel[]>([]);

    useEffect(() => {
        fetchJobSkillAsync();
    }, []);

    async function fetchJobSkillAsync() {
        try {
            const response = await getSkillsAsync();
            if (response.status === 200 && response.data !== null) {
                setJobSkill(response.data);
            }
        } catch (error) {
            console.error("Error fetching job skills:", error);
        }
    }

    return {jobSkill}
};
export default SkillUtility;
