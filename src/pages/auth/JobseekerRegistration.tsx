import JobSeekerRegistrationForm from "./JobSeekerRegistrationForm";
import RegisterInfo from "./RegisterInfo";

const JobseekerRegistration = () => {
  return (
    <>
      <div className="flex gap-10 px-48 py-10">
        <RegisterInfo />
        <JobSeekerRegistrationForm />
      </div>
    </>
  );
};

export default JobseekerRegistration;
