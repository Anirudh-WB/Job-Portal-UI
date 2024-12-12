interface PersonalInfoModel {
    id: number,
    profilePic : File | null,
    designationName:string,
    compmanyName:string,
    firstName:string,
    lastName:string,
    emailAddress:string,
    mobileNumber:string,
    isActive:boolean,
    userId : number
}
export default PersonalInfoModel;