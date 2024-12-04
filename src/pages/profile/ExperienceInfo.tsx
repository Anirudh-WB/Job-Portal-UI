import React, { useState } from "react";
import ExperienceInfoUtility from "../../utilities/profile/ExperienceInfoUtility";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";
import ExperienceInfoModal from "./modals/ExperienceInfoModal";

type Props = { loginUserId: number };

function ExperienceInfo({ loginUserId }: Props) {
  const [isExperienceInfoOpen, setIsExperienceInfoOpen] =
    useState<boolean>(false);
  const [experienceInfoId, setExperienceInfoId] = useState<number>(0);
  const utility = ExperienceInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg" id="IT-skills">
            Professional Experiences
          </h2>

          {/* {hasAccess && ( */}
          <button
            className="font-semibold text-blue-700"
            onClick={() => {
              utility.onAddExperienceInfo();
              setIsExperienceInfoOpen((prev) => !prev);
            }}
          >
            Add details
          </button>
          {/* )} */}
        </div>

        {utility.experienceInfos.map((employment, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">{employment.designationName}</h3>
              {/* {hasAccess && ( */}
              <button>
                <FiEdit2
                  className="text-sm text-gray-700"
                  onClick={() => {
                    utility.onExperienceInfoEdit(employment.id);
                    setExperienceInfoId(employment.id);
                    setIsExperienceInfoOpen((prev) => !prev);
                  }}
                />
              </button>
              <button
                onClick={() => {
                  if(window.confirm(`Delete Experience of ${employment.designationName}`)){
                    utility.onExperienceInfoDelete(employment.id);
                  }
                }}
              >
                <FiTrash2 className="text-sm text-gray-700" />
              </button>
              {/* )} */}
            </div>
            <h4>{employment.companyName}</h4>
            <p className="text-gray-500 text-sm">
              {dayjs(employment.startDate).format("DD/MM/YYYY")} to{" "}
              {employment.isCurrentlyWorking
                ? "Present"
                : dayjs(employment.endDate).format("DD/MM/YYYY")}
            </p>
            <p className="text-gray-900 text-sm">
              {utility.isExpanded.includes(employment.id)
                ? employment.description
                : `${employment.description.slice(0, 200)}... `}
              <button
                onClick={() =>
                  utility.setIsExpanded((prev) =>
                    !prev.includes(employment.id)
                      ? [employment.id, ...prev]
                      : prev.filter((item) => item !== employment.id)
                  )
                }
                className="text-blue-700 text-xs font-semibold"
              >
                {utility.isExpanded.includes(employment.id)
                  ? "Read Less"
                  : "Read More"}
              </button>
            </p>
          </div>
        ))}
      </div>

      <ExperienceInfoModal
        isExperienceInfoOpen={isExperienceInfoOpen}
        setIsExperienceInfoOpen={setIsExperienceInfoOpen}
        loginUserId={loginUserId}
        experienceInfoId={experienceInfoId}
      />
    </>
  );
}

export default ExperienceInfo;