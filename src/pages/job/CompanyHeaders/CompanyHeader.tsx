import { GrLocation } from "react-icons/gr";
import { FiPhone, FiEdit2 } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { LuCalendar } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import CompanyHeaderModal from "./Modal/CompanyHeaderModal";
import CompanyInfoModalUtility from "../../../utilities/company/CompanyInfoModalUtility";

type Props = { loginUserId: number };
function CompanyHeader({ loginUserId }: Props) {
  const utility = CompanyInfoModalUtility(loginUserId);
  
  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-center gap-10">
        <img
          src={`data:image/png;base64,${utility.CompanyInfo.companyLogo}`}
          alt="company-logo"
          className="rounded-full h-48 aspect-square object-cover object-center shadow-2xl"
        />

        <div className="flex flex-col gap-3 w-4/5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <div className="flex items-end gap-4">
                <h1 className="text-2xl font-bold">{utility.CompanyInfo.companyName}</h1>
                <button onClick={() => utility.onCompanyInfoEdit(utility.CompanyInfo.id)}>
                  <FiEdit2 className="text-sm text-gray-700 mb-1.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-black font-semibold">Company Details</label>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <div className="flex gap-4 text-sm text-gray-700">
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <GrLocation /> {utility.CompanyInfo.cityName}
              </p>
              <p className="flex items-center gap-1">
                <LuCalendar /> {utility.CompanyInfo.companyUrl}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <MdMailOutline /> {utility.CompanyInfo.emailAddress}
              </p>
              <p className="flex items-center gap-1">
                <FiPhone /> {utility.CompanyInfo.mobileNo}
              </p>
            </div>
          </div>
          {/* Contact Person Information */}
          <div className="flex items-center gap-4">
            <label className="text-black font-semibold">Contact Person</label>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex gap-4 text-sm text-gray-700">
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <FaRegUser /> {utility.CompanyInfo.contactPersonName}
              </p>
              <p className="flex items-center gap-1">
                <LuCalendar /> {utility.CompanyInfo.designationName}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <FiPhone /> {utility.CompanyInfo.contactPersonPhone}
              </p>
              <p className="flex items-center gap-1">
                <MdMailOutline /> {utility.CompanyInfo.contactPersonEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CompanyHeaderModal
        isCompanyInfoOpen={utility.isCompanyInfoOpen}
        toggleModal={utility.toggleModal}
        loginUserId={loginUserId}
        // companyInfoId={utility.companyInfoId}
      />
    </>
  );
}

export default CompanyHeader;
