interface CompanyInfoModel {
    id: number,
    companyLogo: File | null,
    companyName: string;
    emailAddress: string;
    mobileNo: string;
    cityId: number;
    cityName: string;
    companyUrl: string;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    designationId: number;
    designationName: string;
    roleId: number;
    userId: number;
}

export default CompanyInfoModel;