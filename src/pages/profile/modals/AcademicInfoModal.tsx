import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import { Bounce, ToastContainer } from "react-toastify";
import AcademicInfoModalUtility from "../../../utilities/profile/AcademicInfoModalUtility";

type Props = {
  isAcademicInfoOpen: boolean;
  toggleModal: any;
  loginUserId: number;
  academicInfoId: number;
};

function AcademicInfoModal({
  isAcademicInfoOpen,
  toggleModal,
  loginUserId,
  academicInfoId,
}: Props) {
  const modalUtility = AcademicInfoModalUtility(loginUserId, academicInfoId);

  return (
    <>
      <Dialog
        open={isAcademicInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={toggleModal}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-1/2 rounded-3xl bg-white p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-end w-full">
                <CloseButton as="button" className="text-xl text-gray-500">
                  <RiCloseLargeFill />
                </CloseButton>
              </div>
              <DialogTitle as="h3" className="text-xl font-medium">
                Academic Info
              </DialogTitle>

              <div className="mt-4 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">
                    Institution Name <span className="text-red-600">*</span>
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={modalUtility.academicInfo.institutionName}
                      id="institutionName"
                      name="institutionName"
                      className={`peer ${
                        modalUtility.errorInfo.find(
                          (err) => err.fieldName === "institutionName"
                        )
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={modalUtility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="institutionName"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Institution Name
                    </label>
                  </div>
                  {modalUtility.errorInfo.find(
                    (error) => error.fieldName === "institutionName"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        modalUtility.errorInfo.find(
                          (error) => error.fieldName === "institutionName"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">
                    Degree <span className="text-red-600">*</span>
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={modalUtility.academicInfo.degree}
                      id="degree"
                      name="degree"
                      className={`peer ${
                        modalUtility.errorInfo.find(
                          (err) => err.fieldName === "degree"
                        )
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={modalUtility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="degree"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Degree
                    </label>
                  </div>
                  {modalUtility.errorInfo.find(
                    (error) => error.fieldName === "degree"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        modalUtility.errorInfo.find(
                          (error) => error.fieldName === "degree"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>

                <div className="flex gap-5">
                  <div className="w-1/2 flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      Start Year <span className="text-red-600">*</span>
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        id="startYear"
                        name="startYear"
                        value={modalUtility.academicInfo.startYear}
                        onChange={modalUtility.onTextFieldChanged}
                        className={`peer ${
                          modalUtility.errorInfo.find(
                            (err) => err.fieldName === "startYear"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="startYear"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Start Year
                      </label>
                    </div>
                    {modalUtility.errorInfo.find(
                      (error) => error.fieldName === "startYear"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          modalUtility.errorInfo.find(
                            (error) => error.fieldName === "startYear"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <span className="text-base font-semibold">
                      End Year <span className="text-red-600">*</span>
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        id="endYear"
                        name="endYear"
                        value={modalUtility.academicInfo.endYear}
                        onChange={modalUtility.onTextFieldChanged}
                        className={`peer ${
                          modalUtility.errorInfo.find(
                            (err) => err.fieldName === "endYear"
                          )
                            ? "border-red-500 text-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="endYear"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        End Year
                      </label>
                    </div>
                    {modalUtility.errorInfo.find(
                      (error) => error.fieldName === "endYear"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          modalUtility.errorInfo.find(
                            (error) => error.fieldName === "endYear"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Percentage <span className="text-red-600">*</span>
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      id="percentage"
                      name="percentage"
                      value={modalUtility.academicInfo.percentage}
                      onChange={modalUtility.onTextFieldChanged}
                      className={`peer ${
                        modalUtility.errorInfo.find(
                          (err) => err.fieldName === "percentage"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                    />
                    <label
                      htmlFor="percentage"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Percentage
                    </label>
                  </div>
                  {modalUtility.errorInfo.find(
                    (error) => error.fieldName === "percentage"
                  ) && (
                    <span className="text-xs text-red-500">
                      {
                        modalUtility.errorInfo.find(
                          (error) => error.fieldName === "percentage"
                        )?.errorMessage
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button className="text-blue-700" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={() => {
                    modalUtility.onAcademicInfoSave().then((res) => {
                      if (res) {
                        toggleModal();
                      }
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ToastContainer
        containerId="academic__info__toast"
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default AcademicInfoModal;
