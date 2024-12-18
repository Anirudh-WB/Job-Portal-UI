import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { RiCloseLargeFill } from "react-icons/ri";
import AddressInfoUtility from "../../../utilities/profile/AddressInfoUtility";

type Props = {
  isAddressInfoOpen: boolean;
  toggleModal: any;
  loginUserId: number;
};

function AddressInfoModal({
  isAddressInfoOpen,
  toggleModal,
  loginUserId,
}: Props) {
  const utility = AddressInfoUtility(loginUserId);

  return (
    <>
      <Dialog
        open={isAddressInfoOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={toggleModal}
        __demoMode
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
                Address Info
              </DialogTitle>

              <div className="mt-4 flex flex-col gap-4">
                <div className="w-full flex flex-col gap-1.5">
                  <label className="text-base font-semibold" htmlFor="address">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={utility.addressInfo.address}
                      id="address"
                      name="address"
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "address"
                        )
                          ? "border-red-500 text-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={utility.onTextFieldChanged}
                      autoComplete="off"
                    />
                    <label
                      htmlFor="address"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Address
                    </label>
                  </div>
                  {utility.errorInfo.find(
                    (err) => err.fieldName === "address"
                  ) && (
                    <span className="text-red-600 text-sm">Enter address</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col w-1/2 gap-2">
                    <label className="font-semibold text-sm" htmlFor="cityId">
                      City <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="cityId"
                      id="cityId"
                      value={utility.addressInfo.cityId}
                      onChange={utility.onSelectFieldChanged}
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "cityId"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>Select City</option>
                      {utility.cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                    {utility.errorInfo.find(
                      (err) => err.fieldName === "cityId"
                    ) && (
                      <span className="text-red-600 text-sm">Select City</span>
                    )}
                  </div>

                  <div className="flex flex-col w-1/2 gap-2">
                    <label className="font-semibold text-sm" htmlFor="stateId">
                      State <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="stateId"
                      id="stateId"
                      value={utility.addressInfo.stateId}
                      onChange={utility.onSelectFieldChanged}
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "stateId"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>Select State</option>
                      {utility.states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                    {utility.errorInfo.find(
                      (err) => err.fieldName === "stateId"
                    ) && (
                      <span className="text-red-600 text-sm">Select State</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col w-1/2 gap-2">
                    <label
                      className="font-semibold text-sm"
                      htmlFor="countryId"
                    >
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="countryId"
                      id="countryId"
                      value={utility.addressInfo.countryId}
                      onChange={utility.onSelectFieldChanged}
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "countryId"
                        )
                          ? "border-red-500 "
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>Select Country</option>
                      {utility.countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                    {utility.errorInfo.find(
                      (err) => err.fieldName === "countryId"
                    ) && (
                      <span className="text-red-600 text-sm">
                        Select Country
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col w-1/2 gap-2">
                    <label
                      className="font-semibold text-sm"
                      htmlFor="trainLineId"
                    >
                      Train Line <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="trainLineId"
                      id="trainLineId"
                      value={utility.addressInfo.trainLineId}
                      onChange={utility.onSelectFieldChanged}
                      className={`peer ${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "trainLineId"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>Select Train Line</option>
                      {utility.trainLines.map((trainLine) => (
                        <option key={trainLine.id} value={trainLine.id}>
                          {trainLine.trainLineName}
                        </option>
                      ))}
                    </select>
                    {utility.errorInfo.find(
                      (err) => err.fieldName === "trainLineId"
                    ) && (
                      <span className="text-red-600 text-sm">
                        Select Train Line
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1.5">
                  <label
                    className="text-base font-semibold"
                    htmlFor="postalCode"
                  >
                    Postal Code <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={utility.addressInfo.postalCode}
                      id="postalCode"
                      name="postalCode"
                      className={`${
                        utility.errorInfo.find(
                          (err) => err.fieldName === "postalCode"
                        )
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={utility.onTextFieldChanged}
                    />
                    <label
                      htmlFor="postalCode"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Postal Code
                    </label>
                    {utility.errorInfo.find(
                      (error) => error.fieldName === "postalCode"
                    ) && (
                      <span className="text-xs text-red-500">
                        {
                          utility.errorInfo.find(
                            (error) => error.fieldName === "postalCode"
                          )?.errorMessage
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-10 font-semibold">
                <button className="text-blue-700" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  className="text-white bg-blue-600 px-7 py-2 rounded-full"
                  onClick={utility.onAddressInfoSave}
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AddressInfoModal;
