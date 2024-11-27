import dayjs, { Dayjs } from 'dayjs';
interface ExperienceInfoViewModel{
    id: number,
    companyName : string,
    startDate:Dayjs,
    endDate :Dayjs,
    description: string,
    isCurrentlyWorking :boolean,
    designationId :  number,
    userId :  number,
    designationName : string


}
export default ExperienceInfoViewModel;