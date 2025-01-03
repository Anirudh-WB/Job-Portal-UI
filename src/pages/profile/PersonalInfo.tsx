import { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";
import { TbCalendarTime } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import PersonalInfoUtility from "../../utilities/profile/PersonalInfoUtility";
import PersonalInfoModal from "./modals/PersonalInfoModal";
import AddressInfoUtility from "../../utilities/profile/AddressInfoUtility";
import EmploymentInfoUtility from "../../utilities/profile/EmploymentInfoUtility";
import AddressInfoModal from "./modals/AddressInfoModal";
import EmploymentInfoModal from "./modals/EmploymentInfoModal";

type Props = { loginUserId: number; isRemoveCUD: boolean };

function PersonalInfo({ loginUserId, isRemoveCUD }: Props) {
  const utility = PersonalInfoUtility({ loginUserId });
  const addressInfoUtility = AddressInfoUtility(loginUserId);
  const employmentInfoUtility = EmploymentInfoUtility(loginUserId);

  return (
    <>
      <div className="bg-white p-6 px-8 shadow-lg rounded-2xl flex items-center justify-center gap-8">
        <div className="rounded-full aspect-square h-52">
          <img
            src={`data:image/png;base64,${utility.personalInfo.profilePic}`}
            alt="profile-pic"
            className="rounded-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-4 w-4/5">
          <div className="flex items-end justify-between w-full gap-1.5">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <h1 className="text-2xl font-bold">
                    {utility.personalInfo.firstName}{" "}
                    {utility.personalInfo.lastName}
                  </h1>
                  {isRemoveCUD && (
                    <button onClick={utility.toggleModal}>
                      <FiEdit2 className="text-sm text-gray-700 mb-1" />
                    </button>
                  )}
                </div>
                <p className="text-gray-700">
                  {utility.experienceInfo.length > 0
                    ? utility.experienceInfo[0].designationName
                    : "No designation available"}
                </p>

                <p className="text-gray-700">
                  at{" "}
                  {utility.experienceInfo.length > 0
                    ? utility.experienceInfo[0].companyName
                    : "No designation available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-1/2 text-sm text-gray-700">
              <p className="flex items-center gap-1">
                <FiPhone /> {utility.personalInfo.mobileNumber}
              </p>
              <p className="flex items-center gap-1">
                <MdMailOutline /> {utility.personalInfo.emailAddress}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-end gap-2">
              <h3 className="text-base font-semibold">Address Info</h3>
              {isRemoveCUD && (
                <button onClick={addressInfoUtility.toggleModal}>
                  <FiEdit2 className="text-sm text-gray-700 mb-1" />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <GrLocation />
                <span>
                  {addressInfoUtility.addressInfo.address},{" "}
                  {
                    addressInfoUtility.cities.find(
                      (city) =>
                        city.id === addressInfoUtility.addressInfo.cityId
                    )?.cityName
                  }
                  ,{" "}
                  {
                    addressInfoUtility.states.find(
                      (state) =>
                        state.id === addressInfoUtility.addressInfo.stateId
                    )?.stateName
                  }
                  ,{" "}
                  {
                    addressInfoUtility.countries.find(
                      (country) =>
                        country.id === addressInfoUtility.addressInfo.countryId
                    )?.countryName
                  }
                  , {addressInfoUtility.addressInfo.postalCode}.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaTrainSubway />
                {
                  addressInfoUtility.trainLines.find(
                    (trainLine) =>
                      trainLine.id ===
                      addressInfoUtility.addressInfo.trainLineId
                  )?.trainLineName
                }
              </p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-end gap-2">
              <h3 className="text-base font-semibold">Employment Info</h3>
              {isRemoveCUD && (
                <button onClick={employmentInfoUtility.toggleModal}>
                  <FiEdit2 className="text-sm text-gray-700 mb-1" />
                </button>
              )}
            </div>
            <div className="flex justify-between">
              <p className="flex gap-1 items-center">
                <GiTakeMyMoney />{" "}
                {employmentInfoUtility.employmentInfo.currentCTC}
              </p>
              <p className="flex gap-1 items-center">
                <FaMoneyBillTrendUp />{" "}
                {employmentInfoUtility.employmentInfo.expectedCTC}
              </p>
              <p className="flex gap-1 items-center">
                <TbCalendarTime />{" "}
                {
                  employmentInfoUtility.noticePeriods.find(
                    (noticePeriod) =>
                      noticePeriod.id ===
                      employmentInfoUtility.employmentInfo.noticePeriodId
                  )?.noticePeriodName
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <PersonalInfoModal
        isProfileHeaderOpen={utility.isProfileHeaderOpen}
        toggleModal={utility.toggleModal}
        loginUserId={loginUserId}
      />
      <AddressInfoModal
        isAddressInfoOpen={addressInfoUtility.isAddressInfoOpen}
        toggleModal={addressInfoUtility.toggleModal}
        loginUserId={loginUserId}
      />
      <EmploymentInfoModal
        isEmploymentInfoOpen={employmentInfoUtility.isEmploymentInfoOpen}
        toggleModal={employmentInfoUtility.toggleModal}
        loginUserId={loginUserId}
      />
    </>
  );
}

export default PersonalInfo;
