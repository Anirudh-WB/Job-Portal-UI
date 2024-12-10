import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";
import AcademicInfoModal from "./modals/AcademicInfoModal";

type Props = { loginUserId: number; isRemoveCUD: boolean };

function AcademicInfo({ loginUserId, isRemoveCUD }: Props) {
  const utility = AcademicInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-between">
          <h2 className="font-semibold text-lg" id="academic-info">
            Academics Info
          </h2>
          {isRemoveCUD && (
            <button
              className="text-blue-700 text-base font-semibold"
              onClick={() => {
                utility.onAddAcademicInfo();
              }}
            >
              Add
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {utility.academicInfos.map((edu) => (
            <div key={edu.id} className="flex flex-col gap">
              <div className="flex flex-1 gap-3 text-base font-semibold text-black">
                <h3>
                  {edu.degree} from {edu.institutionName}
                </h3>
                {isRemoveCUD && (
                  <>
                    <button onClick={() => utility.onAcademicInfoEdit(edu.id)}>
                      <FiEdit2 className="text-sm text-gray-700" />
                    </button>
                    <button
                      onClick={() => utility.onAcademicInfoDelete(edu.id)}
                    >
                      <FiTrash2 className="text-sm text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              <h3 className="text-gray-500">
                {edu.startYear} - {edu.endYear}
              </h3>
              <h3 className="text-gray-500">Scored {edu.percentage}%</h3>
            </div>
          ))}
        </div>
      </div>

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
