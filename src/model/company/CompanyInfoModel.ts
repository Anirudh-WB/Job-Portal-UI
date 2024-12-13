interface CompanyInfoModel {
    companyLogo: File | null,
    companyName: string;
    emailAddress: string;
    mobileNo: string;
    cityId: number;
    companyUrl: string;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    designationId: number;
    roleId: number;
    userId: number;
}

export default CompanyInfoModel;