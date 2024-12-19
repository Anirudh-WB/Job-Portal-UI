import ExperienceInfoUtility from "../../utilities/profile/ExperienceInfoUtility";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";
import ExperienceInfoModal from "./modals/ExperienceInfoModal";

type Props = { loginUserId: number; isRemoveCUD: boolean };

function ExperienceInfo({ loginUserId, isRemoveCUD }: Props) {
  const utility = ExperienceInfoUtility(loginUserId);

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg" id="experience-info">
            Experience Info
          </h2>

          {/* Add details button */}
          {isRemoveCUD && (
            <button
              className="font-semibold text-blue-700"
              onClick={() => utility.onAddExperienceInfo()}
            >
              Add details
            </button>
          )}
        </div>

        {/* Experience Information List */}
        {utility.experienceInfos.length > 0 ? (
          utility.experienceInfos.map((employment, index) => (
            <div key={employment.id} className="flex flex-col gap">
              {/* Employment Header */}
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">{employment.designationName}</h3>
                {isRemoveCUD && (
                  <>
                    <button
                      onClick={() => utility.onExperienceInfoEdit(employment.id)}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() =>
                        utility.onExperienceInfoDelete(employment.id)
                      }
                      className="text-gray-700 hover:text-red-600"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </>
                )}
              </div>

              {/* Company Name */}
              <h4>{employment.companyName}</h4>

              {/* Date range */}
              <p className="text-gray-500 text-sm">
                {dayjs(employment.startDate).format("DD/MM/YYYY")} to{" "}
                {employment.isCurrentlyWorking
                  ? "Present"
                  : dayjs(employment.endDate).format("DD/MM/YYYY")}
              </p>

              {/* Description with Read More/Read Less */}
              {employment.description.length > 0 && (
                <p className="text-gray-900 text-sm">
                  {utility.isExpanded.includes(employment.id) ||
                  employment.description.length < 200
                    ? employment.description
                    : `${employment.description.slice(0, 200)}... `}
                  {employment.description.length >= 200 && (
                    <button
                      onClick={() =>
                        utility.setIsExpanded((prev) =>
                          prev.includes(employment.id)
                            ? prev.filter((item) => item !== employment.id)
                            : [employment.id, ...prev]
                        )
                      }
                      className="text-blue-700 text-xs font-semibold"
                    >
                      {utility.isExpanded.includes(employment.id)
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  )}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No experience info added yet.</p>
        )}
      </div>

      {/* Experience Info Modal */}
      <ExperienceInfoModal
        isExperienceInfoOpen={utility.isExperienceInfoOpen}
        toggleModal={utility.toggleModal}
        loginUserId={loginUserId}
        experienceInfoId={utility.experienceInfoId}
      />
    </>
  );
}

export default ExperienceInfo;
