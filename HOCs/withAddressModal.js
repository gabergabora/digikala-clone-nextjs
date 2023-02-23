import { AddressForm } from "components";

import useDisclosure from "hooks/useDisclosure";
import useUserInfo from "hooks/useUserInfo";

export const withAddressModal = (Component) => {
  return (props) => {
    //? Assets
    const [isShowAddressModal, addressModalHandlers] = useDisclosure();

    const { userInfo, isVerify, isLoading } = useUserInfo();

    return (
      <>
        <Component
          openAddressModal={() => addressModalHandlers.open()}
          address={userInfo?.address}
          isVerify={isVerify}
          isLoading={isLoading}
          {...props}
        />
        {!isVerify ? null : !isLoading ? (
          <AddressForm
            isShow={isShowAddressModal}
            onClose={addressModalHandlers.close}
            address={
              userInfo?.address
                ? { ...userInfo?.address }
                : { city: {}, province: {}, postalCode: "", street: "" }
            }
          />
        ) : null}
      </>
    );
  };
};
