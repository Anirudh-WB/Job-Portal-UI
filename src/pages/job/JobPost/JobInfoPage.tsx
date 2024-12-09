import {
  RichTextEditorProvider,
  RichTextField,
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
} from "mui-tiptap";
import React from "react";
import "../../../css/Richtexteditor.css";
import JobInfoUtility from "../../../utilities/job/JobInfoUtility";
import { Bounce, ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";

const JobInfoPage: React.FC<{
  parentJobId: number;
  onUpdateJobId: (newJobId: number) => void;
}> = ({ parentJobId, onUpdateJobId }) => {
  const utility = JobInfoUtility(parentJobId, onUpdateJobId);

  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md h-fit flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="add-job-description">
            Add Job Description
          </h2>
        </div>
        {/* Job Title */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-base font-semibold" htmlFor="companyName">
            Job Title <span className="text-red-600 font-semibold">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className={`peer ${
                utility.errorInfo.find(
                  (error) => error.fieldName === "jobTitle"
                )
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              autoComplete="off"
              placeholder="Enter job title"
              value={utility.jobInfo.jobTitle}
              onChange={utility.onTextFieldChanged}
            />
            {/* <label
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="jobTitle"
            >
              Enter Job title
            </label> */}
          </div>
          {utility.errorInfo.find(
            (error) => error.fieldName === "jobTitle"
          ) && (
            <span className="text-xs text-red-500">
              {
                utility.errorInfo.find(
                  (error) => error.fieldName === "jobTitle"
                )?.errorMessage
              }
            </span>
          )}
        </div>

        <div className="flex flex-1 items-center gap-5">
          {/* Minimum Salary */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-base font-semibold" htmlFor="companyName">
              Minimum Salary{" "}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="minimumSalary"
                name="minimumSalary"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "minimumSalary"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                placeholder="Enter minimum salary"
                value={utility.jobInfo.minimumSalary}
                onChange={utility.onTextFieldChanged}
              />
              {/* <label
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="minimumSalary"
              >
                Enter Minimum Salary
              </label> */}
            </div>
            {utility.errorInfo.find(
              (error) => error.fieldName === "minimumSalary"
            ) && (
              <span className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "minimumSalary"
                  )?.errorMessage
                }
              </span>
            )}
          </div>
          {/* Maximum Salary */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-base font-semibold" htmlFor="companyName">
              Maximum Salary{" "}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="maximumSalary"
                name="maximumSalary"
                className={`peer ${
                  utility.errorInfo.find(
                    (error) => error.fieldName === "maximumSalary"
                  )
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                autoComplete="off"
                placeholder="Enter minimum salary"
                value={utility.jobInfo.maximumSalary}
                onChange={utility.onTextFieldChanged}
              />
              {/* <label
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="maximumSalary"
              >
                Enter Maximum Salary
              </label> */}
            </div>
            {utility.errorInfo.find(
              (error) => error.fieldName === "maximumSalary"
            ) && (
              <span className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "maximumSalary"
                  )?.errorMessage
                }
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center gap-5">
          {/* Designation */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="designationId" className="text-base font-semibold">
              Designation <span className="text-red-600 font-semibold">*</span>
            </label>
            <select
              id="designationId"
              name="designationId"
              className={`${
                utility.errorInfo.find(
                  (error) => error.fieldName === "designationId"
                )
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
              value={utility.jobInfo.designationId.toString()}
              onChange={utility.onSelectFieldChanged}
            >
              {utility.designations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.designationName}
                </option>
              ))}
            </select>
            {utility.errorInfo.find(
              (error) => error.fieldName === "designationId"
            )?.errorMessage && (
              <p className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "designationId"
                  )?.errorMessage
                }
              </p>
            )}
          </div>

          {/* Train Line */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="trainLineId" className="text-base font-semibold">
              Train Line <span className="text-red-600 font-semibold">*</span>
            </label>
            <select
              id="trainLineId"
              name="trainLineId"
              className={`${
                utility.errorInfo.find(
                  (error) => error.fieldName === "trainLineId"
                )
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={utility.jobInfo.trainLineId.toString()}
              onChange={utility.onSelectFieldChanged}
            >
              {utility.trainLines.map((trainLine) => (
                <option key={trainLine.id} value={trainLine.id}>
                  {trainLine.trainLineName}
                </option>
              ))}
            </select>
            {utility.errorInfo.find(
              (error) => error.fieldName === "trainLineId"
            )?.errorMessage && (
              <p className="text-xs text-red-500">
                {
                  utility.errorInfo.find(
                    (error) => error.fieldName === "trainLineId"
                  )?.errorMessage
                }
              </p>
            )}
          </div>
        </div>

        <div>
          <ReactQuill
            ref={utility.editorRef}
            value={utility.jobInfo.jobDescription}
            onChange={utility.editor}
            modules={{
              toolbar: [
                [
                  { header: "1" },
                  { header: "2" },
                ],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                [{ color: [] }, { background: [] }],
                ["clean"], 
                ["image"],
              ],
            }}
            // theme="snow"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="button"
            className="w-fit bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobInfoSave}
          >
            Create Job
          </button>
        </div>
      </div>

      <ToastContainer
        // containerId="company__registration__toast"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default JobInfoPage;
