import RegisterInfo from "./RegisterInfo";
import CompanyRegisterForm from "./CompanyRegisterForm";

const CompanyRegistration = () => {
  return (
    <>
      <div className="flex gap-10 px-40 py-10">
        <RegisterInfo />
        <CompanyRegisterForm />
      </div>
    </>
  );
};

export default CompanyRegistration;
