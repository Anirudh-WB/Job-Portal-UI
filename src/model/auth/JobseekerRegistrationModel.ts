interface JobseekerRegistrationModel {
    profilePic: File | null;
    firstName: string;
    lastName :string;
    emailAddress:string;
    mobileNo:string;
    password: string
    roleId : number,
    confirmPassword : string
}

export default JobseekerRegistrationModel;