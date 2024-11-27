import dayjs, { Dayjs } from 'dayjs';

interface MemberModel {
  id:number
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  address: string;
  dob: Dayjs | null; // Update the type to Dayjs | null
  genderId: number;
  isActive: boolean;
  [key: string]: string | number | boolean | Date | Dayjs | null;
  
}

export default MemberModel;