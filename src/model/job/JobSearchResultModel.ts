import CityModel from "../master/CityModel";
import SkillModel from "../master/SkillModel";

interface JobSearchResultModel {
    id: number,
    skills: SkillModel[],
    cities  : CityModel[],
    jobTitle : string,
    jobDescription : string,
    minimumSalary : number,
    maximumSalary : number,
    trainLineName : string,
    designationName : string,

    companyName : string,
    companyEmailAddress : string,
    companyMobileNo : string,


}
export default JobSearchResultModel;