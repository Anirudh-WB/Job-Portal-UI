import { useEffect, useState } from "react";
import AddressInfoViewModel from "../../model/profile/AddressInfoViewModel";
import PersonalInfoUtility from "./PersonalInfoUtility";
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
    const [addressInfoDetail, setAddressInfoDetail] = useState<AddressInfoViewModel>(
        intialAddressInfoViewModel
    );

    useEffect(()=>{
        fetchAddressInfoDetail();
    },[loginUserId]);

    async function fetchAddressInfoDetail() {
        let response = await getAddressInfoDetailByUserIdAsync(loginUserId);
        if (response.status === 200) {
          if (response.data !== null) {
            setAddressInfoDetail(response.data);
          }
        } else {
          // alert(response.message);
        }
      }

      return {addressInfoDetail}
}
export default ViewProfileUtility;