import React, { useEffect, useState } from "react";
import StateModel from "../../model/StateModel";
import { getStates } from "../../services/StateService";
import CountryModel from "../../model/CountryModel";
import CityModel from "../../model/master/CityModel";
import { getCitiesAsync } from "../../services/master/CityService";
import { getCountries } from "../../services/CountryService";
import TrainLineModel from "../../model/TrainLineModel";
import { getTrainLines } from "../../services/TrainLineService";

import AddressInfoModel from "../../model/profile/AddressInfoModel";
import FieldErrorModel from "../../model/FieldErrorModel";
import {
  createAddressInfoAsync,
  getAddressInfoByUserIdAsync,
  updateAddressInfoAsync,
} from "../../services/profile/AddressInfoService";
import { Bounce, toast } from "react-toastify";

const AddressInfoUtility = (loginUserId: number) => {
  const intialAddressInfoModel: AddressInfoModel = {
    id: 0,
    address: "",
    cityId: 0,
    countryId: 0,
    stateId: 0,
    postalCode: "",
    trainLineId: 0,
    userId: loginUserId,
  };

  const initialErrors: FieldErrorModel[] = [];

  const [addressInfo, setAddressInfo] = useState<AddressInfoModel>(
    intialAddressInfoModel
  );

  const [errorInfo, setErrorInfo] = useState<FieldErrorModel[]>(initialErrors);
  const [states, setStates] = useState<StateModel[]>([]);
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [trainLines, setTrainLines] = useState<TrainLineModel[]>([]);
  const [isAddressInfoOpen, setIsAddressInfoOpen] = useState(false);

  useEffect(() => {
    async function fetchAddressInfo() {
      let response = await getAddressInfoByUserIdAsync(loginUserId);
      if (response.status === 200) {
        if (response.data !== null) {
          setAddressInfo(response.data);
        }
      }
    }
    async function fetchStates() {
      let response = await getStates();
      if (response.status === 200) {
        if (response.data !== null) {
          setStates(response.data);
        }
      }
    }
    async function fetchCities() {
      let response = await getCitiesAsync();
      if (response.status === 200) {
        if (response.data !== null) {
          setCities(response.data);
        }
      }
    }
    async function fetchTrainLines() {
      let response = await getTrainLines();

      if (response.status === 200) {
        if (response.data !== null) {
          setTrainLines(response.data);
        }
      }
    }
    async function fetchCountries() {
      let response = await getCountries();
      if (response.status === 200) {
        if (response.data !== null) {
          setCountries(response.data);
        }
      }
    }

    fetchCountries();
    fetchStates();
    fetchCities();
    fetchTrainLines();
    if (loginUserId > 0) {
      fetchAddressInfo();
    }
  }, [loginUserId]);

  const onTextFieldChanged = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setAddressInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const toggleModal = () => setIsAddressInfoOpen((prev) => !prev);

  const onSelectFieldChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setAddressInfo((prev) => ({ ...prev, [name]: value }));

    setErrorInfo((prevErrors) => {
      const newErrors = prevErrors.filter((error) => error.fieldName !== name);
      return newErrors;
    });
  };

  const onAddressInfoSave = async () => {
    if (isValidate()) {
      let response;
      if (addressInfo.id > 0) {
        response = await updateAddressInfoAsync(addressInfo, addressInfo.id);
      } else {
        response = await createAddressInfoAsync(addressInfo);
        if (response.data != null) {
          const responseData = response.data;
          setAddressInfo((prev) => ({ ...prev, id: responseData.id }));
        }
      }

      if (response.status === 200) {
        toast.success("Address Info Updated", {
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
        });

        return true;
      } else {
        toast.error(response.message, {
          draggable: true,
          closeOnClick: true,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error("All conditions marked in red are compulsory", {
        draggable: true,
        closeOnClick: true,
        theme: "colored",
        transition: Bounce,
      });

      return false;
    }
  };

  const isValidate = () => {
    const newErrors: FieldErrorModel[] = [];

    if (addressInfo.address === "") {
      newErrors.push({
        fieldName: "address",
        errorMessage: "Enter address",
      });
    }

    if (addressInfo.postalCode === "") {
      newErrors.push({
        fieldName: "postalCode",
        errorMessage: "Enter postal code",
      });
    } else if (addressInfo.postalCode.length !== 6) {
      newErrors.push({
        fieldName: "postalCode",
        errorMessage: "Invalid postal code. Please check and try again",
      });
    }

    if (addressInfo.cityId === 0) {
      newErrors.push({
        fieldName: "cityId",
        errorMessage: "Select city",
      });
    }

    if (addressInfo.trainLineId === 0) {
      newErrors.push({
        fieldName: "trainLineId",
        errorMessage: "Select train line",
      });
    }

    if (addressInfo.stateId === 0) {
      newErrors.push({
        fieldName: "stateId",
        errorMessage: "Select state",
      });
    }

    if (addressInfo.countryId === 0) {
      newErrors.push({
        fieldName: "countryId",
        errorMessage: "Select country",
      });
    }

    setErrorInfo(newErrors);
    return newErrors.length === 0;
  };

  return {
    addressInfo,
    cities,
    states,
    countries,
    trainLines,
    onTextFieldChanged,
    onSelectFieldChanged,
    onAddressInfoSave,
    errorInfo,
    isAddressInfoOpen,
    toggleModal,
  };
};
export default AddressInfoUtility;
