interface JobSearchResultModel {
  id: number;
  skills: Array<String>;
  cities: Array<String>;
  jobTitle: string;
  jobDescription: string;
  minimumSalary: number;
  maximumSalary: number;
  trainLineName: string;
  designationName: string;

  companyName: string;
  companyEmailAddress: string;
  companyMobileNo: string;
}

export default JobSearchResultModel;
