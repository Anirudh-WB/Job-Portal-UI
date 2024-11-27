import dayjs, { Dayjs } from 'dayjs';
interface ExperienceInfoModel{
    id: number,
    companyName : string,
    startDate:Dayjs,
    endDate :Dayjs,
    description: string,
    isCurrentlyWorking :boolean,
    designationId :  number,
    userId :  number,


}
export default ExperienceInfoModel;