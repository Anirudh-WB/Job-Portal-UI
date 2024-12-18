interface CompanyRegistrationModel {
    companyLogo: File | null,
    companyName: string;
    companyUrl: string;
    emailAddress: string;
    mobileNo: string;
    cityId: number;
    roleId: number;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    designationId: number;
    password: string;
    confirmPassword: string;
}


export default CompanyRegistrationModel;