import { useEffect, useState } from "react";
import AddressInfoViewModel from "../../model/profile/AddressInfoViewModel";
import { getAddressInfoDetailByUserIdAsync } from "../../services/profile/AddressInfoService";

const ViewProfileUtility = (loginUserId: number) => {
  const intialAddressInfoViewModel: AddressInfoViewModel = {
    id: 0,
    address: "",
    cityName: "",
    countryName: "",
    stateName: "",
    postalCode: "",
    trainLineName: "",
    userId: loginUserId,
  };
  const [addressInfoDetail, setAddressInfoDetail] =
    useState<AddressInfoViewModel>(intialAddressInfoViewModel);

  useEffect(() => {
    async function fetchAddressInfoDetail() {
      let response = await getAddressInfoDetailByUserIdAsync(loginUserId);
      if (response.status === 200) {
        if (response.data !== null) {
          setAddressInfoDetail(response.data);
        }
      }
    }

    fetchAddressInfoDetail();
  }, [loginUserId]);

  return { addressInfoDetail };
};
export default ViewProfileUtility;
