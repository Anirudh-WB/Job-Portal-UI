import React from "react";
import { FiEdit2 } from "react-icons/fi";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";

type Props = { loginUserId: number };

function AcademicInfo({ loginUserId }: Props) {
  const utility = AcademicInfoUtility(loginUserId);
  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4 ">
        <div className="flex items-center gap-4 justify-between">
          <h2 className="font-semibold text-md" id="Education">
            Education
          </h2>
          {/* {hasAccess && ( */}
          <button
            className="text-blue-700 text-base font-semibold"
            //   onClick={() => dispatch(toggleEducationModal())}
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
                <button>
                  <FiEdit2 className="text-sm text-gray-700" />
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

      {/* <EducationModal /> */}
    </>
  );
}

export default AcademicInfo;
