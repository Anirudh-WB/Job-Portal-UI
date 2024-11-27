import CityModel from "../master/CityModel";
import SkillModel from "../master/SkillModel";

interface JobSearchModel {
    skills: SkillModel[],
    cities  : CityModel[],
    designationId : number,
    experienceId : number,
    trainLineId : number,


}
export default JobSearchModel;