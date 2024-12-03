import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import AcademicInfoModal from "./modals/AcademicInfoModal";

type Props = { loginUserId: number };

function AcademicInfo({ loginUserId }: Props) {
  const [isAcademincInfoOpen, setIsAcademincInfoOpen] =
    useState<boolean>(false);
  const [academicInfoId, setAcademicInfoId] = useState<number>(0);

  const utility = AcademicInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4 ">
        <div className="flex items-center gap-4 justify-between">
        <h2 className="font-semibold text-lg" id="IT-skills">
            Academics Info
          </h2>
          {/* {hasAccess && ( */}
          <button
            className="text-blue-700 text-base font-semibold"
            onClick={() => {
              utility.onAddAcademicInfo();
              setIsAcademincInfoOpen((prev) => !prev);
            }}
          >
            Add
          </button>
          {/* )} */}
        </div>

        <div className="flex flex-col gap-8">
          {utility.academicInfos.map((edu) => (
            <div key={edu.id} className="flex flex-col gap">
              <div className="flex flex-1 gap-3 text-base font-semibold text-black">
                <h3>
                  {edu.degree} from {edu.institutionName}
                </h3>
                {/* {hasAccess && ( */}
                <button
                  onClick={() => {
                    utility.onAcademicInfoEdit(edu.id);
                    setAcademicInfoId(edu.id);
                    setIsAcademincInfoOpen((prev) => !prev);
                  }}
                >
                  <FiEdit2 className="text-sm text-gray-700" />
                </button>
                <button
                  onClick={() => {
                    utility.onAcademicInfoDelete(edu.id);
                  }}
                >
                  <FiTrash2 className="text-sm text-gray-700" />
                </button>
                {/* )} */}
              </div>
              <h3 className="text-gray-500">
                Graduated in {edu.endYear}, {edu.startYear}
              </h3>
              <h3 className="text-gray-500">Scored {edu.percentage}</h3>
            </div>
          ))}
        </div>
      </div>

      <AcademicInfoModal
        isAcademincInfoOpen={isAcademincInfoOpen}
        setIsAcademincInfoOpen={setIsAcademincInfoOpen}
        loginUserId={loginUserId}
        academicInfoId={academicInfoId}
      />
    </>
  );
}

export default AcademicInfo;
