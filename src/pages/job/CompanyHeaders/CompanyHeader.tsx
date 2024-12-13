import { GrLocation } from "react-icons/gr";
import { FiPhone, FiEdit2 } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { LuCalendar } from "react-icons/lu";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import CompanyHeaderModal from "./Modal/CompanyHeaderModal";
import CompanyInfoUtility from "../../../utilities/company/CompanyInfoUtility";

type Props = { loginUserId: number };
function CompanyHeader({ loginUserId }: Props) {
  const utility = CompanyInfoUtility(loginUserId);
  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-center gap-10">
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid"
          alt="company-logo"
          className="rounded-full h-48 w-48 shadow-2xl"
        />

        <div className="flex flex-col gap-3 w-4/5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <div className="flex items-end gap-4">
                <h1 className="text-2xl font-bold">Wonderbiz</h1>
                <button onClick={() => utility.toggleModal()}>
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
                <GrLocation /> Thane, Maharashtra
              </p>
              <p className="flex items-center gap-1">
                <LuCalendar /> https://www.google.com
              </p>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <MdMailOutline /> test@gmail.com
              </p>
              <p className="flex items-center gap-1">
                <FiPhone /> 7894561235
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
                <FaRegUser /> John Doe
              </p>
              <p className="flex items-center gap-1">
                <LuCalendar /> HR Consultancy
              </p>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <p className="flex items-center gap-1">
                <FiPhone /> 8956231478
              </p>
              <p className="flex items-center gap-1">
                <MdMailOutline /> test@gmail.com
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
