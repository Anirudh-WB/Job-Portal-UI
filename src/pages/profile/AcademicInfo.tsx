import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import AcademicInfoModal from "./modals/AcademicInfoModal";

type Props = { loginUserId: number; isRemoveCUD: boolean };

function AcademicInfo({ loginUserId, isRemoveCUD }: Props) {
  const utility = AcademicInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-4 justify-between">
          <h2 className="font-semibold text-lg" id="academic-info">
            Academics Info
          </h2>
          {/* Add button for adding academic info */}
          {isRemoveCUD && (
            <button
              className="text-blue-700 text-base font-semibold"
              onClick={() => utility.onAddAcademicInfo()}
            >
              Add
            </button>
          )}
        </div>

        {/* Academic Info List */}
        {utility.academicInfos.length > 0 ? (
          <div className="flex flex-col gap-8">
            {utility.academicInfos.map((edu) => (
              <div key={edu.id} className="flex flex-col gap">
                {/* Degree and Institution Info */}
                <div className="flex items-center gap-3 text-base font-semibold text-black">
                  <h3>{edu.degree} from {edu.institutionName}</h3>
                  {/* Edit/Delete Buttons */}
                  {isRemoveCUD && (
                    <>
                      <button
                        onClick={() => utility.onAcademicInfoEdit(edu.id)}
                        className="text-gray-700 hover:text-blue-600"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => utility.onAcademicInfoDelete(edu.id)}
                        className="text-gray-700 hover:text-red-600"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </>
                  )}
                </div>

                {/* Duration */}
                <h3 className="text-gray-500">
                  {edu.startYear} - {edu.endYear}
                </h3>

                {/* Percentage */}
                <h3 className="text-gray-500">Scored {edu.percentage}%</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No academic info added yet.</p>
        )}
      </div>

      {/* Academic Info Modal */}
      <AcademicInfoModal
        isAcademicInfoOpen={utility.isAcademicInfoOpen}
        toggleModal={utility.toggleModal}
        loginUserId={loginUserId}
        academicInfoId={utility.academicInfoId}
      />
    </>
  );
}

export default AcademicInfo;
