import JobCityUtility from "../../../utilities/job/JobCityUtility";
import CityModel from "../../../model/master/CityModel";
import Select from "react-select";
import { Bounce, ToastContainer } from "react-toastify";

const PreferredCityPage: React.FC<{ parentJobId: number }> = ({
  parentJobId,
}) => {
  const utility = JobCityUtility(parentJobId);
  return (
    <>
      <div className="p-10 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg" id="add-prefer-city">Add Preferred Location</h2>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Select
            id="cities"
            isMulti
            options={utility.jobCity}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No cities found"}
            value={utility.selectedCity}
            getOptionLabel={(option) => option.cityName}
            getOptionValue={(option) => option.id.toString()} // Ensure unique key for each skill
            onChange={(selected) =>
              utility.onCityChange(selected as CityModel[])
            } // Handle multi-select change
            placeholder="Add Location"
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "rgb(209, 213, 219)",
                boxShadow: "none",
                "&:hover": { borderColor: "rgb(156, 163, 175)" },
                padding: "5px",
              }),
              option: (base, { isSelected }) => ({
                ...base,
                backgroundColor: isSelected ? "rgb(96, 165, 250)" : "white",
                color: isSelected ? "white" : "black",
                cursor: "pointer",
                borderRadius: isSelected ? "5px" : "10px",
              }),
            }}
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-700 text-white font-semibold py-2 px-8 rounded-3xl"
            onClick={utility.onJobCitySave}
          >
            Apply
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default PreferredCityPage;
