import dayjs, { Dayjs } from 'dayjs';
interface ExperienceInfoModel{
    id: number,
    companyName : string,
    startDate:Dayjs | null,
    endDate :Dayjs | null,
    description: string,
    isCurrentlyWorking :boolean,
    designationId :  number,
    userId :  number,


}
export default ExperienceInfoModel;